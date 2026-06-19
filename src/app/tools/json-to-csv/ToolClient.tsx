'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function jsonToCsv(jsonStr: string, delimiter: string): string {
  const data = JSON.parse(jsonStr)
  const items = Array.isArray(data) ? data : [data]

  if (items.length === 0) return ''

  const headers = Object.keys(items[0])
  const csvRows = [headers.join(delimiter)]

  for (const item of items) {
    const row = headers.map(h => {
      const val = item[h]
      if (val === null || val === undefined) return ''
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val)
      if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"'
      }
      return str
    })
    csvRows.push(row.join(delimiter))
  }

  return csvRows.join('\n')
}

function csvToJson(csvStr: string, delimiter: string): string {
  const lines = csvStr.trim().split('\n')
  if (lines.length < 2) return '[]'

  const headers = parseCsvLine(lines[0], delimiter)
  const result = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    const values = parseCsvLine(lines[i], delimiter)
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    result.push(obj)
  }

  return JSON.stringify(result, null, 2)
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === delimiter) {
        result.push(current)
        current = ''
      } else {
        current += ch
      }
    }
  }
  result.push(current)
  return result
}

export default function JsonToCsvClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [delimiter, setDelimiter] = useState(',')
  const [mode, setMode] = useState<'json2csv' | 'csv2json'>('json2csv')

  const convert = () => {
    setError('')
    try {
      if (mode === 'json2csv') {
        setOutput(jsonToCsv(input, delimiter))
      } else {
        setOutput(csvToJson(input, delimiter))
      }
    } catch (e: any) {
      setError('转换失败：' + e.message)
      setOutput('')
    }
  }

  const swapMode = () => {
    setMode(mode === 'json2csv' ? 'csv2json' : 'json2csv')
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JSON ↔ CSV 转换' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JSON ↔ CSV 在线转换工具 | JSON to CSV Converter</h1>
      <p className="text-sm text-gray-500 mb-6">
        JSON 与 CSV 格式互转，支持嵌套 JSON 对象展开、自定义分隔符。数据导入导出必备。
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setMode('json2csv')}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'json2csv' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
        >
          JSON → CSV
        </button>
        <button
          onClick={() => setMode('csv2json')}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'csv2json' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
        >
          CSV → JSON
        </button>
        <span className="text-xs text-gray-400">|</span>
        <label className="text-sm text-gray-600">
          分隔符：
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
            <option value=",">逗号 (,)</option>
            <option value=";">分号 (;)</option>
            <option value="\t">Tab</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">
              {mode === 'json2csv' ? '输入 JSON' : '输入 CSV'}
            </label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'json2csv'
              ? '粘贴 JSON 数组，例如：[{"name":"张三","age":25}]'
              : '粘贴 CSV 数据，第一行为表头'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输出结果</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
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
        <button onClick={swapMode}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
          切换方向
        </button>
      </div>

      <RelatedTools current="json-to-csv" />
    </div>
  )
}
