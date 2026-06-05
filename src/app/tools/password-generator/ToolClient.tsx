'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function generatePassword(length: number, uppercase: boolean, numbers: boolean, symbols: boolean): string {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (numbers) chars += '0123456789'
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (v) => chars[v % chars.length]).join('')
}

function estimateStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++
  if (score <= 2) return { score, label: '弱', color: '#EF4444' }
  if (score <= 3) return { score, label: '一般', color: '#F59E0B' }
  if (score <= 4) return { score, label: '强', color: '#10B981' }
  return { score, label: '非常强', color: '#3B82F6' }
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [passwords, setPasswords] = useState<string[]>([])
  const [count, setCount] = useState(5)

  const generate = useCallback(() => {
    const arr: string[] = []
    for (let i = 0; i < count; i++) {
      arr.push(generatePassword(length, uppercase, numbers, symbols))
    }
    setPasswords(arr)
  }, [length, uppercase, numbers, symbols, count])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '密码生成器' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          在线随机密码生成器
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          生成安全的随机密码，数据在浏览器本地生成，不上传服务器
        </p>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
          {/* Length */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">密码长度</label>
              <span className="text-sm text-primary-600 font-mono">{length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => { setLength(Number(e.target.value)); setPasswords([]) }}
              className="w-full accent-primary-600"
            />
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'uppercase', label: '包含大写字母 (A-Z)', value: uppercase, set: setUppercase },
              { key: 'numbers', label: '包含数字 (0-9)', value: numbers, set: setNumbers },
              { key: 'symbols', label: '包含特殊符号 (!@#$...)', value: symbols, set: setSymbols },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={opt.value}
                  onChange={(e) => { opt.set(e.target.checked); setPasswords([]) }}
                  className="w-4 h-4 accent-primary-600"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Count & Generate */}
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">生成数量</label>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => { setCount(Math.min(20, Math.max(1, parseInt(e.target.value) || 1))); setPasswords([]) }}
                className="w-20 min-h-[44px] border rounded-lg px-3 py-2 text-sm bg-white border-gray-300 focus:border-primary-500 outline-none"
              />
            </div>
            <button
              onClick={generate}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
            >
              生成密码
            </button>
          </div>
        </div>

        {/* Results */}
        {passwords.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">已生成 {passwords.length} 个密码</span>
              <CopyButton text={passwords.join('\n')} />
            </div>
            <div className="space-y-2">
              {passwords.map((pwd, i) => {
                const strength = estimateStrength(pwd)
                return (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-3">
                    <code className="font-mono text-sm text-gray-900 flex-1 break-all">{pwd}</code>
                    <span className="text-xs font-medium px-2 py-1 rounded whitespace-nowrap" style={{ backgroundColor: strength.color + '20', color: strength.color }}>
                      {strength.label}
                    </span>
                    <CopyButton text={pwd} />
                  </div>
                )
              })}
            </div>
          </>
        )}

        <RelatedTools current="password-generator" />
      </div>
    </div>
  )
}
