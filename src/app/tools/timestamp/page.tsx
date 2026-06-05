'use client'

import { useState, useEffect } from 'react'

export default function TimestampPage() {
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [result, setResult] = useState('')
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tsToDate = () => {
    const val = Number(tsInput.trim())
    if (isNaN(val)) { setResult('❌ 请输入有效的数字'); return }
    // auto-detect seconds vs milliseconds
    const ms = val > 9999999999 ? val : val * 1000
    const d = new Date(ms)
    setResult(`📅 ${d.toLocaleString('zh-CN')}\n📅 UTC: ${d.toUTCString()}\n⏱ 毫秒时间戳: ${ms}\n⏱ 秒时间戳: ${Math.floor(ms / 1000)}`)
  }

  const dateToTs = () => {
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) { setResult('❌ 请输入有效的日期时间'); return }
    setResult(`⏱ 秒时间戳: ${Math.floor(d.getTime() / 1000)}\n⏱ 毫秒时间戳: ${d.getTime()}\n📅 本地时间: ${d.toLocaleString('zh-CN')}`)
  }

  const useNow = () => {
    const ms = now
    setTsInput(String(Math.floor(ms / 1000)))
    setResult(`⏱ 当前秒时间戳: ${Math.floor(ms / 1000)}\n⏱ 当前毫秒时间戳: ${ms}\n📅 当前时间: ${new Date(ms).toLocaleString('zh-CN')}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">时间戳转换</h1>

      {/* Current time display */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <div className="text-sm text-primary-700 mb-1">当前时间戳（实时）</div>
        <div className="font-mono text-lg text-primary-900">
          {Math.floor(now / 1000)} （秒） / {now} （毫秒）
        </div>
        <div className="text-sm text-primary-600 mt-1">
          {new Date(now).toLocaleString('zh-CN')}
        </div>
        <button onClick={useNow}
          className="mt-2 text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700">
          使用当前时间
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="bg-white border rounded-lg p-5 border-gray-200">
          <h2 className="font-semibold mb-3 text-gray-900">时间戳 → 日期</h2>
          <input
            type="text"
            className="w-full border rounded-lg p-2 font-mono text-sm bg-white border-gray-300 text-gray-900"
            placeholder="输入秒或毫秒时间戳，如 1700000000"
            value={tsInput}
            onChange={e => setTsInput(e.target.value)}
          />
          <button onClick={tsToDate}
            className="mt-3 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
            转换
          </button>
        </div>

        {/* Date → Timestamp */}
        <div className="bg-white border rounded-lg p-5 border-gray-200">
          <h2 className="font-semibold mb-3 text-gray-900">日期 → 时间戳</h2>
          <input
            type="text"
            className="w-full border rounded-lg p-2 font-mono text-sm bg-white border-gray-300 text-gray-900"
            placeholder="输入日期，如 2026-01-01 00:00:00"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
          />
          <button onClick={dateToTs}
            className="mt-3 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 text-sm font-medium">
            转换
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-green-900">{result}</pre>
        </div>
      )}

      <div className="mt-10 bg-gray-100 rounded-lg p-4 text-center text-gray-400 text-xs border-2 border-dashed border-gray-300">
        [ 广告位 - AdSense ]
      </div>
    </div>
  )
}
