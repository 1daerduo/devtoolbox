'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function formatJs(code: string, indent: number = 2): string {
  // Simple JS formatter - handles common cases
  let result = ''
  let level = 0
  const tab = ' '.repeat(indent)
  let inString = false
  let stringChar = ''
  let inTemplate = false
  let inComment = false
  let inLineComment = false

  const lines = code.split('\n')
  for (const rawLine of lines) {
    let line = rawLine.trim()
    if (!line) continue

    // Count braces to adjust level
    let openBraces = 0
    let closeBraces = 0
    inString = false
    stringChar = ''
    inComment = false
    inLineComment = false

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      const next = line[i + 1]

      if (inLineComment) continue
      if (inComment) {
        if (ch === '*' && next === '/') { inComment = false; i++ }
        continue
      }
      if (inString) {
        if (ch === '\\') { i++; continue }
        if (ch === stringChar) inString = false
        continue
      }
      if (ch === '/' && next === '/') { inLineComment = true; continue }
      if (ch === '/' && next === '*') { inComment = true; i++; continue }
      if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue }
      if (ch === '{' || ch === '[' || ch === '(') openBraces++
      if (ch === '}' || ch === ']' || ch === ')') closeBraces++
    }

    // Adjust level for closing braces on this line
    if (closeBraces > openBraces) {
      level = Math.max(0, level - (closeBraces - openBraces))
    }

    result += tab.repeat(level) + line + '\n'

    // Adjust level for opening braces after this line
    if (openBraces > closeBraces) {
      level += openBraces - closeBraces
    }
  }

  return result.trimEnd()
}

function minifyJs(code: string): string {
  // Simple minification - remove comments and trim
  let result = code
    // Remove single-line comments (simple approach)
    .replace(/\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove spaces around operators (basic)
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
    .trim()

  return result
}

export default function JsFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'format' | 'minify'>('format')
  const [indent, setIndent] = useState(2)

  const process = () => {
    setError('')
    try {
      if (!input.trim()) {
        setError('请输入 JavaScript 代码')
        return
      }
      if (mode === 'format') {
        setOutput(formatJs(input, indent))
      } else {
        setOutput(minifyJs(input))
      }
    } catch (e: any) {
      setError(e.message || '处理失败')
      setOutput('')
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JS 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JavaScript 格式化 | JS Formatter</h1>
      <p className="text-sm text-gray-500 mb-6">
        JavaScript 代码美化与压缩，支持自定义缩进。适用于前端调试与代码优化。
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => { setMode('format'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'format' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          美化
        </button>
        <button onClick={() => { setMode('minify'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'minify' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          压缩
        </button>
        {mode === 'format' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label>缩进:</label>
            <select value={indent} onChange={e => setIndent(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm bg-white border-gray-300">
              <option value={2}>2 空格</option>
              <option value={4}>4 空格</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 JavaScript</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="粘贴 JavaScript 代码..."
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

      <div className="mt-4">
        <button onClick={process}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
          {mode === 'format' ? '美化' : '压缩'}
        </button>
      </div>

      <RelatedTools current="js-formatter" />
    </div>
  )
}
