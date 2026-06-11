'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import AdBanner from '@/components/AdBanner'

const tools = [
  // 格式化
  { name: 'JSON 格式化', desc: '格式化、压缩、验证 JSON 数据，支持语法高亮显示。', href: '/tools/json-formatter', icon: '{ }', category: '格式化' },
  { name: 'XML 格式化', desc: 'XML 格式化与压缩，支持自定义缩进。', href: '/tools/xml-formatter', icon: '<>', category: '格式化' },
  { name: 'CSS 格式化', desc: 'CSS 美化与压缩，一键复制输出结果。', href: '/tools/css-formatter', icon: '🎨', category: '格式化' },
  { name: 'SQL 格式化', desc: 'SQL 美化与压缩，支持多种数据库方言。', href: '/tools/sql-formatter', icon: '🛢️', category: '格式化' },
  { name: 'YAML 格式化', desc: 'YAML ↔ JSON 互转与格式验证，DevOps 必备。', href: '/tools/yaml-formatter', icon: 'Y↔J', category: '格式化' },
  { name: 'HTML 格式化', desc: 'HTML 代码美化与压缩，支持自定义缩进。', href: '/tools/html-formatter', icon: '🔖', category: '格式化' },
  { name: 'JS 格式化', desc: 'JavaScript 代码美化与压缩，前端开发调试必备。', href: '/tools/js-formatter', icon: '⚡', category: '格式化' },

  // 编解码
  { name: 'Base64 编解码', desc: '文本与 Base64 互相编码/解码，支持 UTF-8。', href: '/tools/base64', icon: 'B64', category: '编解码' },
  { name: 'URL 编码解码', desc: 'URL 编码与解码，将特殊字符转为 %XX 格式。', href: '/tools/url-encode', icon: '🔗', category: '编解码' },
  { name: 'HTML 实体编解码', desc: 'HTML 特殊字符与实体互相转换，防 XSS。', href: '/tools/html-entity', icon: '🔣', category: '编解码' },
  { name: 'JWT 解码器', desc: '在线解析 JWT Token，查看 Header/Payload/Signature。', href: '/tools/jwt-decoder', icon: '🔑', category: '编解码' },
  { name: 'Base64 图片互转', desc: '图片与 Base64 编码互转，支持拖拽上传和粘贴截图。', href: '/tools/base64-image', icon: '🖼️', category: '编解码' },

  // 生成器
  { name: '二维码生成器', desc: '输入文本或网址，实时生成可下载的二维码。', href: '/tools/qrcode', icon: '▣', category: '生成器' },
  { name: 'UUID 生成器', desc: '生成 UUID v4/v7，支持批量生成一键复制。', href: '/tools/uuid-generator', icon: '🆔', category: '生成器' },
  { name: '密码生成器', desc: '生成安全随机密码，支持自定义长度与字符类型。', href: '/tools/password-generator', icon: '🔐', category: '生成器' },
  { name: '哈希生成器', desc: 'MD5、SHA-1、SHA-256、SHA-512 哈希值生成。', href: '/tools/hash-generator', icon: '#️⃣', category: '生成器' },
  { name: 'Cron 表达式生成器', desc: '可视化生成 Cron 定时表达式，实时预览下次执行时间。', href: '/tools/cron-generator', icon: '⏱️', category: '生成器' },
  { name: 'Lorem Ipsum 生成器', desc: '生成中英文占位文本，支持自定义段落数，前端设计必备。', href: '/tools/lorem-ipsum', icon: '📃', category: '生成器' },
  { name: 'Bcrypt 生成验证', desc: '安全生成 Bcrypt 密码哈希，验证密码与哈希是否匹配。', href: '/tools/bcrypt-generator', icon: '🔒', category: '生成器' },

  // 转换器
  { name: '时间戳转换', desc: 'Unix 时间戳与日期时间互相转换，支持秒/毫秒。', href: '/tools/timestamp', icon: '🕐', category: '转换器' },
  { name: '颜色转换', desc: 'HEX、RGB、HSL 三种颜色格式互相转换。', href: '/tools/color-converter', icon: '🎨', category: '转换器' },
  { name: 'JSON ↔ CSV 转换', desc: 'JSON 与 CSV 格式互转，支持自定义分隔符。', href: '/tools/json-to-csv', icon: '⇄', category: '转换器' },
  { name: '大小写转换', desc: '大写/小写/驼峰/蛇形等 9 种格式互转。', href: '/tools/case-converter', icon: 'Aa', category: '转换器' },
  { name: '进制转换器', desc: '二进制、八进制、十进制、十六进制等多种进制互转。', href: '/tools/number-base', icon: '🔢', category: '转换器' },
  { name: 'Markdown 转 HTML', desc: 'Markdown 转换为 HTML 代码，实时预览渲染效果。', href: '/tools/markdown-to-html', icon: '↗️', category: '转换器' },

  // 文本工具
  { name: '正则表达式测试', desc: '在线测试正则表达式，支持实时匹配高亮与解释。', href: '/tools/regex', icon: '.*', category: '文本工具' },
  { name: '字数统计', desc: '实时统计中文字符、英文单词、段落数、句子数。', href: '/tools/word-count', icon: '📝', category: '文本工具' },
  { name: '文本去重排序', desc: '按行去重、排序、反转、去空行。', href: '/tools/text-dedup', icon: '📋', category: '文本工具' },
  { name: 'Markdown 编辑器', desc: '实时预览 Markdown，导出 HTML 或 .md 文件。', href: '/tools/markdown-editor', icon: '📄', category: '文本工具' },
  { name: '文本差异对比', desc: '在线 Diff Checker，可视化两个文本的行级差异。', href: '/tools/diff-checker', icon: '≠', category: '文本工具' },

  // 图像/其他
  { name: '图片压缩', desc: '在线压缩 PNG/JPG/WebP，调节质量，实时预览。', href: '/tools/image-compressor', icon: '🖼️', category: '图像/其他' },
  { name: '图片格式转换', desc: 'JPG/PNG/WebP/BMP 格式互转，拖拽上传，纯浏览器处理。', href: '/tools/image-converter', icon: '🔄', category: '图像/其他' },
  { name: 'CSS 渐变生成器', desc: '可视化生成线性/径向/圆锥渐变，多色标自由调节。', href: '/tools/css-gradient', icon: '🌈', category: '图像/其他' },
  { name: 'SVG 转 PNG', desc: '在线将 SVG 矢量图转为 PNG 位图，自定义尺寸背景。', href: '/tools/svg-to-png', icon: '🖼️→', category: '图像/其他' },

  // 查询工具
  { name: 'IP 地址查询', desc: '查询公网 IP、地理位置、运营商和浏览器信息。', href: '/tools/my-ip', icon: '🌐', category: '查询工具' },
  { name: 'User Agent 解析', desc: '解析浏览器 UA 字符串，识别浏览器/OS/设备类型。', href: '/tools/user-agent', icon: '🔍', category: '查询工具' },
  { name: '邮箱验证器', desc: '在线验证邮箱格式，支持批量检测，数据本地处理。', href: '/tools/email-validator', icon: '📧', category: '查询工具' },

  // 网络工具
  { name: 'DNS 查询工具', desc: '在线查询 A/AAAA/CNAME/MX/NS/TXT 等 DNS 记录。', href: '/tools/dns-lookup', icon: '🌍', category: '网络工具' },

  // SEO工具
  { name: 'Meta 标签生成器', desc: '生成 SEO Meta/OG/Twitter Card 标签，可视化预览。', href: '/tools/meta-tag', icon: '🏷️', category: 'SEO工具' },

  // 设计工具
  { name: 'CSS Box Shadow 生成器', desc: '可视化构建 CSS box-shadow，支持多层阴影、内阴影、颜色透明度调节。', href: '/tools/box-shadow-generator', icon: '🔲', category: '设计工具' },
  { name: '颜色调色板生成器', desc: '一键生成和谐配色方案，支持类比/单色/互补等多种配色模式。', href: '/tools/color-palette', icon: '🎨', category: '设计工具' },

  // 在线编辑器
  { name: 'HTML/CSS/JS Playground', desc: '在线代码编辑器，实时预览 HTML/CSS/JavaScript 代码效果。', href: '/tools/html-playground', icon: '💻', category: '在线编辑器' },

  // 安全/参考工具
  { name: '密码强度检查器', desc: '在线检测密码安全性，计算熵值和预估破解时间，100%本地处理。', href: '/tools/password-strength', icon: '🛡️', category: '安全工具' },
  { name: 'HTTP 状态码参考', desc: 'HTTP 响应状态码完整参考，支持搜索和分类筛选。', href: '/tools/http-status-codes', icon: '📡', category: '参考工具' },
  { name: 'URL 解析器', desc: '解析 URL 各组成部分：协议、域名、端口、路径、查询参数、Hash。', href: '/tools/url-parser', icon: '🔗', category: '参考工具' },

  // Round 5 (new)
  { name: '正则表达式测试器', desc: '在线 Regex 调试，实时匹配高亮、捕获组查看、替换功能、常用正则库。', href: '/tools/regex-tester', icon: '.*', category: '文本工具' },
  { name: 'JSON Schema 验证器', desc: '通过 Schema 定义校验 JSON 数据结构，精准定位错误字段。', href: '/tools/json-schema-validator', icon: '📋✓', category: '格式化' },
  { name: '图片尺寸调整', desc: '在线调整图片宽高，支持像素/百分比缩放，保持宽高比。', href: '/tools/image-resizer', icon: '📐', category: '图像/其他' },
  { name: 'UUID 解码器', desc: '解析 UUID 结构，查看版本、变体、时间戳等详细信息。', href: '/tools/uuid-decoder', icon: '🆔→', category: '编解码' },
  { name: 'CSV 表格查看器', desc: '在线浏览 CSV/TSV 表格数据，支持搜索筛选分页，自动检测分隔符。', href: '/tools/csv-viewer', icon: '📊', category: '转换器' },
  { name: 'Emoji 选择器', desc: '浏览搜索 Emoji，一键复制字符/HTML实体/CSS代码。', href: '/tools/emoji-picker', icon: '😀', category: '文本工具' },
  { name: '二维码扫描器', desc: '上传或粘贴二维码图片，在线解码识别 QR Code 内容。', href: '/tools/qr-scanner', icon: '📷', category: '图像/其他' },
  { name: 'ASCII 艺术字生成器', desc: '文字转 ASCII 字符画，多字体风格，可复制到代码注释或社交媒体。', href: '/tools/ascii-art-generator', icon: '𝐀', category: '生成器' },
  // Favicon 工具套件 (Round 6)
  { name: 'Favicon 生成器', desc: '上传图片生成全尺寸 Favicon（ICO + PNG 16/32/48/64/128/256px），一键下载。', href: '/tools/favicon-generator', icon: '🔖', category: 'Favicon工具' },
  { name: '文字 Favicon 生成器', desc: '输入文字，选择字体/颜色/背景，生成字母 Favicon，实时预览。', href: '/tools/favicon-text', icon: 'Aa', category: 'Favicon工具' },
  { name: 'Emoji Favicon 生成器', desc: '选择 Emoji，生成透明背景 Favicon，支持多种尺寸一键打包下载。', href: '/tools/favicon-emoji', icon: '😀', category: 'Favicon工具' },
  { name: 'Favicon 提取器', desc: '输入网站 URL，自动提取所有尺寸 Favicon 图标，一键下载 ZIP。', href: '/tools/favicon-extractor', icon: '📥', category: 'Favicon工具' },
  { name: 'Favicon 校验器', desc: '检查网站 Favicon 配置是否完整，检测缺失尺寸和格式问题。', href: '/tools/favicon-validator', icon: '✅', category: 'Favicon工具' },
  { name: 'Web Manifest 生成器', desc: '可视化生成 PWA manifest.json，配置图标/名称/主题色/显示模式。', href: '/tools/web-manifest', icon: '📱', category: 'Favicon工具' },
]

