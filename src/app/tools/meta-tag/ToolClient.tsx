'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

export default function MetaTagClient() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [ogTitle, setOgTitle] = useState('')
  const [ogDescription, setOgDescription] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [ogUrl, setOgUrl] = useState('')
  const [siteName, setSiteName] = useState('')
  const [twitterCard, setTwitterCard] = useState('summary_large_image')
  const [robots, setRobots] = useState('index, follow')
  const [copied, setCopied] = useState(false)

  const generateHTML = useCallback(() => {
    const t = title || '网站标题'
    const d = description || '网站描述'
    
    let html = '<!-- SEO Meta 标签 -->\n'
    html += `<title>${t}</title>\n`
    html += `<meta name="description" content="${d}">\n`
    if (keywords) html += `<meta name="keywords" content="${keywords}">\n`
    html += `<meta name="robots" content="${robots}">\n\n`
    
    html += '<!-- Open Graph 标签 -->\n'
    html += `<meta property="og:title" content="${ogTitle || t}">\n`
    html += `<meta property="og:description" content="${ogDescription || d}">\n`
    if (ogUrl) html += `<meta property="og:url" content="${ogUrl}">\n`
    if (ogImage) html += `<meta property="og:image" content="${ogImage}">\n`
    if (siteName) html += `<meta property="og:site_name" content="${siteName}">\n`
    html += `<meta property="og:type" content="website">\n`
    html += `<meta property="og:locale" content="zh_CN">\n\n`
    
    html += '<!-- Twitter Card -->\n'
    html += `<meta name="twitter:card" content="${twitterCard}">\n`
    html += `<meta name="twitter:title" content="${ogTitle || t}">\n`
    html += `<meta name="twitter:description" content="${ogDescription || d}">\n`
    if (ogImage) html += `<meta name="twitter:image" content="${ogImage}">\n`
    
    return html
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, siteName, twitterCard, robots])

  const html = generateHTML()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Meta 标签生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Meta 标签生成器 | Meta Tag Generator</h1>
      <p className="text-sm text-gray-500 mb-6">可视化生成 SEO Meta 标签、Open Graph 和 Twitter Card 标签，一键复制 HTML 代码。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* SEO Meta */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">🔍 SEO 基础标签</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">页面标题 (Title)</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="我的网站标题"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">页面描述 (Description)</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="网站描述，建议120-160字符" rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">关键词 (Keywords)</label>
                <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="关键词1, 关键词2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Robots 规则</label>
                <select value={robots} onChange={e => setRobots(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">📱 Open Graph (社交分享)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">OG 标题</label>
                <input value={ogTitle} onChange={e => setOgTitle(e.target.value)} placeholder="与页面标题相同（留空则自动使用）"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">OG 描述</label>
                <textarea value={ogDescription} onChange={e => setOgDescription(e.target.value)} rows={2} placeholder="社交分享描述"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">OG 图片 URL</label>
                  <input value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">页面 URL</label>
                  <input value={ogUrl} onChange={e => setOgUrl(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">站点名称</label>
                <input value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="我的网站"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
          </div>

          {/* Twitter Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">🐦 Twitter Card</h3>
            <select value={twitterCard} onChange={e => setTwitterCard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
              <option value="summary_large_image">summary_large_image (大图卡片)</option>
              <option value="summary">summary (小图卡片)</option>
              <option value="app">app (应用卡片)</option>
              <option value="player">player (视频卡片)</option>
            </select>
          </div>
        </div>

        <div>
          {/* Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">👁️ 搜索结果预览</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-base text-blue-700 leading-tight hover:underline cursor-pointer">
                {title || '页面标题 - 网站名称'}
              </div>
              <div className="text-xs text-green-700 mt-0.5">
                {ogUrl || 'https://example.com/page'}
              </div>
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                {description || '这是页面的描述文字，会显示在搜索结果中...'}
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">📋 生成的 HTML 代码</h3>
              <button onClick={handleCopy}
                className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                {copied ? '✓ 已复制' : '一键复制'}
              </button>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
              {html}
            </pre>
          </div>
        </div>
      </div>

      <RelatedTools current="meta-tag" />
    </div>
  )
}
