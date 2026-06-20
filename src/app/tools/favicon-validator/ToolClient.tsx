'use client'
import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const CHECKS = [
  { path: '/favicon.ico', label: 'favicon.ico', recommended: true },
  { path: '/favicon.png', label: 'favicon.png', recommended: false },
  { path: '/apple-touch-icon.png', label: 'Apple Touch Icon', recommended: true },
  { path: '/android-chrome-192x192.png', label: 'Android Chrome 192px', recommended: true },
  { path: '/android-chrome-512x512.png', label: 'Android Chrome 512px', recommended: true },
  { path: '/manifest.json', label: 'Web Manifest', recommended: true },
  { path: '/browserconfig.xml', label: 'IE Tile Config', recommended: false },
]

export default function FaviconValidatorClient() {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<{ path: string; label: string; recommended: boolean; status: 'ok' | 'missing' | 'pending' }[]>([])
  const [checking, setChecking] = useState(false)

  const validate = async () => {
    let domain = url.trim()
    if (!domain) return
    if (!domain.startsWith('http')) domain = 'https://' + domain
    try { new URL(domain) } catch { alert('请输入有效的网址'); return }

    setChecking(true)
    setResults(CHECKS.map(c => ({ ...c, status: 'pending' as const })))

    const newResults = await Promise.all(CHECKS.map(async (check) => {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)
        const response = await fetch(domain + check.path, { method: 'HEAD', mode: 'no-cors', signal: controller.signal })
        clearTimeout(timeout)
        return { ...check, status: 'ok' as const }
      } catch {
        return { ...check, status: 'missing' as const }
      }
    }))

    setResults(newResults)
    setChecking(false)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Favicon 校验器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Favicon 校验器 | Favicon Validator</h1>
      <p className="text-sm text-gray-500 mb-6">输入网站 URL，检测 Favicon 配置完整性，查看缺失的图标文件。</p>

      <div className="flex gap-3 mb-6">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="输入网址，如 github.com"
          className="flex-1 border rounded-lg p-3 text-sm bg-white border-gray-300 text-gray-900 placeholder-gray-400"
          onKeyDown={e => e.key === 'Enter' && validate()}
        />
        <button onClick={validate} disabled={checking} className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50">
          {checking ? '检测中...' : '开始检测'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className={`w-3 h-3 rounded-full ${r.status === 'ok' ? 'bg-green-500' : r.status === 'missing' ? 'bg-red-500' : 'bg-yellow-400'}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{r.label}{r.recommended && <span className="text-xs text-orange-500 ml-1">推荐</span>}</p>
                <p className="text-xs text-gray-500">{r.path}</p>
              </div>
              <span className={`text-xs font-medium ${r.status === 'ok' ? 'text-green-600' : r.status === 'missing' ? 'text-red-600' : 'text-yellow-600'}`}>
                {r.status === 'ok' ? '✓ 存在' : r.status === 'missing' ? '✗ 缺失' : '检测中...'}
              </span>
            </div>
          ))}
        </div>
      )}

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="favicon-validator" />
    </div>
  )
}
