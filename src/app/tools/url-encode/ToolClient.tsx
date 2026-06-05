'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function UrlEncodeClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  function process() {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
      setOutput('解码失败，请检查输入是否为有效的 URL 编码字符串')
    }
  }

  function swapMode() {
    setMode(mode === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'URL 编码解码' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          URL 在线编码解码工具
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持 URL 编码（Encode）和解码（Decode），将特殊字符转为 %XX 格式或还原
        </p>

        {/* Mode selector */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => { setMode('encode'); process() }}
            className={`px-5 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
              mode === 'encode'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            编码 Encode
          </button>
          <button
            onClick={() => { setMode('decode'); process() }}
            className={`px-5 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
              mode === 'decode'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            解码 Decode
          </button>
        </div>

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {mode === 'encode' ? '原始文本' : 'URL 编码字符串'}
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput('') }}
          placeholder={mode === 'encode' ? '输入需要编码的文本，如包含中文、空格、特殊字符的内容...' : '输入 URL 编码后的字符串，如 %E4%BD%A0%E5%A5%BD...'}
          className="w-full min-h-[140px] sm:min-h-[200px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        <div className="flex gap-3 mt-4 mb-6">
          <button
            onClick={process}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
          >
            {mode === 'encode' ? '编码 →' : '解码 →'}
          </button>
          <button
            onClick={swapMode}
            className="text-primary-600 border border-primary-300 px-4 py-2 rounded-lg hover:bg-primary-50 text-sm font-medium min-h-[44px]"
          >
            ⇄ 交换模式
          </button>
        </div>

        {/* Output */}
        {output && (
          <div>
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

        <RelatedTools current="url-encode" />
      </div>
    </div>
  )
}
