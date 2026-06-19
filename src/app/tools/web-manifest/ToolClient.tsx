'use client'
import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const DISPLAY_OPTIONS = ['fullscreen', 'standalone', 'minimal-ui', 'browser'] as const
const ORIENTATION_OPTIONS = ['any', 'natural', 'landscape', 'portrait', 'portrait-primary', 'landscape-primary'] as const

export default function WebManifestClient() {
  const [name, setName] = useState('')
  const [shortName, setShortName] = useState('')
  const [description, setDescription] = useState('')
  const [themeColor, setThemeColor] = useState('#4F46E5')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [display, setDisplay] = useState<string>('standalone')
  const [orientation, setOrientation] = useState<string>('any')
  const [startUrl, setStartUrl] = useState('/')
  const [icons, setIcons] = useState<{ src: string; sizes: string; type: string }[]>([
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ])

  const manifest = useMemo(() => {
    const m: any = {
      name: name || undefined,
      short_name: shortName || undefined,
      description: description || undefined,
      theme_color: themeColor,
      background_color: bgColor,
      display,
      orientation,
      start_url: startUrl,
    }
    if (icons.some(i => i.src)) m.icons = icons.filter(i => i.src)
    return JSON.stringify(m, null, 2)
  }, [name, shortName, description, themeColor, bgColor, display, orientation, startUrl, icons])

  const download = () => {
    const blob = new Blob([manifest], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'manifest.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(manifest)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Web Manifest 生成器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Web Manifest 生成器 | Web Manifest Generator</h1>
      <p className="text-sm text-gray-500 mb-6">可视化配置 PWA manifest.json，支持名称/主题色/显示模式/图标等完整字段。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700 block mb-1">应用名称 <span className="text-red-500">*</span></label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="My PWA App" className="w-full border rounded-lg p-2.5 text-sm bg-white border-gray-300 text-gray-900" />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-1">短名称</label>
            <input value={shortName} onChange={e => setShortName(e.target.value)} placeholder="MyApp" className="w-full border rounded-lg p-2.5 text-sm bg-white border-gray-300 text-gray-900" />
          </div>
          <div>
            <label className="font-medium text-gray-700 block mb-1">描述</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="应用描述..." rows={2} className="w-full border rounded-lg p-2.5 text-sm bg-white border-gray-300 text-gray-900" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">主题色</label>
              <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} className="w-full h-10 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">背景色</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 border rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">显示模式</label>
              <select value={display} onChange={e => setDisplay(e.target.value)} className="w-full border rounded px-2 py-2 text-sm bg-white border-gray-300 text-gray-900">
                {DISPLAY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">屏幕方向</label>
              <select value={orientation} onChange={e => setOrientation(e.target.value)} className="w-full border rounded px-2 py-2 text-sm bg-white border-gray-300 text-gray-900">
                {ORIENTATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">启动 URL</label>
            <input value={startUrl} onChange={e => setStartUrl(e.target.value)} placeholder="/" className="w-full border rounded-lg p-2.5 text-sm bg-white border-gray-300 text-gray-900" />
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={download} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">下载 manifest.json</button>
            <button onClick={copyToClipboard} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-medium">复制 JSON</button>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2 font-medium">预览 manifest.json</p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-auto max-h-96">{manifest}</pre>
        </div>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="web-manifest" />
    </div>
  )
}
