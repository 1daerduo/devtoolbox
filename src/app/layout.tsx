import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://devtoolbox-61u.pages.dev'),
  title: 'DevToolbox - 在线开发者工具集合',
  description: '免费在线开发者工具集合，包含JSON格式化、JWT解码、Cron表达式、进制转换、Bcrypt、SQL格式化、时间戳转换、二维码生成、IP查询、Base64、HTML/JS格式化等32款实用开发工具。全部在浏览器本地处理，数据安全。',
  keywords: ['开发者工具', 'JSON格式化', 'JWT解码', 'Cron表达式', '进制转换', 'Bcrypt', 'SQL格式化', '时间戳转换', '二维码生成', '正则表达式', 'Base64', 'IP查询', 'XML格式化', 'YAML格式化', 'HTML格式化', 'JS格式化', 'CSV转换', 'UUID生成', '密码生成', '文本对比'],
  openGraph: {
    title: 'DevToolbox - 免费在线开发者工具集合',
    description: '32款免费在线开发者工具，JSON格式化、Cron表达式、进制转换、Bcrypt、JWT解码、HTML/JS格式化等，无需注册，数据本地处理。',
    url: 'https://devtoolbox-61u.pages.dev',
    siteName: 'DevToolbox',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolbox - 在线开发者工具集合',
    description: '32款免费在线开发者工具，JSON、Cron、进制转换、Bcrypt、JWT、HTML/JS格式化等。',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'DevToolbox',
              url: 'https://devtoolbox-61u.pages.dev',
              description: '免费在线开发者工具集合，包含JSON格式化、JWT解码、Cron表达式、进制转换、Bcrypt等32款实用工具。',
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
              DevToolbox
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
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            © 2026 DevToolbox. 免费在线开发者工具。
          </div>
        </footer>
      </body>
    </html>
  )
}
