'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function RegexClient() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testText, setTestText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')

  const test = useCallback(() => {
    setError('')
    setMatches([])
    if (!pattern.trim()) { setError('请输入正则表达式'); return }
    try {
      const regex = new RegExp(pattern, flags)
      if (flags.includes('g')) {
        const results: string[] = []
        let m
        while ((m = regex.exec(testText)) !== null) {
          results.push(m[0])
          if (m.index === regex.lastIndex) regex.lastIndex++
        }
        setMatches(results.length ? results : [])
      } else {
        const m = regex.exec(testText)
        setMatches(m ? [m[0]] : [])
      }
    } catch (e: any) {
      setError('正则表达式语法错误：' + e.message)
      setMatches([])
    }
  }, [pattern, flags, testText])

  const highlightMatch = () => {
    if (!pattern || matches.length === 0) return testText
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      return testText.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$&</mark>')
    } catch {
      return testText
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '正则表达式测试' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">正则表达式测试 | Regex Tester</h1>
      <p className="text-sm text-gray-500 mb-6">在线测试正则表达式，支持标志位、实时匹配高亮，开发者调试必备。</p>

      <div className="bg-white border rounded-lg p-5 mb-4">
        <div className="flex items-end gap-3 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">正则表达式</label>
            <div className="flex items-center border rounded-lg bg-white border-gray-300 text-gray-900 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <span className="text-gray-400 px-2 text-lg">/</span>
              <input
                type="text"
                className="flex-1 py-2 text-sm font-mono outline-none bg-transparent"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder="正则表达式"
              />
              <span className="text-gray-400 px-1 text-lg">/</span>
              <input
                type="text"
                className="w-16 py-2 text-sm font-mono outline-none bg-transparent"
                value={flags}
                onChange={e => setFlags(e.target.value)}
                placeholder="g"
              />
            </div>
          </div>
          <button onClick={test}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
            测试匹配
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">测试文本</label>
          <textarea
            className="w-full min-h-[120px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 text-gray-900 focus:border-primary-500 outline-none mb-3"
            value={testText}
            onChange={e => setTestText(e.target.value)}
            placeholder="粘贴要测试的文本..."
          />

          {testText && pattern && !error && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">高亮预览：</p>
              <div
                className="border rounded-lg p-3 text-sm bg-gray-50 font-mono whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightMatch() || '无匹配' }}
              />
            </div>
          )}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">{error}</div>
        )}

        {matches.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700">
                匹配结果（{matches.length} 个）
              </h4>
              <CopyButton text={matches.join('\n')} label="复制全部" />
            </div>
            <div className="max-h-48 overflow-auto border rounded-lg p-3 bg-gray-50 font-mono text-sm">
              {matches.map((m, i) => (
                <div key={i} className="py-0.5 flex gap-3 border-b border-gray-200 last:border-0">
                  <span className="text-gray-400 text-xs w-8 text-right">{i + 1}</span>
                  <span className="text-gray-900">{m}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick patterns */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase">常用正则速查</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '邮箱', p: '[\\w.-]+@[\\w.-]+\\.\\w+', f: 'g' },
            { label: '手机号', p: '1[3-9]\\d{9}', f: 'g' },
            { label: 'URL', p: 'https?://[^\\s]+', f: 'g' },
            { label: 'IP地址', p: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', f: 'g' },
            { label: '中文', p: '[\\u4e00-\\u9fff]+', f: 'g' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => { setPattern(item.p); setFlags(item.f); setError('') }}
              className="text-xs bg-white border border-gray-300 px-2.5 py-1.5 rounded-md hover:bg-primary-50 hover:border-primary-300 transition-colors text-gray-700"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <RelatedTools current="regex" />
    </div>
  )
}
