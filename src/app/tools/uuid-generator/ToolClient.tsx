'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function generateUUID(version: 4 | 7 = 4): string {
  if (version === 7) {
    // UUID v7: timestamp-based, sortable
    const timestamp = Date.now().toString(16).padStart(12, '0')
    const randomA = crypto.getRandomValues(new Uint8Array(2))
    const randomB = crypto.getRandomValues(new Uint8Array(8))
    const rA = Array.from(randomA).map((b) => b.toString(16).padStart(2, '0')).join('')
    const rB = Array.from(randomB).map((b) => b.toString(16).padStart(2, '0')).join('')
    const hex = timestamp + rA + '7' + rB.substring(1, 4) + '8' + rB.substring(5)
    return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`
  }
  // UUID v4: pure random
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | (c === 'x' ? 0 : 0x8)
    return r.toString(16)
  })
}

export default function UUIDGeneratorClient() {
  const [uuids, setUuids] = useState<string[]>([])
  const [version, setVersion] = useState<4 | 7>(4)
  const [count, setCount] = useState(5)

  const generate = useCallback(() => {
    const arr: string[] = []
    for (let i = 0; i < count; i++) {
      arr.push(generateUUID(version))
    }
    setUuids(arr)
  }, [count, version])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'UUID 生成' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          UUID 生成器 | UUID Generator
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          快速生成 UUID v4（随机）或 UUID v7（时间排序），支持批量生成，一次性复制全部
        </p>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-4 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">版本</label>
            <select
              value={version}
              onChange={(e) => { setVersion(Number(e.target.value) as 4 | 7); setUuids([]) }}
              className="min-h-[44px] border rounded-lg px-3 py-2 text-sm bg-white border-gray-300 focus:border-primary-500 outline-none"
            >
              <option value={4}>UUID v4（随机）</option>
              <option value={7}>UUID v7（时间排序）</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">生成数量</label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => { setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1))); setUuids([]) }}
              className="w-20 min-h-[44px] border rounded-lg px-3 py-2 text-sm bg-white border-gray-300 focus:border-primary-500 outline-none"
            />
          </div>
          <button
            onClick={generate}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
          >
            生成 UUID
          </button>
        </div>

        {/* Results */}
        {uuids.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">已生成 {uuids.length} 个 UUID</span>
              <div className="flex gap-2">
                <CopyButton text={uuids.join('\n')} />
                <button
                  onClick={() => generate()}
                  className="text-primary-600 border border-primary-300 px-4 py-2 rounded-lg hover:bg-primary-50 text-sm font-medium min-h-[44px]"
                >
                  重新生成
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {uuids.map((id, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                  <code className="font-mono text-xs sm:text-sm text-gray-900">{id}</code>
                  <CopyButton text={id} />
                </div>
              ))}
            </div>
          </>
        )}

        <RelatedTools current="uuid-generator" />
      </div>
    </div>
  )
}
