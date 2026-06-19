'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// Simple YAML parser/formatter (handles common cases)
function yamlToJson(yaml: string): string {
  try {
    const lines = yaml.split('\n')
    const stack: { key: string; indent: number }[] = []
    const result: any = {}

    let currentObj: any = result
    let prevIndent = 0
    const objStack = [result]

    for (const rawLine of lines) {
      const line = rawLine.replace(/\t/g, '  ')
      if (!line.trim() || line.trim().startsWith('#')) continue

      const indent = line.search(/\S/)
      const content = line.trim()

      // Nested object indicator
      if (indent > prevIndent) {
        // create nested object
      }

      if (content.includes(':')) {
        const colonIdx = content.indexOf(':')
        const key = content.substring(0, colonIdx).trim()
        let value = content.substring(colonIdx + 1).trim()

        // Pop stack if indent decreased
        while (stack.length > 0 && indent <= (stack[stack.length - 1]?.indent ?? 0)) {
          stack.pop()
        }

        // Find current context
        let target = result
        for (const s of stack) {
          target = target[s.key]
        }

        if (value === '' || value === '|' || value === '>') {
          target[key] = {}
          stack.push({ key, indent })
        } else {
          // Remove quotes
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          // Try number/boolean
          if (value === 'true') target[key] = true
          else if (value === 'false') target[key] = false
          else if (value === 'null' || value === '~') target[key] = null
          else if (/^-?\d+(\.\d+)?$/.test(value)) target[key] = Number(value)
          else target[key] = value
        }
      }

      prevIndent = indent
    }

    return JSON.stringify(result, null, 2)
  } catch (e: any) {
    throw new Error('YAML 解析失败：' + e.message)
  }
}

function jsonToYaml(jsonStr: string): string {
  try {
    const obj = JSON.parse(jsonStr)
    return toYaml(obj, 0)
  } catch (e: any) {
    throw new Error('JSON 解析失败：' + e.message)
  }
}

function toYaml(obj: any, depth: number): string {
  const indent = '  '.repeat(depth)
  let result = ''

  if (obj === null || obj === undefined) return 'null'

  if (typeof obj !== 'object') {
    if (typeof obj === 'string') {
      if (obj.includes(':') || obj.includes('#') || obj.includes('{') || obj.includes('[')) {
        return `"${obj.replace(/"/g, '\\"')}"`
      }
      return obj
    }
    return String(obj)
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        result += `${indent}-\n${toYaml(item, depth + 1)}`
      } else {
        result += `${indent}- ${toYaml(item, depth)}\n`
      }
    }
    return result
  }

  const keys = Object.keys(obj)
  if (keys.length === 0) return '{}'

  for (const key of keys) {
    const val = obj[key]
    if (typeof val === 'object' && val !== null && !Array.isArray(val) && Object.keys(val).length > 0) {
      result += `${indent}${key}:\n${toYaml(val, depth + 1)}`
    } else if (Array.isArray(val)) {
      result += `${indent}${key}:\n${toYaml(val, depth + 1)}`
    } else {
      const yamlVal = toYaml(val, depth)
      result += `${indent}${key}: ${yamlVal}\n`
    }
  }

  return result
}

export default function YamlFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'yaml2json' | 'json2yaml'>('json2yaml')
  const [indent, setIndent] = useState(2)

  const convert = () => {
    setError('')
    try {
      if (mode === 'json2yaml') {
        const obj = JSON.parse(input)
        setOutput(toYaml(obj, 0))
      } else {
        setOutput(yamlToJson(input))
      }
    } catch (e: any) {
      setError(e.message || '转换失败')
      setOutput('')
    }
  }

  const validate = () => {
    setError('')
    try {
      if (mode === 'json2yaml') {
        JSON.parse(input)
        setError('\u2714 JSON 格式有效')
        setTimeout(() => setError(''), 2000)
      } else {
        yamlToJson(input)
        setError('\u2714 YAML 格式有效')
        setTimeout(() => setError(''), 2000)
      }
    } catch (e: any) {
      setError(e.message || '格式无效')
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'YAML 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">YAML ↔ JSON 在线转换 | YAML Formatter & Validator</h1>
      <p className="text-sm text-gray-500 mb-6">
        YAML 与 JSON 格式互转，支持 YAML 格式验证。适用于 Kubernetes 配置、Docker Compose、CI/CD 配置等场景。
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => { setMode('json2yaml'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'json2yaml' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
        >
          JSON → YAML
        </button>
        <button
          onClick={() => { setMode('yaml2json'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'yaml2json' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
        >
          YAML → JSON
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">
              {mode === 'json2yaml' ? '输入 JSON' : '输入 YAML'}
            </label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'json2yaml' ? '粘贴 JSON 数据...' : '粘贴 YAML 数据...'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输出结果</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && !error.startsWith('\u2714') ? (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 rounded-lg p-3 text-sm text-red-600 overflow-auto">
              {error}
            </div>
          ) : (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 overflow-auto whitespace-pre-wrap">
              {output || '结果将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button onClick={convert}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
          转换
        </button>
        <button onClick={validate}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
          验证格式
        </button>
      </div>

      {error && error.startsWith('\u2714') && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-600">
          {error}
        </div>
      )}

      <RelatedTools current="yaml-formatter" />
    </div>
  )
}
