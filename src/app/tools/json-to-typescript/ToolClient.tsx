'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

type TsType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'any'

function inferType(value: unknown): TsType | 'array' | 'object' {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  return typeof value as TsType
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function sanitizeKey(key: string): string {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) return key
  return `"${key}"`
}

function jsonToTs(obj: unknown, rootName: string = 'Root'): string {
  const interfaces: string[] = []
  const seen = new Map<string, string>()

  function process(value: unknown, name: string, optional: boolean = false): string {
    const type = inferType(value)

    if (type === 'null') return optional ? 'null | undefined' : 'null'
    if (type === 'undefined') return 'undefined'
    if (type === 'string') return optional ? 'string | undefined' : 'string'
    if (type === 'number') return optional ? 'number | undefined' : 'number'
    if (type === 'boolean') return optional ? 'boolean | undefined' : 'boolean'

    if (type === 'array') {
      const arr = value as unknown[]
      if (arr.length === 0) return optional ? 'any[] | undefined' : 'any[]'
      const itemTypes = new Set<string>()
      for (const item of arr) {
        itemTypes.add(process(item, capitalize(name) + 'Item'))
      }
      const uniqueTypes = Array.from(itemTypes)
      if (uniqueTypes.length === 1) {
        const t = uniqueTypes[0]
        return optional ? `${t}[] | undefined` : `${t}[]`
      }
      const union = uniqueTypes.join(' | ')
      return optional ? `(${union})[] | undefined` : `(${union})[]`
    }

    if (type === 'object') {
      const objVal = value as Record<string, unknown>
      const keys = Object.keys(objVal)
      const interfaceName = capitalize(name)

      if (seen.has(interfaceName)) {
        return optional ? `${interfaceName} | undefined` : interfaceName
      }
      seen.set(interfaceName, 'processing')

      const fields: string[] = []
      for (const key of keys) {
        const val = objVal[key]
        const fieldType = process(val, key)
        const isNull = val === null
        const isUndefined = val === undefined
        const optMarker = isNull || isUndefined ? '?' : ''
        fields.push(`  ${sanitizeKey(key)}${optMarker}: ${fieldType};`)
      }

      const interfaceStr = `export interface ${interfaceName} {\n${fields.join('\n')}\n}`
      interfaces.push(interfaceStr)
      seen.set(interfaceName, interfaceStr)

      return optional ? `${interfaceName} | undefined` : interfaceName
    }

    return 'any'
  }

  process(obj, rootName)

  return interfaces.join('\n\n')
}

export default function JsonToTypescriptClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [rootName, setRootName] = useState('Root')
  const [exportType, setExportType] = useState<'interface' | 'type'>('interface')

  const convert = useCallback(() => {
    try {
      if (!input.trim()) {
        setError('请输入 JSON 数据')
        setOutput('')
        return
      }
      const parsed = JSON.parse(input)
      const result = jsonToTs(parsed, rootName || 'Root')
      if (exportType === 'type') {
        const converted = result.replace(/export interface (\w+)/g, 'export type $1 =')
          .replace(/ \{\n/g, ' {\n')
          .replace(/\n\}/g, '\n}')
        setOutput(converted)
      } else {
        setOutput(result)
      }
      setError('')
    } catch (e: any) {
      setError('JSON 解析失败: ' + e.message)
      setOutput('')
    }
  }, [input, rootName, exportType])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JSON 转 TypeScript' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">JSON 转 TypeScript 类型 / JSON to TypeScript</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">将 JSON 数据一键转换为 TypeScript 接口定义，支持嵌套对象、数组、可选属性自动推断。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">输入 JSON</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`{"name":"John","age":30,"address":{"city":"Shanghai","zip":"200000"},"tags":["dev","tool"]}`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">TypeScript 类型定义</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-sm text-red-600 dark:text-red-400 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {output || 'TypeScript 类型定义将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          根类型名称：
          <input
            type="text"
            value={rootName}
            onChange={e => setRootName(e.target.value)}
            className="ml-1 border rounded px-2 py-1 text-sm w-28 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            placeholder="Root"
          />
        </label>
        <label className="text-sm text-gray-600 dark:text-gray-400">
          导出方式：
          <select value={exportType} onChange={e => setExportType(e.target.value as 'interface' | 'type')}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            <option value="interface">interface</option>
            <option value="type">type</option>
          </select>
        </label>
        <button onClick={convert}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          生成类型
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 JSON 转 TypeScript 工具？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>粘贴 JSON 数据（如 API 响应），点击「生成类型」即可自动生成 TypeScript 接口定义。</p>
        <p><strong>支持功能：</strong>嵌套对象自动拆分接口、数组元素类型推断、null/undefined 可选属性标记、自定义根类型名称、interface/type 导出方式切换。</p>
        <p><strong>使用场景：</strong>前端对接 API 时快速生成类型定义，避免手写 interface 的繁琐工作。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="json-to-typescript" />
    </div>
  )
}
