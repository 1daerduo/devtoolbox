'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function parseUUID(uuid: string) {
  const cleaned = uuid.replace(/[^0-9a-fA-F]/g, '')
  if (cleaned.length !== 32) return null
  const hex = cleaned.toLowerCase()
  const version = parseInt(hex[12], 16)
  const variantBits = parseInt(hex[16], 16)
  let variant = 'Unknown'
  if ((variantBits & 0x8) === 0) variant = 'NCS (0xxx)'
  else if ((variantBits & 0xC) === 0x8) variant = 'RFC 9562 (10xx)'
  else if ((variantBits & 0xE) === 0xC) variant = 'Microsoft (110x)'
  else if ((variantBits & 0xE) === 0xE) variant = 'Reserved (111x)'

  const result: Record<string, string> = {
    'UUID': `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`,
    '版本 (Version)': `v${version}`,
    '变体 (Variant)': variant,
    '长度': `${cleaned.length} hex chars (128 bits)`,
  }

  if (version === 1) {
    const timeLow = parseInt(hex.slice(0, 8), 16)
    const timeMid = parseInt(hex.slice(8, 12), 16)
    const timeHi = parseInt(hex.slice(13, 16), 16)
    const timestamp = (timeHi << 48) + (timeMid << 32) + timeLow - 122192928000000000
    const tsMs = Math.floor(timestamp / 10000)
    const date = new Date(tsMs)
    result['时间戳 (Timestamp)'] = date.toISOString()
    result['时钟序列 (Clock)'] = String(parseInt(hex.slice(16, 20), 16) & 0x3FFF)
    result['节点 ID (Node)'] = hex.slice(20, 22) + ':' + hex.slice(22, 24) + ':' + hex.slice(24, 26) + ':' +
      hex.slice(26, 28) + ':' + hex.slice(28, 30) + ':' + hex.slice(30, 32)
  } else if (version === 4) {
    result['类型'] = '随机生成 (Random)'
    result['随机位'] = `${hex.slice(14, 16)}...${hex.slice(20)}`
  } else if (version === 7) {
    const ts = parseInt(hex.slice(0, 12), 16)
    result['Unix 时间戳 (ms)'] = String(ts)
    result['时间'] = new Date(ts).toISOString()
    result['随机部分'] = hex.slice(12)
  } else if (version === 3 || version === 5) {
    result['类型'] = version === 3 ? 'MD5 命名空间 (Name-based)' : 'SHA-1 命名空间 (Name-based)'
  }

  const groups = ['time_low', 'time_mid', 'ver_time_hi', 'variant_clock', 'node']
  const parts = [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)]
  result['结构分解'] = groups.map((g, i) => `${g}: ${parts[i]}`).join(' | ')

  return result
}

const VERSION_INFO: Record<number, string> = {
  1: '基于时间 + MAC 地址生成，包含时间戳和节点信息',
  2: 'DCE Security 版本，基于 POSIX UID/GID',
  3: '基于 MD5 哈希 + 命名空间生成',
  4: '完全随机生成，最常用的版本',
  5: '基于 SHA-1 哈希 + 命名空间生成',
  6: '可排序的时间戳版本（兼容 v1）',
  7: '基于 Unix 时间戳的排序友好版本',
}

export default function ToolClient() {
  const [uuid, setUuid] = useState('550e8400-e29b-41d4-a716-446655440000')
  const result = useMemo(() => parseUUID(uuid), [uuid])

  const samples = [
    '550e8400-e29b-41d4-a716-446655440000',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '0193c0a0-7a2f-7000-8000-000000000000',
    '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'UUID 解码器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">UUID 解码器</h1>
      <p className="text-gray-600 mb-6">解析 UUID 结构，查看版本、变体、时间戳等详细信息</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">输入 UUID</label>
        <div className="flex gap-2">
          <input value={uuid} onChange={(e) => setUuid(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入 UUID (如 550e8400-e29b-41d4-a716-446655440000)" />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {samples.map((s) => (
            <button key={s} onClick={() => setUuid(s)}
              className="px-2 py-1 text-xs bg-gray-100 border rounded hover:bg-blue-50 hover:border-blue-300 transition-colors font-mono">
              {s.slice(0, 16)}...
            </button>
          ))}
        </div>
      </div>

      {result ? (
        <div className="border rounded-lg overflow-hidden mb-4">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(result).map(([key, val]) => (
                <tr key={key} className="border-b last:border-b-0">
                  <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700 w-48 whitespace-nowrap">{key}</td>
                  <td className="px-4 py-3 font-mono text-gray-800 break-all">
                    {val}
                    {key === 'UUID' && <CopyButton text={val} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border rounded-lg p-4 text-center text-red-500 mb-4">
          无效的 UUID 格式（需要 32 位十六进制字符）
        </div>
      )}

      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-4">
          <p className="font-medium mb-1">版本说明：</p>
          {Object.entries(VERSION_INFO).map(([v, desc]) => (
            <p key={v} className={result['版本 (Version)'] === `v${v}` ? 'font-semibold' : ''}>
              v{v}: {desc}
            </p>
          ))}
        </div>
      )}

      <RelatedTools current="uuid-decoder" />
    </div>
  )
}
