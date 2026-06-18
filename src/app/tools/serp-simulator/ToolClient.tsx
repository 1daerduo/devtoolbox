'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

type Device = 'desktop' | 'mobile'

export default function SerpSimulatorClient() {
  const [title, setTitle] = useState('在线开发者工具集合 - JSON 格式化、JWT 解码、二维码生成')
  const [url, setUrl] = useState('https://moretoolbox.com/tools')
  const [description, setDescription] = useState('免费在线开发者工具集合站。提供 70+ 款实用工具，包括 JSON 格式化、JWT 解码、SQL 格式化、Base64 编解码、二维码生成等。全部在浏览器本地处理，数据安全无需注册。')
  const [device, setDevice] = useState<Device>('desktop')
  const [showRich, setShowRich] = useState(true)

  // 富文本片段
  const [rating, setRating] = useState('4.8')
  const [reviewCount, setReviewCount] = useState('2,540')
  const [price, setPrice] = useState('免费')
  const [showFaq, setShowFaq] = useState(true)
  const [showSitelinks, setShowSitelinks] = useState(true)

  // 字符数
  const titleLen = title.length
  const descLen = description.length
  const titleWarn = titleLen > 60 || titleLen < 10
  const descWarn = descLen > 160 || descLen < 50

  // URL 处理：面包屑形式
  const displayUrl = useMemo(() => {
    try {
      const u = new URL(url)
      return `${u.protocol}//${u.hostname}${u.pathname !== '/' ? u.pathname : ''}`
    } catch {
      return url
    }
  }, [url])

  // 截断显示
  const truncatedTitle = title.length > 60 ? title.slice(0, 57) + '...' : title
  const truncatedDesc = description.length > 160 ? description.slice(0, 157) + '...' : description

  // 面包屑
  const breadcrumbParts = useMemo(() => {
    try {
      const u = new URL(url)
      const path = u.pathname === '/' ? '' : u.pathname
      const parts = path.split('/').filter(Boolean)
      return [u.hostname, ...parts]
    } catch {
      return [url]
    }
  }, [url])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'SERP 预览器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Google SERP 预览器 | Search Results Preview Simulator</h1>
      <p className="text-sm text-gray-500 mb-6">实时预览网页在 Google 搜索结果中的显示效果，桌面/移动双视图，含字符长度检查。</p>

      {/* 设备切换 + 富文本开关 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              device === 'desktop' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🖥️ 桌面
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              device === 'mobile' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📱 移动
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={showRich} onChange={e => setShowRich(e.target.checked)} className="rounded" />
          显示富文本摘要
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：输入 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">✏️ 页面信息</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-500">页面标题 (Title)</label>
                  <span className={`text-xs ${titleWarn ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
                    {titleLen} / 60 {titleWarn && (titleLen > 60 ? '⚠️ 太长' : '⚠️ 太短')}
                  </span>
                </div>
                <input value={title} onChange={e => setTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 ${
                    titleWarn ? 'border-red-300' : 'border-gray-300'
                  }`} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">页面 URL</label>
                <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-500">页面描述 (Description)</label>
                  <span className={`text-xs ${descWarn ? 'text-red-600 font-semibold' : 'text-gray-400'}`}>
                    {descLen} / 160 {descWarn && (descLen > 160 ? '⚠️ 太长' : '⚠️ 太短')}
                  </span>
                </div>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 ${
                    descWarn ? 'border-red-300' : 'border-gray-300'
                  }`} />
              </div>
            </div>
          </div>

          {showRich && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">⭐ 富文本摘要数据</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">评分 (1-5)</label>
                    <input value={rating} onChange={e => setRating(e.target.value)} placeholder="4.8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">评论数</label>
                    <input value={reviewCount} onChange={e => setReviewCount(e.target.value)} placeholder="2,540"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">价格</label>
                  <input value={price} onChange={e => setPrice(e.target.value)} placeholder="免费 / ¥99 起"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={showFaq} onChange={e => setShowFaq(e.target.checked)} className="rounded" />
                  显示 FAQ 摘要
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={showSitelinks} onChange={e => setShowSitelinks(e.target.checked)} className="rounded" />
                  显示 Sitelinks（站内链接）
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：SERP 预览 */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              🔍 Google 搜索结果预览 ({device === 'desktop' ? '桌面' : '移动'})
            </h3>

            {/* 搜索框模拟 */}
            <div className="border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2 mb-6">
              <span className="text-gray-400">🔍</span>
              <span className="text-sm text-gray-700">在线开发者工具</span>
            </div>

            {/* SERP 结果 */}
            <div className={`${device === 'mobile' ? 'pl-0' : 'pl-8'} ${device === 'mobile' ? 'max-w-sm' : ''}`}>
              <div className="mb-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div>
                    <div className="text-xs text-gray-800">MoreToolbox</div>
                  </div>
                </div>
                <div className="text-xs text-green-700">{displayUrl}</div>
              </div>

              <h3 className={`text-primary-700 hover:underline cursor-pointer ${device === 'mobile' ? 'text-base' : 'text-xl'} font-normal leading-tight mb-1`}>
                {truncatedTitle}
              </h3>

              {showRich && (
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span>评分: {rating}</span>
                  <span>·</span>
                  <span>{reviewCount} 条评论</span>
                  <span>·</span>
                  <span className="text-primary-700">{price}</span>
                </div>
              )}

              <p className={`text-gray-600 ${device === 'mobile' ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                {truncatedDesc}
              </p>

              {showRich && showSitelinks && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="text-primary-700 hover:underline cursor-pointer">JSON 格式化</div>
                  <div className="text-primary-700 hover:underline cursor-pointer">JWT 解码</div>
                  <div className="text-primary-700 hover:underline cursor-pointer">二维码生成</div>
                  <div className="text-primary-700 hover:underline cursor-pointer">SQL 格式化</div>
                </div>
              )}

              {showRich && showFaq && (
                <div className="mt-3 space-y-1 text-xs">
                  <details className="cursor-pointer">
                    <summary className="text-primary-700 hover:underline">这些工具是免费的吗？</summary>
                    <p className="text-gray-600 mt-1 pl-3">是的，所有工具完全免费，无需注册。</p>
                  </details>
                  <details className="cursor-pointer">
                    <summary className="text-primary-700 hover:underline">数据会上传到服务器吗？</summary>
                    <p className="text-gray-600 mt-1 pl-3">不会，所有处理都在浏览器本地完成。</p>
                  </details>
                </div>
              )}

              <div className="text-xs text-gray-400 mt-3 italic">
                * 预视为示意图，实际 Google 显示取决于算法和富文本验证
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-semibold text-gray-600 mb-2">📊 SEO 检查</h4>
              <ul className="space-y-1 text-xs">
                <li className={titleLen > 0 ? 'text-green-600' : 'text-red-600'}>
                  {titleLen > 0 ? '✓' : '✗'} 标题已填写
                </li>
                <li className={titleLen >= 10 && titleLen <= 60 ? 'text-green-600' : 'text-yellow-600'}>
                  {titleLen >= 10 && titleLen <= 60 ? '✓' : '⚠'} 标题长度 ({titleLen} 字符，建议 10-60)
                </li>
                <li className={descLen >= 50 && descLen <= 160 ? 'text-green-600' : 'text-yellow-600'}>
                  {descLen >= 50 && descLen <= 160 ? '✓' : '⚠'} 描述长度 ({descLen} 字符，建议 50-160)
                </li>
                <li className={url.startsWith('https://') ? 'text-green-600' : 'text-yellow-600'}>
                  {url.startsWith('https://') ? '✓' : '⚠'} 使用 HTTPS
                </li>
                <li className={breadcrumbParts.length > 1 ? 'text-green-600' : 'text-yellow-600'}>
                  {breadcrumbParts.length > 1 ? '✓' : '⚠'} 面包屑路径清晰
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools current="serp-simulator" />
    </div>
  )
}
