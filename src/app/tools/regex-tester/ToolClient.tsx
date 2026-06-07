'use client'

import { useState, useMemo, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const COMMON_PATTERNS: { name: string; pattern: string; flags: string }[] = [
  { name: 'Email', pattern: '^[\\w.-]+@[\\w.-]+\\.\\w{2,}$', flags: 'i' },
  { name: 'URL', pattern: 'https?://[\\w.-]+(:\\d+)?(/[\\w./%-]*)?', flags: 'i' },
  { name: 'Phone (CN)', pattern: '1[3-9]\\d{9}', flags: 'g' },
  { name: 'IP Address', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', flags: 'g' },
  { name: 'Date YYYY-MM-DD', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g' },
  { name: 'Hex Color', pattern: '#[0-9a-fA-F]{3,8}\\b', flags: 'gi' },
  { name: 'HTML Tag', pattern: '<([a-z]+)([^<]+)*(?:>(.*?)<\\/\\1>|\\s+\\/>)', flags: 'gi' },
  { name: 'Chinese Characters', pattern: '[\\u4e00-\\u9fff]+', flags: 'g' },
]

const FLAG_OPTIONS = [
  { flag: 'g', label: 'Global', desc: '全局匹配' },
  { flag: 'i', label: 'Case Insensitive', desc: '忽略大小写' },
  { flag: 'm', label: 'Multiline', desc: '多行模式' },
  { flag: 's', label: 'Dot All', desc: '"." 匹配换行符' },
  { flag: 'u', label: 'Unicode', desc: 'Unicode 模式' },
  { flag: 'y', label: 'Sticky', desc: '粘性匹配' },
]

export default function ToolClient() {
  const [pattern, setPattern] = useState('(\\w+)@(\\w+\\.\\w+)')
  const [flags, setFlags] = useState('gi')
  const [testText, setTestText] = useState('Contact us at support@example.com or sales@company.org')
  const [replaceText, setReplaceText] = useState('')
  const [mode, setMode] = useState<'match' | 'replace'>('match')

  const results = useMemo(() => {
    if (!pattern) return { valid: false, error: '', matches: [], replaced: '' }
    try {
      const regex = new RegExp(pattern, flags)
      if (mode === 'replace') {
        return { valid: true, error: '', matches: [], replaced: testText.replace(regex, replaceText) }
      }
      const matches: { index: number; text: string; groups: string[] }[] = []
      let match: RegExpExecArray | null
      if (flags.includes('g')) {
        while ((match = regex.exec(testText)) !== null) {
          matches.push({ index: match.index, text: match[0], groups: match.slice(1) })
          if (match[0] === '') { regex.lastIndex++ }
        }
      } else {
        match = regex.exec(testText)
        if (match) matches.push({ index: match.index, text: match[0], groups: match.slice(1) })
      }
      return { valid: true, error: '', matches, replaced: '' }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      return { valid: false, error: msg, matches: [], replaced: '' }
    }
  }, [pattern, flags, testText, replaceText, mode])

  const highlightedText = useMemo(() => {
    if (!results.valid || mode === 'replace') return testText
    if (results.matches.length === 0) return testText
    const parts: { text: string; highlight: boolean; group?: number }[] = []
    let lastIndex = 0
    for (const m of results.matches) {
      if (m.index > lastIndex) parts.push({ text: testText.slice(lastIndex, m.index), highlight: false })
      parts.push({ text: m.text, highlight: true })
      lastIndex = m.index + m.text.length
    }
    if (lastIndex < testText.length) parts.push({ text: testText.slice(lastIndex), highlight: false })
    return parts
  }, [testText, results, mode])

  const applyPattern = useCallback((p: typeof COMMON_PATTERNS[0]) => {
    setPattern(p.pattern)
    setFlags(p.flags)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '正则表达式测试器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">正则表达式测试器</h1>
      <p className="text-gray-600 mb-6">在线正则表达式调试工具，实时查看匹配结果和捕获组</p>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-sm font-medium text-gray-700">常用正则：</span>
          {COMMON_PATTERNS.map((p) => (
            <button key={p.name} onClick={() => applyPattern(p)}
              className="px-2 py-1 text-xs bg-white border rounded hover:bg-blue-50 hover:border-blue-300 transition-colors">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">正则表达式</label>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l text-gray-500">/</span>
          <input value={pattern} onChange={(e) => setPattern(e.target.value)}
            className="flex-1 border-y px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="输入正则表达式..." />
          <input value={flags} onChange={(e) => setFlags(e.target.value)}
            className="w-24 border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="flags" />
          <span className="inline-flex items-center px-3 bg-gray-100 border border-l-0 rounded-r text-gray-500">/</span>
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {FLAG_OPTIONS.map((f) => (
            <label key={f.flag} className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
              <input type="checkbox" checked={flags.includes(f.flag)}
                onChange={(e) => {
                  if (e.target.checked) setFlags(flags + f.flag)
                  else setFlags(flags.replace(f.flag, ''))
                }} />
              <span title={f.desc}>{f.label}</span>
            </label>
          ))}
        </div>
        {!results.valid && <p className="text-red-500 text-sm mt-1">语法错误: {results.error}</p>}
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <button onClick={() => setMode('match')}
            className={`px-3 py-1 text-sm rounded ${mode === 'match' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>匹配</button>
          <button onClick={() => setMode('replace')}
            className={`px-3 py-1 text-sm rounded ${mode === 'replace' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>替换</button>
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-1">测试文本</label>
        <textarea value={testText} onChange={(e) => setTestText(e.target.value)}
          className="w-full border rounded-lg p-3 font-mono text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="粘贴要测试的文本..." />
      </div>

      {mode === 'replace' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">替换为</label>
          <input value={replaceText} onChange={(e) => setReplaceText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="替换文本（支持 $1, $2 等引用捕获组）" />
        </div>
      )}

      {mode === 'match' && results.valid && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">匹配结果 ({results.matches.length})</span>
          </div>
          <div className="border rounded-lg p-3 bg-white font-mono text-sm min-h-[80px] whitespace-pre-wrap break-all">
            {Array.isArray(highlightedText) ? (
              highlightedText.map((part: { text: string; highlight: boolean }, i: number) =>
                part.highlight ? (
                  <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part.text}</mark>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )
            ) : (
              <span className="text-gray-400">{highlightedText || '无匹配'}</span>
            )}
          </div>
          {results.matches.length > 0 && (
            <div className="mt-3 space-y-2">
              {results.matches.map((m, i) => (
                <div key={i} className="text-sm bg-gray-50 rounded p-2 border">
                  <span className="text-gray-500">Match {i + 1}:</span>{' '}
                  <code className="bg-yellow-100 px-1 rounded">{m.text}</code>
                  <span className="text-gray-400 ml-2">索引 {m.index}</span>
                  {m.groups.length > 0 && (
                    <div className="mt-1 flex gap-2 flex-wrap">
                      {m.groups.map((g, j) => (
                        <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          Group {j + 1}: {g || '(空)'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === 'replace' && results.valid && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">替换结果</span>
            <CopyButton text={results.replaced} />
          </div>
          <div className="border rounded-lg p-3 bg-white font-mono text-sm min-h-[80px] whitespace-pre-wrap break-all">
            {results.replaced || <span className="text-gray-400">(空)</span>}
          </div>
        </div>
      )}

      <RelatedTools current="regex-tester" />
    </div>
  )
}
