'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface IpInfo {
  ip: string
  city: string
  region: string
  country: string
  org: string
  timezone: string
}

export default function MyIpClient() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [extraInfo, setExtraInfo] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchIp()
    collectBrowserInfo()
  }, [])

  const fetchIp = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://ipapi.co/json/')
      if (!res.ok) throw new Error('查询失败')
      const data = await res.json()
      setIpInfo({
        ip: data.ip || '',
        city: data.city || '',
        region: data.region || '',
        country: data.country_name || '',
        org: data.org || '',
        timezone: data.timezone || '',
      })
    } catch {
      setError('无法获取 IP 信息，请检查网络连接')
    } finally {
      setLoading(false)
    }
  }

  const collectBrowserInfo = () => {
    setExtraInfo({
      '浏览器 UA': navigator.userAgent,
      '语言': navigator.language,
      '平台': navigator.platform || '未知',
      '在线状态': navigator.onLine ? '在线' : '离线',
      'Cookie 启用': navigator.cookieEnabled ? '是' : '否',
      '屏幕分辨率': `${window.screen.width} × ${window.screen.height}`,
      '时区': Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'IP 查询' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">IP 地址查询</h1>
      <p className="text-sm text-gray-500 mb-6">
        查看当前设备的公网 IP 地址、地理位置、运营商信息及浏览器环境信息。
      </p>

      {loading && (
        <div className="p-4 bg-gray-50 rounded-lg text-gray-500">正在查询 IP 信息...</div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-600 mb-4">
          {error}
          <button onClick={fetchIp} className="ml-3 text-primary-600 underline">重试</button>
        </div>
      )}

      {ipInfo && !loading && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">公网 IP 信息</h2>
              <CopyButton text={`IP: ${ipInfo.ip}\n位置: ${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country}\n运营商: ${ipInfo.org}`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="IP 地址" value={ipInfo.ip} highlight />
              <InfoRow label="国家" value={ipInfo.country || '-'} />
              <InfoRow label="地区" value={ipInfo.region || '-'} />
              <InfoRow label="城市" value={ipInfo.city || '-'} />
              <InfoRow label="运营商" value={ipInfo.org || '-'} />
              <InfoRow label="时区" value={ipInfo.timezone || '-'} />
            </div>
            <button onClick={fetchIp}
              className="mt-4 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]">
              重新查询
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">浏览器环境信息</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(extraInfo).map(([k, v]) => (
                <InfoRow key={k} label={k} value={v} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
        <p className="font-medium mb-1">隐私说明</p>
        <p>IP 查询通过第三方公开 API (ipapi.co) 获取，仅用于显示当前网络信息。本站不存储任何用户数据。</p>
      </div>

      <RelatedTools current="my-ip" />
    </div>
  )
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-sm ${highlight ? 'text-primary-700 font-mono font-semibold text-lg' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  )
}
