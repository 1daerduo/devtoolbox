'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

interface SeoCheck {
  category: string
  name: string
  status: 'pass' | 'warn' | 'fail'
  message: string
}

export default function SeoCheckerClient() {
  const [input, setInput] = useState('')
  const [inputType, setInputType] = useState<'html' | 'url'>('html')
  const [checks, setChecks] = useState<SeoCheck[]>([])
  const [score, setScore] = useState(0)
  const [analyzed, setAnalyzed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const analyzeHtml = (html: string): SeoCheck[] => {
    const result: SeoCheck[] = []

    // 标题
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : ''
    if (!title) {
      result.push({ category: '基础 SEO', name: '页面标题', status: 'fail', message: '未找到 <title> 标签，这是 SEO 必备元素。' })
    } else {
      const len = title.length
      if (len < 10) {
        result.push({ category: '基础 SEO', name: '页面标题长度', status: 'warn', message: `标题过短 (${len} 字符)，建议 30-60 字符。` })
      } else if (len > 60) {
        result.push({ category: '基础 SEO', name: '页面标题长度', status: 'warn', message: `标题过长 (${len} 字符)，建议 30-60 字符。` })
      } else {
        result.push({ category: '基础 SEO', name: '页面标题', status: 'pass', message: `✓ "${title}" (${len} 字符，长度合理)` })
      }
    }

    // Meta description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*?)["']/i) ||
      html.match(/<meta\s+content=["']([^"']*?)["']\s+name=["']description["']/i)
    const desc = descMatch ? descMatch[1] : ''
    if (!desc) {
      result.push({ category: '基础 SEO', name: 'Meta Description', status: 'fail', message: '未找到 meta description 标签。' })
    } else {
      const len = desc.length
      if (len < 50) {
        result.push({ category: '基础 SEO', name: 'Meta Description 长度', status: 'warn', message: `描述过短 (${len} 字符)，建议 120-160 字符。` })
      } else if (len > 160) {
        result.push({ category: '基础 SEO', name: 'Meta Description 长度', status: 'warn', message: `描述过长 (${len} 字符)，建议 120-160 字符。` })
      } else {
        result.push({ category: '基础 SEO', name: 'Meta Description', status: 'pass', message: `✓ 长度合理 (${len} 字符)` })
      }
    }

    // Meta keywords
    const kwMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']*?)["']/i)
    if (kwMatch) {
      const kws = kwMatch[1].split(',').filter(k => k.trim())
      if (kws.length > 10) {
        result.push({ category: '基础 SEO', name: 'Meta Keywords', status: 'warn', message: `关键词过多 (${kws.length} 个)，建议 5-8 个核心关键词。` })
      } else {
        result.push({ category: '基础 SEO', name: 'Meta Keywords', status: 'pass', message: `✓ ${kws.length} 个关键词` })
      }
    } else {
      result.push({ category: '基础 SEO', name: 'Meta Keywords', status: 'warn', message: '未设置 meta keywords（影响较小但建议添加）。' })
    }

    // H1 标签
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi)
    if (!h1Matches || h1Matches.length === 0) {
      result.push({ category: '内容结构', name: 'H1 标签', status: 'fail', message: '页面没有 H1 标签，建议添加 1 个 H1 描述主题。' })
    } else if (h1Matches.length > 1) {
      result.push({ category: '内容结构', name: 'H1 标签', status: 'warn', message: `页面有 ${h1Matches.length} 个 H1 标签，建议只保留 1 个。` })
    } else {
      const h1Text = h1Matches[0].replace(/<[^>]+>/g, '').trim()
      result.push({ category: '内容结构', name: 'H1 标签', status: 'pass', message: `✓ "${h1Text.slice(0, 50)}${h1Text.length > 50 ? '...' : ''}"` })
    }

    // H2 标签
    const h2Count = (html.match(/<h2[\s>]/gi) || []).length
    if (h2Count === 0) {
      result.push({ category: '内容结构', name: 'H2 标签', status: 'warn', message: '未使用 H2 标签，建议用 H2 划分内容章节。' })
    } else {
      result.push({ category: '内容结构', name: 'H2 标签', status: 'pass', message: `✓ ${h2Count} 个 H2 标签` })
    }

    // 图片 Alt
    const imgMatches = html.match(/<img[^>]*>/gi) || []
    const imgNoAlt = imgMatches.filter(tag => !/<img[^>]*\salt\s*=/i.test(tag) && !/<img[^>]*\salt\s*=\s*["']\s*["']/i.test(tag))
    if (imgMatches.length === 0) {
      result.push({ category: '图片优化', name: '图片', status: 'warn', message: '页面没有图片。' })
    } else if (imgNoAlt.length > 0) {
      result.push({ category: '图片优化', name: '图片 Alt 属性', status: 'fail', message: `${imgNoAlt.length}/${imgMatches.length} 张图片缺少 alt 描述。` })
    } else {
      result.push({ category: '图片优化', name: '图片 Alt 属性', status: 'pass', message: `✓ 所有 ${imgMatches.length} 张图片均有 alt` })
    }

    // Canonical
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*?)["']/i) ||
      html.match(/<link[^>]*href=["']([^"']*?)["'][^>]*rel=["']canonical["']/i)
    if (canonical) {
      result.push({ category: '技术 SEO', name: 'Canonical 标签', status: 'pass', message: `✓ ${canonical[1]}` })
    } else {
      result.push({ category: '技术 SEO', name: 'Canonical 标签', status: 'warn', message: '未设置 canonical URL，建议添加避免重复内容。' })
    }

    // Open Graph
    const ogTitle = html.match(/<meta\s+property=["']og:title["']/i)
    const ogDesc = html.match(/<meta\s+property=["']og:description["']/i)
    const ogImage = html.match(/<meta\s+property=["']og:image["']/i)
    const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length
    if (ogCount === 3) {
      result.push({ category: '社交分享', name: 'Open Graph', status: 'pass', message: '✓ og:title / og:description / og:image 完整' })
    } else if (ogCount > 0) {
      result.push({ category: '社交分享', name: 'Open Graph', status: 'warn', message: `部分缺失 (${ogCount}/3)，建议补全 og:title/description/image。` })
    } else {
      result.push({ category: '社交分享', name: 'Open Graph', status: 'fail', message: '未配置 Open Graph，分享到社交平台效果差。' })
    }

    // Twitter Card
    const twCard = html.match(/<meta\s+name=["']twitter:card["']/i)
    if (twCard) {
      result.push({ category: '社交分享', name: 'Twitter Card', status: 'pass', message: '✓ 已配置' })
    } else {
      result.push({ category: '社交分享', name: 'Twitter Card', status: 'warn', message: '未配置 Twitter Card。' })
    }

    // Viewport
    const viewport = html.match(/<meta\s+name=["']viewport["']/i)
    if (viewport) {
      result.push({ category: '移动优化', name: 'Viewport', status: 'pass', message: '✓ 已配置移动端 viewport' })
    } else {
      result.push({ category: '移动优化', name: 'Viewport', status: 'fail', message: '未配置 viewport，移动端显示异常。' })
    }

    // 内链
    const internalLinks = (html.match(/<a\s+[^>]*href=["']\//gi) || []).length
    const externalLinks = (html.match(/<a\s+[^>]*href=["']https?:\/\//gi) || []).length
    if (internalLinks === 0 && externalLinks === 0) {
      result.push({ category: '链接结构', name: '链接', status: 'warn', message: '页面没有任何链接。' })
    } else {
      result.push({ category: '链接结构', name: '链接统计', status: 'pass', message: `内链 ${internalLinks} · 外链 ${externalLinks}` })
    }

    // 内容长度
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    const text = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''
    const wordCount = text.length
    if (wordCount < 300) {
      result.push({ category: '内容质量', name: '内容长度', status: 'warn', message: `内容较短 (${wordCount} 字符)，建议 300+ 字符。` })
    } else {
      result.push({ category: '内容质量', name: '内容长度', status: 'pass', message: `✓ ${wordCount} 字符` })
    }

    // 标题关键词
    if (title) {
      const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 2)
      const descLower = desc.toLowerCase()
      const matchedWords = titleWords.filter(w => descLower.includes(w))
      if (matchedWords.length > 0) {
        result.push({ category: '关键词优化', name: '标题-描述关键词一致性', status: 'pass', message: `✓ 匹配 ${matchedWords.length} 个关键词` })
      } else {
        result.push({ category: '关键词优化', name: '标题-描述关键词一致性', status: 'warn', message: '标题和描述中关键词不匹配。' })
      }
    }

    return result
  }

  const calcScore = (cs: SeoCheck[]): number => {
    if (cs.length === 0) return 0
    const total = cs.length * 100
    const earned = cs.reduce((acc, c) => {
      if (c.status === 'pass') return acc + 100
      if (c.status === 'warn') return acc + 50
      return acc
    }, 0)
    return Math.round((earned / total) * 100)
  }

  const handleAnalyze = async () => {
    setError('')
    setAnalyzed(false)
    if (!input.trim()) {
      setError('请输入 HTML 代码或 URL')
      return
    }

    let html = input
    if (inputType === 'url') {
      setLoading(true)
      try {
        // 通过 allorigins.win 跨域代理获取 HTML（公共 CORS 代理）
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(input)}`
        const res = await fetch(proxyUrl)
        if (!res.ok) throw new Error('无法访问该 URL')
        html = await res.text()
      } catch (e) {
        setError('获取 URL 失败：' + (e instanceof Error ? e.message : '网络错误').slice(0, 100))
        setLoading(false)
        return
      }
      setLoading(false)
    }

    const result = analyzeHtml(html)
    setChecks(result)
    setScore(calcScore(result))
    setAnalyzed(true)
  }

  const loadSample = () => {
    setInputType('html')
    setInput(`<!DOCTYPE html>
<html>
<head>
  <title>在线开发者工具集合 - 70+ 款免费工具</title>
  <meta name="description" content="免费在线开发者工具集合站。提供 JSON 格式化、JWT 解码、SQL 格式化、Base64 编解码、二维码生成等 70+ 款实用工具。全部在浏览器本地处理。">
  <meta name="keywords" content="开发者工具,JSON,JWT,Base64,在线工具">
  <link rel="canonical" href="https://moretoolbox.com">
  <meta property="og:title" content="MoreToolbox">
  <meta property="og:description" content="70+ 免费在线开发者工具">
  <meta property="og:image" content="https://moretoolbox.com/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>在线开发者工具</h1>
  <h2>格式化工具</h2>
  <p>提供 JSON、XML、HTML、CSS、SQL 等格式化功能。</p>
  <img src="/logo.png" alt="MoreToolbox logo">
  <a href="/tools/json-formatter">JSON 格式化</a>
</body>
</html>`)
  }

  const groupedChecks = checks.reduce<Record<string, SeoCheck[]>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  const scoreColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'
  const scoreBg = score >= 80 ? 'bg-green-100' : score >= 50 ? 'bg-yellow-100' : 'bg-red-100'

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'SEO 检查器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">On-Page SEO 检查器 | SEO Audit Tool</h1>
      <p className="text-sm text-gray-500 mb-6">分析页面 SEO 关键指标：标题、描述、H1、图片 Alt、Canonical、Open Graph 等。粘贴 HTML 或输入 URL 自动分析。</p>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-4 mb-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={inputType === 'html'} onChange={() => setInputType('html')} />
            HTML 代码
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={inputType === 'url'} onChange={() => setInputType('url')} />
            网页 URL
          </label>
          <button onClick={loadSample} className="ml-auto text-xs text-primary-600 hover:text-primary-700">
            加载示例
          </button>
        </div>

        {inputType === 'html' ? (
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
            placeholder="粘贴 HTML 代码..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500" />
        ) : (
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
        )}

        {error && <p className="text-red-600 text-sm mt-2">⚠️ {error}</p>}

        <button onClick={handleAnalyze} disabled={loading}
          className="mt-3 w-full sm:w-auto px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 text-sm font-medium min-h-[44px]">
          {loading ? '⏳ 抓取中...' : '🔍 开始 SEO 分析'}
        </button>
      </div>

      {analyzed && (
        <>
          {/* 评分卡 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 text-center">
            <div className="text-sm text-gray-500 mb-1">SEO 综合评分</div>
            <div className={`text-5xl font-bold ${scoreColor} mb-2`}>{score}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${scoreBg}`}>
              {score >= 80 ? '优秀 ✨' : score >= 50 ? '及格，需改进' : '较差，急需优化'}
            </div>
            <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
              <span>✅ 通过 {checks.filter(c => c.status === 'pass').length}</span>
              <span>⚠️ 警告 {checks.filter(c => c.status === 'warn').length}</span>
              <span>❌ 错误 {checks.filter(c => c.status === 'fail').length}</span>
            </div>
          </div>

          {/* 分类检查结果 */}
          <div className="space-y-4">
            {Object.entries(groupedChecks).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">{category}</h3>
                <div className="space-y-2">
                  {items.map((c, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                      c.status === 'pass' ? 'bg-green-50' : c.status === 'warn' ? 'bg-yellow-50' : 'bg-red-50'
                    }`}>
                      <span className="text-lg flex-shrink-0">
                        {c.status === 'pass' ? '✅' : c.status === 'warn' ? '⚠️' : '❌'}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{c.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <RelatedTools current="seo-checker" />
    </div>
  )
}