const categories = ['全部', '格式化', '编解码', '生成器', '转换器', '文本工具', '查询工具', '网络工具', 'SEO工具', '图像/其他', '设计工具', '在线编辑器', 'Favicon工具', '安全工具', '参考工具']

const categoryIcons: Record<string, string> = {
  '全部': '🏠',
  '格式化': '📐',
  '编解码': '🔄',
  '生成器': '⚙️',
  '转换器': '🔀',
  '文本工具': '📝',
  '查询工具': '🔍',
  '网络工具': '🌍',
  'SEO工具': '🏷️',
  '图像/其他': '🖼️',
  '设计工具': '🎯',
  '在线编辑器': '💻',
  '安全工具': '🛡️',
  '参考工具': '📖',
  'Favicon工具': '🔖',
}

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [recentTools, setRecentTools] = useState<string[]>([])

  // 从 sessionStorage 读取最近使用
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('recent-tools')
      if (stored) setRecentTools(JSON.parse(stored))
    } catch {}
  }, [])

  // 搜索 + 分类过滤
  const filteredTools = useMemo(() => {
    let result = tools
    if (activeCategory !== '全部') {
      result = result.filter(t => t.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.href.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, activeCategory])

  // 最近使用的工具对象
  const recentToolItems = useMemo(() => {
    return recentTools
      .map(href => tools.find(t => t.href === href))
      .filter(Boolean)
  }, [recentTools])

  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 md:py-16 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          在线开发者工具集合
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 px-4">
          免费、快速、无需注册。JSON 格式化、JWT 解码、SQL 格式化、时间戳转换……
          54 款开发工具，一站式解决。
        </p>

        {/* 搜索框 */}
        <div className="max-w-lg mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜索工具，如：JSON、JWT、Base64..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm md:text-base"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
              🔍
            </span>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="清除搜索"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 最近使用 */}
      {recentToolItems.length > 0 && !search && (
        <section className="py-6 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-sm font-medium text-gray-500 mb-3">最近使用</h2>
            <div className="flex flex-wrap gap-2">
              {recentToolItems.map(tool => (
                <Link
                  key={tool!.href}
                  href={tool!.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm hover:bg-primary-100 no-underline"
                >
                  <span>{tool!.icon}</span>
                  <span>{tool!.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 分类标签 + 工具网格 */}
      <section className="py-8 md:py-12">
        {/* 分类标签 */}
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{categoryIcons[cat]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 搜索/筛选结果统计 */}
        {(search || activeCategory !== '全部') && (
          <div className="max-w-6xl mx-auto px-4 mb-4 text-sm text-gray-500">
            找到 {filteredTools.length} 个工具
            {search && <span> · 关键词：<strong>{search}</strong></span>}
            {activeCategory !== '全部' && <span> · 分类：<strong>{activeCategory}</strong></span>}
          </div>
        )}

        {/* 工具网格 */}
        {filteredTools.length > 0 ? (
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="tool-card block bg-white rounded-xl p-5 border border-gray-200 hover:border-primary-300 hover:shadow-sm no-underline transition-all"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{tool.desc}</p>
                <span className="inline-block mt-2 text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {tool.category}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p>没有找到匹配的工具</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('全部') }}
              className="mt-3 text-primary-600 hover:text-primary-700 text-sm"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </section>

      {/* AdSense Banner */}
      <AdBanner dataAdFormat="horizontal" />
    </div>
  )
}
