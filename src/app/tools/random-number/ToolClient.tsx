'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function RandomNumberClient() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [decimal, setDecimal] = useState(0)
  const [unique, setUnique] = useState(false)
  const [result, setResult] = useState<number[]>([])
  const [error, setError] = useState('')

  const generate = useCallback(() => {
    setError('')
    if (min >= max) { setError('最小值必须小于最大值'); return }
    if (count < 1 || count > 1000) { setError('数量范围：1-1000'); return }
    if (decimal < 0 || decimal > 10) { setError('小数位数：0-10'); return }

    const multiplier = Math.pow(10, decimal)
    const rangeMin = Math.ceil(min * multiplier)
    const rangeMax = Math.floor(max * multiplier)

    if (unique && count > (rangeMax - rangeMin + 1)) {
      setError(`不重复模式下，数量不能超过可选项总数(${rangeMax - rangeMin + 1})`)
      return
    }

    if (unique) {
      const pool = new Set<number>()
      while (pool.size < count) {
        pool.add(Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin)
      }
      setResult([...pool].map(v => v / multiplier))
    } else {
      const arr: number[] = []
      for (let i = 0; i < count; i++) {
        arr.push((Math.floor(Math.random() * (rangeMax - rangeMin + 1)) + rangeMin) / multiplier)
      }
      setResult(arr)
    }
  }, [min, max, count, decimal, unique])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '随机数生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">随机数生成器 | Random Number Generator</h1>
      <p className="text-sm text-gray-500 mb-6">生成指定范围内的随机数，支持整数和小数，可批量生成。</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">最小值</label>
            <input type="number" value={min} onChange={e => setMin(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">最大值</label>
            <input type="number" value={max} onChange={e => setMax(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">生成数量</label>
            <input type="number" value={count} onChange={e => setCount(Number(e.target.value))} min={1} max={1000}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">小数位数</label>
            <select value={decimal} onChange={e => setDecimal(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
              <option value={0}>0 (整数)</option>
              <option value={1}>1 位</option>
              <option value={2}>2 位</option>
              <option value={3}>3 位</option>
              <option value={4}>4 位</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-gray-700">不重复</span>
            </label>
          </div>
        </div>

        <button onClick={generate}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
          🎲 生成随机数
        </button>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {result.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">生成结果 ({result.length} 个)</h3>
            <CopyButton text={result.join('\n')} label="复制全部" />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {result.map((n, i) => (
              <div key={i} className="bg-primary-50 border border-primary-100 rounded-lg px-3 py-2 text-center text-sm font-mono text-primary-700">
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedTools current="random-number" />
    </div>
  )
}
