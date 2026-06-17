'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// ====== CSS Formatter / Minifier ======

function removeComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

function beautifyCSS(css: string): string {
  const cleaned = removeComments(css)
  let result = ''
  let indent = 0
  const tab = '  ' // 2 spaces

  // Normalize whitespace
  const normalized = cleaned
    .replace(/\s+/g, ' ')
    .replace(/\s*\{\s*/g, ' { ')
    .replace(/\s*\}\s*/g, ' } ')
    .replace(/\s*;\s*/g, '; ')
    .replace(/\s*:\s*/g, ': ')
    .trim()

  // Rebuild with proper formatting
  let i = 0
  const len = normalized.length

  while (i < len) {
    const ch = normalized[i]

    if (ch === '{') {
      // Find what's before { (the selector)
      result = result.trimEnd() + ' {\n'
      indent++
      result += tab.repeat(indent)
      i++
      // skip spaces after {
      while (i < len && normalized[i] === ' ') i++
    } else if (ch === '}') {
      // New line before }
      result = result.trimEnd() + '\n' + tab.repeat(--indent) + '}\n'
      if (indent > 0) result += tab.repeat(indent)
      i++
      // skip spaces after }
      while (i < len && normalized[i] === ' ') i++
    } else if (ch === ';') {
      result += ';\n' + tab.repeat(indent)
      i++
      // skip spaces after ;
      while (i < len && normalized[i] === ' ') i++
    } else {
      result += ch
      i++
    }
  }

  return result.trim()
}

function minifyCSS(css: string): string {
  let s = removeComments(css)
  // Remove whitespace around structural chars
  s = s.replace(/\s*\{\s*/g, '{')
  s = s.replace(/\s*\}\s*/g, '}')
  s = s.replace(/\s*;\s*/g, ';')
  s = s.replace(/\s*:\s*/g, ':')
  s = s.replace(/;\}/g, '}')
  // Collapse whitespace
  s = s.replace(/\s+/g, ' ')
  s = s.replace(/\s*\{\s*/g, '{')
  s = s.replace(/\s*\}\s*/g, '}')
  return s.trim()
}

export default function CssFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'beautify' | 'minify' | null>(null)
  const [error, setError] = useState('')

  const handleProcess = (action: 'beautify' | 'minify') => {
    setError('')
    setMode(action)
    if (!input.trim()) {
      setError('请输入 CSS 代码')
      return
    }
    try {
      const result = action === 'beautify' ? beautifyCSS(input) : minifyCSS(input)
      setOutput(result)
    } catch {
      setError('处理出错，请检查 CSS 语法')
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setMode(null)
    setError('')
  }

  const handleCopy = () => navigator.clipboard.writeText(output).catch(() => {})

  const sampleCSS = `/* 示例 CSS */
.container{display:flex;flex-direction:column;padding:16px;margin:0 auto;max-width:1200px}
.header{background:#1a1a2e;color:#fff;padding:12px 20px;border-radius:8px}
@media(max-width:768px){.container{padding:8px}.header{padding:8px 12px}}
.button{background:#4f46e5;color:#fff;border:none;border-radius:6px;padding:8px 16px;cursor:pointer;font-size:14px}
.button:hover{background:#4338ca}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'CSS 格式化' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          CSS 格式化工具 | CSS Formatter
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持 CSS 美化（格式化）与压缩（Minify），完全在浏览器本地处理
        </p>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap mb-4">
          <button
            onClick={() => handleProcess('beautify')}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 min-h-[44px]"
          >
            美化（格式化）
          </button>
          <button
            onClick={() => handleProcess('minify')}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 min-h-[44px]"
          >
            压缩（Minify）
          </button>
          <button
            onClick={() => { setInput(sampleCSS); setOutput(''); setMode(null) }}
            className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 min-h-[44px]"
          >
            加载示例
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 min-h-[44px]"
          >
            清空
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        {/* Input / Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              CSS 输入
            </label>
            <textarea
              value={input}
              onChange={(e) => { setInput(e.target.value); setOutput(''); setMode(null) }}
              placeholder="在此粘贴 CSS 代码..."
              className="w-full min-h-[300px] lg:min-h-[450px] border border-gray-300 rounded-lg p-3 font-mono text-xs sm:text-sm bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                {mode === 'beautify' ? '美化结果' : mode === 'minify' ? '压缩结果' : '输出'}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="结果将在此显示..."
              className="w-full min-h-[300px] lg:min-h-[450px] border border-gray-300 rounded-lg p-3 font-mono text-xs sm:text-sm bg-gray-50 resize-y"
            />
          </div>
        </div>

        {/* Stats */}
        {output && (
          <div className="mt-4 flex gap-6 text-xs text-gray-500">
            <span>输入大小：{(new Blob([input]).size / 1024).toFixed(2)} KB</span>
            <span>输出大小：{(new Blob([output]).size / 1024).toFixed(2)} KB</span>
            {mode === 'minify' && input.length > 0 && (
              <span className="text-green-600 font-medium">
                压缩率：{((1 - output.length / input.length) * 100).toFixed(1)}%
              </span>
            )}
          </div>
        )}

        <RelatedTools current="css-formatter" />
      </div>
    </div>
  )
}
