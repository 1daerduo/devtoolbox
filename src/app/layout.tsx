import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import RecentToolsTracker from '@/components/RecentToolsTracker'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://moretoolbox.com'),
  title: 'MoreToolbox - 免费在线开发者工具集合 | JSON格式化、二维码生成、Base64编解码',
  description: 'MoreToolbox 提供40+款免费在线开发者工具：JSON格式化、CSS渐变生成、图片格式转换、DNS查询、Meta标签生成、JWT解码、Cron表达式生成器、进制转换器、Bcrypt密码哈希、SQL格式化、时间戳转换、二维码生成、IP查询、Base64编解码、HTML/JS格式化等。全部在浏览器本地处理，数据安全，无需注册。 | 40+ free online developer tools: JSON formatter, CSS gradient generator, image converter, DNS lookup, JWT decoder, QR code generator, Base64 encoder & more. All browser-side, secure, no registration.',
  keywords: ['在线工具', '开发者工具', '免费在线工具', 'JSON格式化', 'CSS渐变生成', '图片格式转换', 'DNS查询', 'Meta标签生成', 'User Agent解析', 'SVG转PNG', 'JWT解码器', 'Cron表达式', '进制转换', 'Bcrypt', 'SQL格式化', '时间戳转换', '二维码生成', '正则表达式', 'Base64编解码', 'IP地址查询', 'XML格式化', 'YAML格式化', 'HTML格式化', 'JS格式化', 'CSV转JSON', 'UUID生成器', '密码生成器', '文本对比', '邮箱验证', '在线前端工具'],
  openGraph: {
    title: 'MoreToolbox - 免费在线开发者工具集合 | JSON格式化、二维码、Base64',
    description: '40+款免费在线开发者工具，CSS渐变生成器、图片格式转换、DNS查询、Meta标签生成、JSON格式化、Cron表达式、进制转换、Bcrypt、JWT解码等，无需注册，数据本地处理。 | 40+ free online developer tools: formatter, generator, converter, encoder, and more. No registration required.',
    url: 'https://moretoolbox.com',
    siteName: 'MoreToolbox',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoreToolbox - 在线开发者工具集合',
    description: '40+款免费在线开发者工具，CSS渐变、图片格式转换、DNS查询、Meta标签、JSON、Cron等。 | 40+ free online dev tools. No registration.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <RecentToolsTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MoreToolbox',
              url: 'https://moretoolbox.com',
              description: '免费在线开发者工具集合，包含CSS渐变生成、图片格式转换、DNS查询、Meta标签生成、JSON格式化、JWT解码、Cron表达式、进制转换、Bcrypt等40+款实用工具。',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'All',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              inLanguage: 'zh-CN',
            }),
          }}
        />
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-600 no-underline">
              MoreToolbox
            </Link>
            <div className="hidden md:flex gap-2 lg:gap-4 text-sm text-gray-600 flex-wrap">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JSON</Link>
              <Link href="/tools/jwt-decoder" className="hover:text-primary-600 no-underline whitespace-nowrap">JWT</Link>
              <Link href="/tools/sql-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">SQL</Link>
              <Link href="/tools/url-encode" className="hover:text-primary-600 no-underline whitespace-nowrap">URL</Link>
              <Link href="/tools/hash-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">哈希</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/my-ip" className="hover:text-primary-600 no-underline whitespace-nowrap">IP查询</Link>
              <Link href="/tools/password-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">密码</Link>
              <Link href="/tools/diff-checker" className="hover:text-primary-600 no-underline whitespace-nowrap">Diff</Link>
              <Link href="/tools/cron-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">Cron</Link>
              <Link href="/tools/number-base" className="hover:text-primary-600 no-underline whitespace-nowrap">进制</Link>
              <Link href="/tools/bcrypt-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">Bcrypt</Link>
              <Link href="/tools/html-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">HTML</Link>
              <Link href="/tools/js-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JS</Link>
              <Link href="/tools/dns-lookup" className="hover:text-primary-600 no-underline whitespace-nowrap">DNS</Link>
              <Link href="/tools/css-gradient" className="hover:text-primary-600 no-underline whitespace-nowrap">渐变</Link>
            </div>
            {/* Mobile nav: horizontal scroll */}
            <div className="flex md:hidden gap-3 text-xs text-gray-600 overflow-x-auto">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JSON</Link>
              <Link href="/tools/jwt-decoder" className="hover:text-primary-600 no-underline whitespace-nowrap">JWT</Link>
              <Link href="/tools/sql-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">SQL</Link>
              <Link href="/tools/url-encode" className="hover:text-primary-600 no-underline whitespace-nowrap">URL</Link>
              <Link href="/tools/hash-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">哈希</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/my-ip" className="hover:text-primary-600 no-underline whitespace-nowrap">IP</Link>
              <Link href="/tools/diff-checker" className="hover:text-primary-600 no-underline">Diff</Link>
              <Link href="/tools/cron-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">Cron</Link>
              <Link href="/tools/number-base" className="hover:text-primary-600 no-underline whitespace-nowrap">进制</Link>
              <Link href="/tools/bcrypt-generator" className="hover:text-primary-600 no-underline whitespace-nowrap">Bcrypt</Link>
              <Link href="/tools/html-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">HTML</Link>
              <Link href="/tools/js-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JS</Link>
              <Link href="/tools/dns-lookup" className="hover:text-primary-600 no-underline whitespace-nowrap">DNS</Link>
              <Link href="/tools/css-gradient" className="hover:text-primary-600 no-underline whitespace-nowrap">渐变</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © 2026 MoreToolbox. 免费在线开发者工具。{' '}
            <Link href="/advertise/" className="text-gray-400 hover:text-primary-600 no-underline">
              广告合作
            </Link>
          </div>
        </footer>

        {/* Google Analytics 4 — 测量 ID: G-HYD79KJF3L */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HYD79KJF3L"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HYD79KJF3L', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google AdSense — 发布商 ID: ca-pub-2041541281963495 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2041541281963495" crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}
