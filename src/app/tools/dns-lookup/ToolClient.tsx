'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

type DnsRecord = {
  name: string
  type: string
  TTL: number
  data: string
}

export default function DnsLookupClient() {
  const [domain, setDomain] = useState('')
  const [recordType, setRecordType] = useState('A')
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<DnsRecord[]>([])
  const [error, setError] = useState('')
  const [rawResponse, setRawResponse] = useState('')

  const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'CAA', 'PTR']

  const lookup = useCallback(async () => {
    const d = domain.trim()
    if (!d) { setError('请输入域名'); return }
    
    setLoading(true)
    setError('')
    setRecords([])
    setRawResponse('')

    try {
      // Use Google DNS-over-HTTPS API
      const url = `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${recordType}`
      const res = await fetch(url)
      const data = await res.json()
      
      setRawResponse(JSON.stringify(data, null, 2))

      if (data.Answer && data.Answer.length > 0) {
        setRecords(data.Answer.map((a: any) => ({
          name: a.name,
          type: recordType === 'ANY' ? `${a.type}` : recordType,
          TTL: a.TTL,
          data: a.data,
        })))
      } else if (data.Authority && data.Authority.length > 0) {
        // Show authority/NS records when no direct answer
        setRecords(data.Authority.map((a: any) => ({
          name: a.name,
          type: `Authority (${recordType})`,
          TTL: a.TTL,
          data: a.data,
        })))
      } else {
        setError('未找到该类型的 DNS 记录 (Status: ' + (data.Status || 'unknown') + ')')
      }
    } catch (e: any) {
      setError('查询失败: ' + (e.message || '网络错误'))
    }
    setLoading(false)
  }, [domain, recordType])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') lookup()
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'DNS 查询' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">DNS 查询工具</h1>
      <p className="text-sm text-gray-500 mb-6">在线查询域名的 DNS 记录，支持 A、AAAA、CNAME、MX、NS、TXT 等常见记录类型。</p>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={domain}
            onChange={e => setDomain(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入域名，例如：github.com"
            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <select value={recordType} onChange={e => setRecordType(e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            {recordTypes.map(t => (
              <option key={t} value={t}>{t} 记录</option>
            ))}
          </select>
          <button onClick={lookup} disabled={loading}
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-60 whitespace-nowrap">
            {loading ? '查询中...' : '🔍 查询'}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {records.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">名称</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">类型</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">TTL</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">记录值</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-gray-900">{r.name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">{r.type}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{r.TTL}s</td>
                    <td className="px-4 py-3 font-mono text-gray-900 break-all">{r.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {rawResponse && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">原始响应 (JSON)</h3>
            <CopyButton text={rawResponse} label="复制 JSON" />
          </div>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-64 overflow-y-auto">
            {rawResponse}
          </pre>
        </div>
      )}

      <RelatedTools current="dns-lookup" />
    </div>
  )
}
