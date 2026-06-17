'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function formatHtml(html: string, indent: number = 2): string {
  let result = ''
  let level = 0
  const tab = ' '.repeat(indent)

  // Normalize whitespace
  const normalized = html.replace(/>\s+</g, '><').trim()

  // Simple tokenizer
  const tokens = normalized.match(/(<[^>]+>)|([^<]+)/g) || []

  for (const token of tokens) {
    if (token.startsWith('</')) {
      // Closing tag
      level = Math.max(0, level - 1)
      result += tab.repeat(level) + token.trim() + '\n'
    } else if (token.startsWith('<') && !token.startsWith('<!') && !token.endsWith('/>')) {
      // Opening tag
      result += tab.repeat(level) + token.trim() + '\n'
      // Self-closing or void tags don't increase level
      const tagName = token.match(/^<(\w+)/)?.[1]?.toLowerCase()
      const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
      if (!voidTags.includes(tagName || '') && !token.includes('/>')) {
        level++
      }
    } else if (token.startsWith('<!')) {
      // DOCTYPE or comment
      result += tab.repeat(level) + token.trim() + '\n'
    } else if (token.trim()) {
      // Text content
      result += tab.repeat(level) + token.trim() + '\n'
    }
  }

  return result.trimEnd()
}

function minifyHtml(html: string): string {
  return html
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s+>/g, '>')
    .trim()
}

export default function HtmlFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'format' | 'minify'>('format')
  const [indent, setIndent] = useState(2)

  const process = () => {
    setError('')
    try {
      if (!input.trim()) {
        setError('请输入 HTML 代码')
        return
      }
      if (mode === 'format') {
        setOutput(formatHtml(input, indent))
      } else {
        setOutput(minifyHtml(input))
      }
    } catch (e: any) {
      setError(e.message || '处理失败')
      setOutput('')
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'HTML 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">HTML 格式化 | HTML Formatter</h1>
      <p className="text-sm text-gray-500 mb-6">
        HTML 代码美化与压缩，支持自定义缩进。适用于前端调试与生产环境优化。
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
              <option value={1}>1 Tab</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 HTML</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="粘贴 HTML 代码..."
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

      <RelatedTools current="html-formatter" />
    </div>
  )
}
