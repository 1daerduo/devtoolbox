'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const ENTITIES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  '©': '&copy;', '®': '&reg;', '™': '&trade;', '€': '&euro;', '¥': '&yen;',
  '°': '&deg;', '±': '&plusmn;', '×': '&times;', '÷': '&divide;',
  '≤': '&le;', '≥': '&ge;', '≠': '&ne;', '≈': '&asymp;',
  '←': '&larr;', '→': '&rarr;', '↑': '&uarr;', '↓': '&darr;',
}

function encodeEntities(text: string): string {
  return text.replace(/[&<>"'©®™€¥°±×÷≤≥≠≈←→↑↓]/g, (ch) => ENTITIES[ch] || ch)
}

function decodeEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export default function HtmlEntityClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  function process() {
    try {
      if (mode === 'encode') setOutput(encodeEntities(input))
      else setOutput(decodeEntities(input))
    } catch {
      setOutput('解码失败，请检查输入格式')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'HTML 实体编解码' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          HTML 实体编码解码工具 | HTML Entity Encoder / Decoder
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          将 HTML 特殊字符（&lt; &gt; &amp; 等）与 HTML 实体互相转换，防止 XSS 攻击
        </p>

        {/* Mode */}
        <div className="flex items-center gap-3 mb-4">
          {(['encode', 'decode'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setOutput(''); process() }}
              className={`px-5 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                mode === m ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {m === 'encode' ? '编码 Encode' : '解码 Decode'}
            </button>
          ))}
        </div>

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {mode === 'encode' ? '原始 HTML 代码' : 'HTML 实体字符串'}
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput('') }}
          placeholder={mode === 'encode' ? '输入 HTML 代码，如 <div class="test">hello</div>' : '输入 HTML 实体，如 &lt;div&gt;hello&lt;/div&gt;'}
          className="w-full min-h-[140px] sm:min-h-[200px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        <button
          onClick={process}
          className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
        >
          {mode === 'encode' ? '编码 →' : '解码 →'}
        </button>

        {/* Common entities ref */}
        <details className="mt-4 bg-white border border-gray-200 rounded-lg p-3">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer">常用 HTML 实体参考</summary>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            {Object.entries(ENTITIES).map(([ch, entity]) => (
              <div key={ch} className="flex gap-2">
                <span className="text-gray-700">{ch}</span>
                <span className="text-gray-400">→</span>
                <span className="text-primary-600">{entity}</span>
              </div>
            ))}
          </div>
        </details>

        {/* Output */}
        {output && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                {mode === 'encode' ? '编码结果' : '解码结果'}
              </label>
              <CopyButton text={output} />
            </div>
            <div className="w-full min-h-[140px] sm:min-h-[200px] border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 text-gray-900 overflow-auto whitespace-pre-wrap break-all">
              {output}
            </div>
          </div>
        )}

        <RelatedTools current="html-entity" />
      </div>
    </div>
  )
}
