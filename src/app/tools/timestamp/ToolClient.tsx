'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function TimestampClient() {
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [tsResult, setTsResult] = useState('')
  const [dateResult, setDateResult] = useState('')
  const [now, setNow] = useState(Date.now())

  // Auto-refresh current time
  useState(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  })

  const tsToDate = useCallback(() => {
    const ts = Number(tsInput.trim())
    if (!tsInput.trim()) { setDateResult('请输入时间戳'); return }
    if (isNaN(ts)) { setDateResult('时间戳格式错误'); return }
    const ms = ts > 9999999999 ? ts : ts * 1000
    const d = new Date(ms)
    setDateResult(d.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))
  }, [tsInput])

  const dateToTs = useCallback(() => {
    try {
      const d = new Date(dateInput)
      if (isNaN(d.getTime())) { setTsResult('日期格式错误'); return }
      setTsResult(
        `秒：${Math.floor(d.getTime() / 1000)}\n毫秒：${d.getTime()}`
      )
    } catch {
      setTsResult('日期格式错误')
    }
  }, [dateInput])

  const setNowInput = () => {
    setDateInput(new Date().toISOString().slice(0, 16))
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '时间戳转换' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">时间戳转换</h1>
      <p className="text-sm text-gray-500 mb-6">Unix 时间戳与日期时间互相转换，支持秒和毫秒，实时显示当前时间。</p>

      {/* Current time */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6 text-sm">
        当前时间：<span className="font-mono font-bold text-primary-700">{new Date(now).toLocaleString('zh-CN')}</span>
        <span className="mx-2 text-gray-400">|</span>
        当前时间戳（秒）：<span className="font-mono font-bold text-primary-700">{Math.floor(now / 1000)}</span>
        <span className="mx-2 text-gray-400">|</span>
        毫秒：<span className="font-mono font-bold text-primary-700">{now}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="bg-white border rounded-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-3">时间戳 → 日期</h3>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm font-mono bg-white border-gray-300 text-gray-900 focus:border-primary-500 outline-none mb-3"
            value={tsInput}
            onChange={e => setTsInput(e.target.value)}
            placeholder="输入时间戳，如 1717593600"
          />
          <button onClick={tsToDate}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
            转换 →
          </button>
          {dateResult && (
            <div className="mt-3 flex items-center justify-between">
              <pre className="font-mono text-sm text-gray-800 bg-gray-50 p-2 rounded flex-1 mr-2">{dateResult}</pre>
              <CopyButton text={dateResult} />
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="bg-white border rounded-lg p-5">
          <h3 className="font-semibold text-gray-800 mb-3">日期 → 时间戳</h3>
          <div className="flex gap-2 mb-3">
            <input
              type="datetime-local"
              className="flex-1 border rounded-lg px-3 py-2 text-sm bg-white border-gray-300 text-gray-900 focus:border-primary-500 outline-none"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
            />
            <button onClick={setNowInput}
              className="text-xs text-primary-600 border border-gray-200 px-2 py-1.5 rounded hover:bg-primary-50 min-h-[44px]">
              当前
            </button>
          </div>
          <button onClick={dateToTs}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
            ← 转换
          </button>
          {tsResult && (
            <div className="mt-3 flex items-center justify-between">
              <pre className="font-mono text-sm text-gray-800 bg-gray-50 p-2 rounded flex-1 mr-2">{tsResult}</pre>
              <CopyButton text={tsResult} />
            </div>
          )}
        </div>
      </div>

      <RelatedTools current="timestamp" />
    </div>
  )
}
