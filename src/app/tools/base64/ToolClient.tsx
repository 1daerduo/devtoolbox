'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function Base64Client() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const process = useCallback(() => {
    setError('')
    if (!input.trim()) { setError('请输入内容'); return }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(input.trim())))
        setOutput(decoded)
      }
    } catch (e: any) {
      setError(mode === 'decode' ? '解码失败，请输入有效的 Base64 字符串' : e.message)
      setOutput('')
    }
  }, [input, mode])

  const swap = () => {
    setMode(m => m === 'encode' ? 'decode' : 'encode')
    setInput(output)
    setOutput('')
    setError('')
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Base64 编解码' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Base64 编码 / 解码</h1>
      <p className="text-sm text-gray-500 mb-6">在线 Base64 编码解码工具，支持 UTF-8 中文，一键交换输入输出。</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => { setMode('encode'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'encode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          编码 Encode
        </button>
        <button onClick={() => { setMode('decode'); setOutput(''); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === 'decode' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          解码 Decode
        </button>
        <button onClick={swap}
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
          ⇅ 交换输入输出
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">
              {mode === 'encode' ? '输入原文' : '输入 Base64'}
            </label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full h-64 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的 Base64 字符串...'}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 输出' : '解码结果'}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full h-64 border border-red-300 bg-red-50 rounded-lg p-3 text-sm text-red-600 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <textarea
              readOnly
              className="w-full h-64 border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 text-gray-900 outline-none resize-none"
              value={output}
              placeholder="结果将显示在这里..."
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={process}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          {mode === 'encode' ? '编码 →' : '← 解码'}
        </button>
      </div>

      {/* 说明 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <strong>说明：</strong>
        支持 UTF-8 中文编码。Base64 是一种用 64 个字符表示二进制数据的方法，常用于邮件附件、API 传输等场景。
      </div>

      <RelatedTools current="base64" />
    </div>
  )
}
