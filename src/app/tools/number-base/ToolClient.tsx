'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const BASES = [
  { label: '二进制 (BIN)', base: 2, prefix: '0b' },
  { label: '八进制 (OCT)', base: 8, prefix: '0o' },
  { label: '十进制 (DEC)', base: 10, prefix: '' },
  { label: '十六进制 (HEX)', base: 16, prefix: '0x' },
  { label: '三十二进制 (BASE32)', base: 32, prefix: '' },
  { label: '三十六进制 (BASE36)', base: 36, prefix: '' },
] as const

export default function NumberBaseClient() {
  const [values, setValues] = useState<Record<number, string>>({
    2: '', 8: '', 10: '', 16: '', 32: '', 36: '',
  })

  const convert = (fromBase: number, value: string) => {
    if (!value.trim()) {
      setValues({ 2: '', 8: '', 10: '', 16: '', 32: '', 36: '' })
      return
    }
    try {
      const num = parseInt(value, fromBase)
      if (isNaN(num)) {
        setValues(prev => ({ ...prev, [fromBase]: value }))
        return
      }
      const next: Record<number, string> = {}
      for (const b of [2, 8, 10, 16, 32, 36]) {
        next[b] = num.toString(b).toUpperCase()
      }
      next[fromBase] = value
      setValues(next)
    } catch {
      setValues(prev => ({ ...prev, [fromBase]: value }))
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '进制转换器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">在线进制转换器 | Number Base Converter</h1>
      <p className="text-sm text-gray-500 mb-6">
        支持二进制、八进制、十进制、十六进制、Base32、Base36 互转，输入任意进制的数值，自动计算其他进制结果。
      </p>

      <div className="space-y-4">
        {BASES.map(({ label, base }) => (
          <div key={base} className="flex items-center gap-3">
            <label className="w-44 text-sm font-medium text-gray-700 shrink-0">{label}</label>
            <input
              type="text"
              value={values[base] || ''}
              onChange={e => convert(base, e.target.value.replace(/\s/g, ''))}
              className="flex-1 border rounded-lg px-3 py-2.5 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              placeholder={`输入${label.split(' ')[0]}数值`}
            />
            {values[base] && <CopyButton text={values[base]} />}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium text-gray-700 mb-1">使用说明</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>在任意进制输入框中输入数值，其他进制自动同步转换</li>
          <li>十六进制不区分大小写，输出统一大写</li>
          <li>支持大数转换（JavaScript Number 范围内）</li>
        </ul>
      </div>

      <RelatedTools current="number-base" />
    </div>
  )
}
