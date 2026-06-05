import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'DevToolbox - 在线开发者工具集合',
  description: '免费在线开发者工具集合，包含JSON格式化、时间戳转换、二维码生成、正则表达式测试、Base64编解码等实用工具。',
  keywords: ['开发者工具', 'JSON格式化', '时间戳转换', '二维码生成', '正则表达式', 'Base64'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-600 no-underline">
              DevToolbox
            </Link>
            <div className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JSON格式化</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/regex" className="hover:text-primary-600 no-underline whitespace-nowrap">正则测试</Link>
              <Link href="/tools/base64" className="hover:text-primary-600 no-underline whitespace-nowrap">Base64</Link>
            </div>
            {/* Mobile nav: horizontal scroll */}
            <div className="flex md:hidden gap-4 text-xs text-gray-600 overflow-x-auto">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 no-underline whitespace-nowrap">JSON</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/regex" className="hover:text-primary-600 no-underline whitespace-nowrap">正则</Link>
              <Link href="/tools/base64" className="hover:text-primary-600 no-underline whitespace-nowrap">Base64</Link>
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
