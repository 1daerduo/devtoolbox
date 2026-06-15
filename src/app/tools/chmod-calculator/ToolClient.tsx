'use client'

import { useState, useCallback, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

type PermKey = 'owner-read' | 'owner-write' | 'owner-execute' | 'group-read' | 'group-write' | 'group-execute' | 'others-read' | 'others-write' | 'others-execute'

const PERM_BITS: { key: PermKey; bit: number; label: string; group: string }[] = [
  { key: 'owner-read', bit: 256, label: '读 (r)', group: '所有者 (Owner)' },
  { key: 'owner-write', bit: 128, label: '写 (w)', group: '所有者 (Owner)' },
  { key: 'owner-execute', bit: 64, label: '执行 (x)', group: '所有者 (Owner)' },
  { key: 'group-read', bit: 32, label: '读 (r)', group: '所属组 (Group)' },
  { key: 'group-write', bit: 16, label: '写 (w)', group: '所属组 (Group)' },
  { key: 'group-execute', bit: 8, label: '执行 (x)', group: '所属组 (Group)' },
  { key: 'others-read', bit: 4, label: '读 (r)', group: '其他人 (Others)' },
  { key: 'others-write', bit: 2, label: '写 (w)', group: '其他人 (Others)' },
  { key: 'others-execute', bit: 1, label: '执行 (x)', group: '其他人 (Others)' },
]

const DEFAULT_PERMS: Record<PermKey, boolean> = {
  'owner-read': true, 'owner-write': true, 'owner-execute': false,
  'group-read': true, 'group-write': false, 'group-execute': false,
  'others-read': true, 'others-write': false, 'others-execute': false,
}

const PRESETS = [
  { name: '755 - 目录默认', octal: 755 },
  { name: '644 - 文件默认', octal: 644 },
  { name: '777 - 全部权限', octal: 777 },
  { name: '700 - 仅所有者', octal: 700 },
  { name: '600 - 所有者读写', octal: 600 },
  { name: '444 - 只读', octal: 444 },
  { name: '666 - 所有人读写', octal: 666 },
  { name: '750 - 组可读执行', octal: 750 },
]

function octalToPerms(octal: number): Record<PermKey, boolean> {
  const str = octal.toString().padStart(3, '0')
  const digits = str.split('').map(Number)
  const perms = { ...DEFAULT_PERMS }
  const keys: PermKey[][] = [
    ['owner-read', 'owner-write', 'owner-execute'],
    ['group-read', 'group-write', 'group-execute'],
    ['others-read', 'others-write', 'others-execute'],
  ]
  for (let g = 0; g < 3; g++) {
    const d = digits[g]
    perms[keys[g][0]] = !!(d & 4)
    perms[keys[g][1]] = !!(d & 2)
    perms[keys[g][2]] = !!(d & 1)
  }
  return perms
}

function permsToOctal(perms: Record<PermKey, boolean>): number {
  let val = 0
  for (const p of PERM_BITS) {
    if (perms[p.key]) val += p.bit
  }
  return val
}

function permsToSymbolic(perms: Record<PermKey, boolean>): string {
  const groups: PermKey[][] = [
    ['owner-read', 'owner-write', 'owner-execute'],
    ['group-read', 'group-write', 'group-execute'],
    ['others-read', 'others-write', 'others-execute'],
  ]
  const chars = ['r', 'w', 'x']
  return groups.map(g =>
    g.map((k, i) => perms[k] ? chars[i] : '-').join('')
  ).join('')
}

export default function ChmodCalculatorClient() {
  const [perms, setPerms] = useState<Record<PermKey, boolean>>({ ...DEFAULT_PERMS })
  const [octalInput, setOctalInput] = useState('644')

  const octalValue = useMemo(() => permsToOctal(perms), [perms])
  const symbolic = useMemo(() => permsToSymbolic(perms), [perms])

  const togglePerm = useCallback((key: PermKey) => {
    setPerms(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const applyOctal = useCallback(() => {
    const num = parseInt(octalInput, 10)
    if (isNaN(num) || num < 0 || num > 777 || /[^0-7]/.test(octalInput)) return
    setPerms(octalToPerms(num))
  }, [octalInput])

  const applyPreset = useCallback((octal: number) => {
    setPerms(octalToPerms(octal))
    setOctalInput(octal.toString())
  }, [])

  const chmodCmd = `chmod ${octalValue} filename`

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Chmod 计算器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Chmod 计算器 / Chmod Calculator</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">可视化计算 Linux/Unix 文件权限，支持数字与符号表示法互转，实时生成 chmod 命令。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 权限选择器 */}
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">权限设置</h3>
          <div className="space-y-3">
            {['所有者 (Owner)', '所属组 (Group)', '其他人 (Others)'].map((group, gi) => (
              <div key={group} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{group}</div>
                <div className="flex gap-4">
                  {PERM_BITS.filter(p => p.group === group).map(p => (
                    <label key={p.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={perms[p.key]}
                        onChange={() => togglePerm(p.key)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 常用预设 */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">常用权限</h3>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.octal}
                  onClick={() => applyPreset(p.octal)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 结果面板 */}
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">计算结果</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">数字表示（八进制）</div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-mono font-bold text-primary-600 dark:text-primary-400">{octalValue}</span>
                <CopyButton text={octalValue.toString()} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">符号表示</div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono font-bold text-gray-900 dark:text-gray-100">-{symbolic}</span>
                <CopyButton text={`-${symbolic}`} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">chmod 命令</div>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">{chmodCmd}</code>
                <CopyButton text={chmodCmd} />
              </div>
            </div>
          </div>

          {/* 八进制输入 */}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">输入八进制值</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={octalInput}
                onChange={e => setOctalInput(e.target.value.replace(/[^0-7]/g, '').slice(0, 3))}
                placeholder="如 755"
                className="flex-1 border rounded-lg px-3 py-2 font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                onKeyDown={e => e.key === 'Enter' && applyOctal()}
              />
              <button onClick={applyOctal}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
                解析
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 Chmod 计算器？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>勾选权限复选框，自动计算八进制值和符号表示。也可以输入八进制值（如 755）反向解析。</p>
        <p><strong>权限说明：</strong>r = 读取（4）、w = 写入（2）、x = 执行（1），每组权限 = 对应位之和。</p>
        <p><strong>常见用法：</strong>目录权限 755、文件权限 644、脚本权限 700、配置文件 600。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="chmod-calculator" />
    </div>
  )
}
