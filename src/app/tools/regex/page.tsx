'use client'

import { useState, useCallback, useEffect } from 'react'

export default function RegexPage() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')
  const [matches, setMatches] = useState<{ text: string; index: number; length: number }[]>([])
  const [error, setError] = useState('')
  const [highlighted, setHighlighted] = useState('')

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>')

  const test = useCallback(() => {
    setError('')
    setMatches([])
    setHighlighted('')

    if (!pattern) { setError('请输入正则表达式'); return }
    if (!testStr) { setError('请输入测试字符串'); return }

    try {
      const regex = new RegExp(pattern, flags)
      const result: { text: string; index: number; length: number }[] = []
      let m: RegExpExecArray | null

      if (flags.includes('g')) {
        while ((m = regex.exec(testStr)) !== null) {
          result.push({ text: m[0], index: m.index, length: m[0].length })
          if (m[0].length === 0) regex.lastIndex++
        }
      } else {
        m = regex.exec(testStr)
        if (m) {
          result.push({ text: m[0], index: m.index, length: m[0].length })
        }
      }

      setMatches(result)

      if (result.length > 0) {
        let last = 0
        const parts: string[] = []
        result.forEach((match) => {
          parts.push(escapeHtml(testStr.slice(last, match.index)))
          parts.push(`<mark class="bg-yellow-300 px-0.5 rounded">${escapeHtml(match.text)}</mark>`)
          last = match.index + match.length
        })
        parts.push(escapeHtml(testStr.slice(last)))
        setHighlighted(parts.join(''))
      } else {
        setHighlighted(escapeHtml(testStr))
      }
    } catch (e: any) {
      setError(e.message)
    }
  }, [pattern, flags, testStr])

  useEffect(() => {
    if (pattern && testStr) { test() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, flags])

  const examples = [
    { label: '邮箱', pattern: '[\\w.+-]+@[\\w-]+\\.[\\w.]+', flags: 'g' },
    { label: '手机号', pattern: '1[3-9]\\d{9}', flags: 'g' },
    { label: 'IP地址', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', flags: 'g' },
    { label: 'URL', pattern: 'https?://[\\w.-]+(?:/[\\w./?%&=-]*)?', flags: 'gi' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">正则表达式测试</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Input */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">正则表达式</label>
            <div className="flex border rounded-lg overflow-hidden border-gray-300">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 select-none font-mono text-sm">
                /
              </span>
              <input
                type="text"
                className="flex-1 px-3 py-2 text-sm font-mono bg-white text-gray-900 outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="输入正则，如 \\d+"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
              />
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-l border-r border-gray-300 select-none font-mono text-sm">
                /
              </span>
              <input
                type="text"
                className="w-12 py-2 text-sm font-mono bg-white text-gray-900 text-center outline-none focus:ring-1 focus:ring-primary-500"
                value={flags}
                onChange={e => setFlags(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">测试字符串</label>
            <textarea
              className="w-full h-40 border rounded-lg p-3 text-sm font-mono bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              placeholder="输入要测试的文本..."
              value={testStr}
              onChange={e => setTestStr(e.target.value)}
            />
          </div>

          {/* Quick examples */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">快速示例</label>
            <div className="flex flex-wrap gap-2">
              {examples.map(ex => (
                <button
                  key={ex.label}
                  onClick={() => { setPattern(ex.pattern); setFlags(ex.flags) }}
                  className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-primary-50 hover:text-primary-700 border border-gray-200"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={test}
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 text-sm font-medium"
          >
            测试匹配
          </button>
          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
        </div>

        {/* Right: Result */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            匹配结果（{matches.length} 个匹配）
          </label>
          <div className="w-full min-h-80 border rounded-lg p-3 text-sm bg-white border-gray-300 overflow-auto">
            {highlighted && (
              <p
                className="font-mono leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            )}
            {!highlighted && (
              <span className="text-gray-400">匹配结果将高亮显示在这里...</span>
            )}
          </div>

          {matches.length > 0 && (
            <div className="mt-4">
              <label className="block font-medium text-gray-700 mb-1">匹配详情</label>
              <div className="space-y-1">
                {matches.map((m, i) => (
                  <div key={i} className="text-xs font-mono bg-gray-50 p-2 rounded border border-gray-200">
                    <span className="text-primary-600">#{i + 1}</span> &quot;{m.text}&quot;
                    <span className="text-gray-400 ml-2">位置: {m.index}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 bg-gray-100 rounded-lg p-4 text-center text-gray-400 text-xs border-2 border-dashed border-gray-300">
        [ 广告位 - AdSense ]
      </div>
    </div>
  )
}
