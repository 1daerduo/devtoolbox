'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function JsonFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = useCallback(() => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }, [input, indent])

  const compress = useCallback(() => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }, [input])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JSON 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JSON 格式化 / 压缩</h1>
      <p className="text-sm text-gray-500 mb-6">在线 JSON 数据格式化、压缩、验证，支持语法高亮，开发者必备工具。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 JSON</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='粘贴 JSON 数据，例如：{"name":"DevToolbox","version":1}'
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输出结果</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 rounded-lg p-3 text-sm text-red-600 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 overflow-auto whitespace-pre-wrap">
              {output || '结果将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button onClick={format}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          格式化
        </button>
        <button onClick={compress}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium">
          压缩
        </button>
        <label className="text-sm text-gray-600 ml-4">
          缩进：
          <select value={indent} onChange={e => setIndent(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={0}>Tab</option>
          </select>
        </label>
      </div>

      <RelatedTools current="json-formatter" />
    </div>
  )
}
