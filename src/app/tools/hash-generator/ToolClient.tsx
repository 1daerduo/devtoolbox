'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

type Algo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512'

async function hashText(text: string, algo: Algo): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algo, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

const ALGOS: Algo[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512']

export default function HashGeneratorClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!input.trim()) return
    setLoading(true)
    const newResults: Record<string, string> = {}
    for (const algo of ALGOS) {
      const h = await hashText(input, algo)
      newResults[algo] = h
    }
    setResults(newResults)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '哈希生成' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          在线哈希（Hash）生成工具
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持 MD5、SHA-1、SHA-256、SHA-512 哈希值生成，数据完全在浏览器本地计算，不上传服务器
        </p>

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          输入文本
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setResults({}) }}
          placeholder="输入需要计算哈希值的文本..."
          className="w-full min-h-[120px] sm:min-h-[160px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '计算中...' : '生成哈希值'}
        </button>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 space-y-3">
            {ALGOS.map((algo) => (
              <div key={algo} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700">{algo}</span>
                  <CopyButton text={results[algo]} />
                </div>
                <div className="font-mono text-xs sm:text-sm text-gray-900 break-all bg-gray-50 rounded p-2">
                  {results[algo]}
                </div>
              </div>
            ))}
          </div>
        )}

        <RelatedTools current="hash-generator" />
      </div>
    </div>
  )
}
