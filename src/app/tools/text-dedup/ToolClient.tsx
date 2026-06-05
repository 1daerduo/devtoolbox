'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function TextDedupClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState('')

  function dedup() {
    const lines = input.split('\n')
    const seen = new Set<string>()
    const unique = lines.filter((line) => {
      if (seen.has(line.trim())) return false
      seen.add(line.trim())
      return true
    })
    const removed = lines.length - unique.length
    setOutput(unique.join('\n'))
    setStats(`共 ${lines.length} 行，去重后 ${unique.length} 行，移除 ${removed} 行重复`)
  }

  function sortAsc() {
    const lines = output.split('\n').sort((a, b) => a.localeCompare(b, 'zh-CN'))
    setOutput(lines.join('\n'))
  }

  function sortDesc() {
    const lines = output.split('\n').sort((a, b) => b.localeCompare(a, 'zh-CN'))
    setOutput(lines.join('\n'))
  }

  function reverseLines() {
    setOutput(output.split('\n').reverse().join('\n'))
  }

  function trimLines() {
    setOutput(output.split('\n').map((l) => l.trim()).join('\n'))
  }

  function removeEmpty() {
    setOutput(output.split('\n').filter((l) => l.trim() !== '').join('\n'))
    setStats(stats + '，已移除空行')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '文本去重排序' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          在线文本去重排序工具
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          按行去重、排序、反转、去空行，适合处理名单、列表、日志等文本数据
        </p>

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">输入文本（每行一条）</label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(''); setStats('') }}
          placeholder="每行一条数据，例如：&#10;张三&#10;李四&#10;张三&#10;王五"
          className="w-full min-h-[180px] sm:min-h-[250px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <button onClick={dedup} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
            去重
          </button>
          <button onClick={sortAsc} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
            A→Z 升序
          </button>
          <button onClick={sortDesc} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
            Z→A 降序
          </button>
          <button onClick={reverseLines} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
            反转顺序
          </button>
          <button onClick={trimLines} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
            去首尾空格
          </button>
          <button onClick={removeEmpty} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
            移除空行
          </button>
        </div>

        {/* Stats */}
        {stats && <p className="text-sm text-gray-500 mb-3">{stats}</p>}

        {/* Output */}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">处理结果</label>
              <CopyButton text={output} />
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full min-h-[180px] sm:min-h-[250px] border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 text-gray-900 outline-none resize-y"
            />
          </div>
        )}

        <RelatedTools current="text-dedup" />
      </div>
    </div>
  )
}
