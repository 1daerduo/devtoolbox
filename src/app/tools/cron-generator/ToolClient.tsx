'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const FIELD_NAMES = ['秒', '分', '时', '日', '月', '周'] as const
const PRESETS: { label: string; cron: string }[] = [
  { label: '每分钟', cron: '* * * * *' },
  { label: '每小时', cron: '0 * * * *' },
  { label: '每天零点', cron: '0 0 * * *' },
  { label: '每天8点', cron: '0 8 * * *' },
  { label: '每周一零点', cron: '0 0 * * 1' },
  { label: '每月1号零点', cron: '0 0 1 * *' },
  { label: '每5分钟', cron: '*/5 * * * *' },
  { label: '每30分钟', cron: '*/30 * * * *' },
  { label: '工作日8点', cron: '0 8 * * 1-5' },
  { label: '每季度首日', cron: '0 0 1 1,4,7,10 *' },
]

function parseCronNextTimes(cron: string, count: number = 5): string[] {
  const parts = cron.trim().split(/\s+/)
  if (parts.length < 5) return []

  const fields = parts.length === 5
    ? [null, ...parts] // no seconds
    : parts.length === 6
      ? parts
      : null

  if (!fields) return []

  try {
    const now = new Date()
    const results: Date[] = []
    let d = new Date(now.getTime() + 1000)

    for (let i = 0; i < count * 200 && results.length < count; i++) {
      const min = fields[1] ? matchesField(d.getMinutes(), fields[1]) : true
      const hour = fields[2] ? matchesField(d.getHours(), fields[2]) : true
      const day = fields[3] ? matchesField(d.getDate(), fields[3]) : true
      const month = fields[4] ? matchesField(d.getMonth() + 1, fields[4]) : true
      const dow = fields[5] ? matchesField(d.getDay() || 7, fields[5]) : true

      if (min && hour && day && month && dow) {
        results.push(new Date(d))
      }
      d = new Date(d.getTime() + 60000)
    }
    return results.map(r => r.toLocaleString('zh-CN'))
  } catch {
    return []
  }
}

function matchesField(value: number, field: string): boolean {
  if (field === '*') return true
  for (const part of field.split(',')) {
    if (part.startsWith('*/')) {
      const step = parseInt(part.slice(2))
      if (step > 0 && value % step === 0) return true
    } else if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number)
      if (value >= start && value <= end) return true
    } else {
      if (value === parseInt(part)) return true
    }
  }
  return false
}

export default function CronGeneratorClient() {
  const [fields, setFields] = useState(['*', '*', '*', '*', '*'])
  const [nextTimes, setNextTimes] = useState<string[]>([])
  const [cronExpr, setCronExpr] = useState('* * * * *')

  useEffect(() => {
    const expr = fields.join(' ')
    setCronExpr(expr)
    const times = parseCronNextTimes(expr)
    setNextTimes(times)
  }, [fields])

  const updateField = (idx: number, val: string) => {
    const next = [...fields]
    next[idx] = val
    setFields(next)
  }

  const applyPreset = (cron: string) => {
    setFields(cron.split(' '))
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Cron 表达式生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Cron 表达式在线生成器</h1>
      <p className="text-sm text-gray-500 mb-6">
        可视化生成 Cron 定时表达式，实时预览下次执行时间。支持 Linux Crontab、Spring 等常见格式。
      </p>

      {/* Presets */}
      <div className="mb-6">
        <h2 className="font-medium text-gray-700 mb-2">常用预设</h2>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button key={p.cron} onClick={() => applyPreset(p.cron)}
              className="px-3 py-1.5 rounded-lg text-sm bg-white border border-gray-300 hover:border-primary-400 hover:bg-primary-50 text-gray-700 min-h-[36px]">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <div className="mb-6">
        <h2 className="font-medium text-gray-700 mb-2">字段配置</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {FIELD_NAMES.map((name, idx) => (
            <div key={name}>
              <label className="block text-xs text-gray-500 mb-1">{name}</label>
              <input
                type="text"
                value={fields[idx]}
                onChange={e => updateField(idx, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                placeholder="*"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Generated Expression */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-medium text-gray-700">生成的 Cron 表达式</h2>
          <CopyButton text={cronExpr} />
        </div>
        <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-lg text-center tracking-widest">
          {cronExpr}
        </div>
      </div>

      {/* Next Execution Times */}
      <div className="mb-6">
        <h2 className="font-medium text-gray-700 mb-2">下次执行时间（最近 5 次）</h2>
        {nextTimes.length > 0 ? (
          <ul className="bg-white border border-gray-200 rounded-lg divide-y">
            {nextTimes.map((t, i) => (
              <li key={i} className="px-4 py-2.5 text-sm font-mono text-gray-700">{t}</li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-400 bg-gray-50 border rounded-lg p-4">表达式无效，无法计算执行时间</div>
        )}
      </div>

      {/* Reference */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h2 className="font-medium text-gray-700 mb-2 text-sm">Cron 表达式格式参考</h2>
        <div className="text-xs text-gray-600 font-mono space-y-1">
          <p>┌──────── 分钟 (0-59)</p>
          <p>│ ┌────── 小时 (0-23)</p>
          <p>│ │ ┌──── 日 (1-31)</p>
          <p>│ │ │ ┌── 月 (1-12)</p>
          <p>│ │ │ │ ┌ 周 (0-6, 0=周日)</p>
          <p>│ │ │ │ │</p>
          <p>* * * * *</p>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          支持格式: * (任意), */n (每n), 1,3,5 (列表), 1-5 (范围)
        </div>
      </div>

      <RelatedTools current="cron-generator" />
    </div>
  )
}
