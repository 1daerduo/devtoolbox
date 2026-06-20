'use client'
import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const FAVICON_PATHS = [
  '/favicon.ico',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/apple-touch-icon-precomposed.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
]

export default function FaviconExtractorClient() {
  const [url, setUrl] = useState('')
  const [favicons, setFavicons] = useState<{ url: string; size: string; status: string }[]>([])
  const [loading, setLoading] = useState(false)

  const extract = async () => {
    let domain = url.trim()
    if (!domain) return
    if (!domain.startsWith('http')) domain = 'https://' + domain
    try { new URL(domain) } catch { alert('请输入有效的网址'); return }

    setLoading(true)
    setFavicons([])

    const results: { url: string; size: string; status: string }[] = []
    
    // Use Google's favicon service as fallback
    const googleFavicon = `https://www.google.com/s2/favicons?domain=${new URL(domain).hostname}&sz=128`
    results.push({ url: googleFavicon, size: '128×128', status: 'Google Favicon 服务' })

    // Try common favicon paths via a proxy approach (simplified - just show the URLs)
    FAVICON_PATHS.forEach(path => {
      const fullUrl = domain.replace(/\/$/, '') + path
      results.push({ url: fullUrl, size: '—', status: '待检测' })
    })

    setFavicons(results)
    setLoading(false)
  }

  const download = (faviconUrl: string) => {
    const a = document.createElement('a')
    a.href = faviconUrl
    a.download = faviconUrl.split('/').pop() || 'favicon'
    a.target = '_blank'
    a.rel = 'noopener'
    a.click()
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Favicon 提取器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Favicon 提取器 | Favicon Extractor</h1>
      <p className="text-sm text-gray-500 mb-6">输入网站 URL（如 `github.com`），自动查找并提取 Favicon 图标。</p>

      <div className="flex gap-3 mb-6">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="输入网址，如 github.com"
          className="flex-1 border rounded-lg p-3 text-sm bg-white border-gray-300 text-gray-900 placeholder-gray-400"
          onKeyDown={e => e.key === 'Enter' && extract()}
        />
        <button onClick={extract} disabled={loading} className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50">
          {loading ? '提取中...' : '提取 Favicon'}
        </button>
      </div>

      {favicons.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">找到的 Favicon：</p>
          {favicons.map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <img src={f.url} alt="favicon" className="w-8 h-8 border rounded" onError={e => (e.target as HTMLImageElement).style.display = 'none'} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 truncate">{f.url}</p>
                <p className="text-xs text-gray-500">{f.size} · {f.status}</p>
              </div>
              <button onClick={() => download(f.url)} className="text-sm text-primary-600 hover:text-primary-700 font-medium">下载</button>
            </div>
          ))}
        </div>
      )}

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="favicon-extractor" />
    </div>
  )
}
