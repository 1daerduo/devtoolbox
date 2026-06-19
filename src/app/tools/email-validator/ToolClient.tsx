'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

export default function EmailValidatorClient() {
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<{ valid: boolean; checks: { label: string; pass: boolean; msg: string }[] } | null>(null)

  const validate = useCallback(() => {
    const trimmed = email.trim()
    if (!trimmed) { setResults(null); return }

    const checks = [
      {
        label: '格式检查',
        pass: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed),
        msg: '是否为 user@domain.com 格式',
      },
      {
        label: '长度检查',
        pass: trimmed.length <= 254 && trimmed.split('@')[0].length <= 64,
        msg: '总长度不超过254字符，本地部分不超过64字符',
      },
      {
        label: '域名部分',
        pass: /@[^\s@]+\.[^\s@]+$/.test(trimmed) && trimmed.split('@')[1].includes('.'),
        msg: '域名部分是否包含有效顶级域名',
      },
      {
        label: '特殊字符',
        pass: !/[<>()[\]\\,;:\s]/.test(trimmed.split('@')[0]) || /^".+"$/.test(trimmed.split('@')[0]),
        msg: '本地部分不包含非法特殊字符（引号包裹除外）',
      },
      {
        label: '连续点号',
        pass: !/\.\./.test(trimmed),
        msg: '不包含连续的点号',
      },
      {
        label: '起止字符',
        pass: !/^\.|\.$/.test(trimmed.split('@')[0]),
        msg: '本地部分不以点号开头或结尾',
      },
      {
        label: '域名后缀',
        pass: /\.[a-zA-Z]{2,}$/.test(trimmed),
        msg: '顶级域名至少2个字符',
      },
    ]

    setResults({ valid: checks.every(c => c.pass), checks })
  }, [email])

  const handleBatch = useCallback(() => {
    const lines = email.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
    if (lines.length <= 1) { validate(); return }
    
    const batchResults = lines.map(line => {
      const trimmed = line.trim()
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) &&
        trimmed.length <= 254 &&
        !/\.\./.test(trimmed) &&
        !/^\.|\.$/.test(trimmed.split('@')[0]) &&
        /\.[a-zA-Z]{2,}$/.test(trimmed)
      return { email: trimmed, valid }
    })
    const allValid = batchResults.every(r => r.valid)
    setResults({
      valid: allValid,
      checks: batchResults.map(r => ({
        label: r.email,
        pass: r.valid,
        msg: r.valid ? '格式有效' : '格式无效',
      })),
    })
  }, [email, validate])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '邮箱验证器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">邮箱地址验证器 | Email Validator</h1>
      <p className="text-sm text-gray-500 mb-6">验证邮箱地址格式是否正确，支持单邮箱校验和多邮箱批量检测。</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <textarea
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="输入邮箱地址，多个邮箱用逗号或换行分隔...&#10;例如：user@example.com"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="flex gap-3 mt-3">
          <button onClick={validate} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
            验证
          </button>
          <button onClick={handleBatch} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            批量检测
          </button>
          <button onClick={() => { setEmail(''); setResults(null) }} className="px-4 py-2 text-gray-500 text-sm hover:text-gray-700">
            清空
          </button>
        </div>
      </div>

      {results && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className={`text-lg font-semibold mb-4 ${results.valid ? 'text-green-600' : 'text-red-600'}`}>
            {results.valid ? '✅ 全部通过' : '❌ 存在问题'}
          </div>
          <div className="space-y-2">
            {results.checks.map((check, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${check.pass ? 'bg-green-50' : 'bg-red-50'}`}>
                <span className="text-lg">{check.pass ? '✅' : '❌'}</span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{check.label}</div>
                  <div className="text-xs text-gray-500">{check.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedTools current="email-validator" />
    </div>
  )
}
