import './globals.css'
import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import RecentToolsTracker from '@/components/RecentToolsTracker'
import { ThemeToggle } from '@/components/ThemeProvider'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://moretoolbox.com'),
  title: 'MoreToolbox - 免费在线开发者工具集合 | JSON格式化、正则测试、二维码生成、Base64编解码',
  description: 'MoreToolbox 提供80+款免费在线开发者工具：CIDR计算器、信用卡验证、密码短语生成、JSON对比、CSS圆角生成、Schema生成器、SERP预览、SEO检查器、百分比计算、JSON↔XML转换、JSON格式化/压缩、JSON转TypeScript、CSS/JS/HTML压缩、cURL转代码、API Key生成、Slug生成、Chmod计算器、正则测试器、CSS渐变生成、Box Shadow生成、颜色调色板、HTML Playground、HTML转Markdown、图片尺寸调整、CSV查看器、Emoji选择器、二维码扫描、ASCII艺术字、UUID解码器、JSON Schema验证、DNS查询、Meta标签生成、JWT解码、密码强度检查、HTTP状态码参考、URL解析、Cron表达式生成器、进制转换器、Bcrypt密码哈希、SQL格式化、时间戳转换、二维码生成、IP查询、Base64编解码、HTML/JS格式化等。全部在浏览器本地处理，数据安全，无需注册。 | 80+ free online developer tools: CIDR calculator, credit card validator, passphrase generator, JSON diff, border radius generator, JSON formatter, Schema generator, SERP simulator, SEO checker, percentage calculator, JSON to XML, JSON to TypeScript, CSS/JS/HTML minifier, cURL to code, API key generator, slug generator, chmod calculator, regex tester, CSS gradient, box shadow, color palette, HTML playground, HTML to Markdown, image resizer, CSV viewer, emoji picker, QR scanner, ASCII art, UUID decoder, JSON schema validator, DNS lookup, JWT decoder, QR code generator & more. All browser-side, secure, no registration.',
  keywords: ['在线工具', '开发者工具', '免费在线工具', 'CIDR计算器', '信用卡验证器', '密码短语生成器', 'JSON对比', 'CSS圆角生成器', 'Schema生成器', 'SERP预览', 'SEO检查器', '百分比计算器', 'JSON转XML', 'JSON格式化', 'JSON压缩', 'JSON转TypeScript', 'API Key生成器', 'Slug生成器', 'Chmod计算器', 'CSS压缩', 'JS压缩', 'HTML压缩', 'cURL转代码', '正则测试器', '正则表达式', 'JSON Schema验证', 'HTML转Markdown', '图片尺寸调整', 'UUID解码器', 'CSV查看器', 'Emoji选择器', '二维码扫描', 'ASCII艺术字', 'CSS渐变生成', 'Box Shadow生成', '颜色调色板', 'HTML Playground', '图片格式转换', 'DNS查询', 'Meta标签生成', '密码强度检查', 'HTTP状态码', 'URL解析', 'User Agent解析', 'SVG转PNG', 'JWT解码器', 'Cron表达式', '进制转换', 'Bcrypt', 'SQL格式化', '时间戳转换', '二维码生成', 'Base64编解码', 'IP地址查询', 'XML格式化', 'YAML格式化', 'HTML格式化', 'JS格式化', 'CSV转JSON', 'UUID生成器', '密码生成器', '文本对比', '邮箱验证', '在线前端工具'],
  openGraph: {
    title: 'MoreToolbox - 免费在线开发者工具集合 | JSON格式化、二维码、Base64',
    description: '80+款免费在线开发者工具，CIDR计算、信用卡验证、密码短语生成、JSON对比、CSS圆角、Schema生成、SERP预览、SEO检查、百分比计算、JSON↔XML转换、JSON转TypeScript、API Key生成、Slug生成、Chmod计算、HTML转Markdown、JSON/CSS/JS/HTML压缩、cURL转代码、正则测试、Box Shadow、颜色调色板、HTML Playground、图片调整、Emoji选择器、ASCII艺术字、UUID解码、JSON Schema验证等。 | 80+ free online dev tools. No registration.',
    url: 'https://moretoolbox.com',
    siteName: 'MoreToolbox',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoreToolbox - 在线开发者工具集合',
    description: '80+款免费在线开发者工具，CIDR计算、信用卡验证、密码短语生成、JSON对比、CSS圆角、Schema生成、SERP预览、SEO检查、百分比计算、JSON↔XML转换、JSON转TypeScript、API Key生成、Slug生成、Chmod计算、HTML转Markdown、JSON/CSS/JS/HTML压缩、cURL转代码、正则测试、Box Shadow、颜色调色板、HTML Playground、图片调整、Emoji选择器、ASCII艺术字、UUID解码、JSON Schema验证等。 | 80+ free online dev tools. No registration.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: apply theme before page render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <RecentToolsTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MoreToolbox',
              url: 'https://moretoolbox.com',
              description: '免费在线开发者工具集合，包含CIDR计算器、信用卡验证、密码短语生成、JSON对比、CSS圆角生成、Schema生成器、SERP预览、SEO检查器、百分比计算、JSON↔XML转换、JSON转TypeScript、API Key生成、Slug生成、Chmod计算、HTML转Markdown、CSS渐变生成、图片格式转换、DNS查询、Meta标签生成、JSON格式化、JWT解码、Cron表达式、进制转换、Bcrypt等80+款实用工具。',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'All',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
              inLanguage: 'zh-CN',
            }),
          }}
        />
        <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary-600 dark:text-primary-400 no-underline">
              MoreToolbox
            </Link>
            <div className="hidden md:flex gap-2 lg:gap-4 text-sm text-gray-600 dark:text-gray-300 flex-wrap items-center">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JSON</Link>
              <Link href="/tools/jwt-decoder" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JWT</Link>
              <Link href="/tools/sql-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">SQL</Link>
              <Link href="/tools/url-encode" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">URL</Link>
              <Link href="/tools/hash-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">哈希</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/my-ip" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">IP查询</Link>
              <Link href="/tools/password-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">密码</Link>
              <Link href="/tools/diff-checker" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">Diff</Link>
              <Link href="/tools/cron-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">Cron</Link>
              <Link href="/tools/number-base" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">进制</Link>
              <Link href="/tools/bcrypt-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">Bcrypt</Link>
              <Link href="/tools/html-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">HTML</Link>
              <Link href="/tools/js-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JS</Link>
              <Link href="/tools/dns-lookup" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">DNS</Link>
              <Link href="/tools/css-gradient" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">渐变</Link>
              <ThemeToggle />
            </div>
            {/* Mobile nav: horizontal scroll */}
            <div className="flex md:hidden gap-3 text-xs text-gray-600 dark:text-gray-300 overflow-x-auto items-center">
              <Link href="/tools/json-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JSON</Link>
              <Link href="/tools/jwt-decoder" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JWT</Link>
              <Link href="/tools/sql-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">SQL</Link>
              <Link href="/tools/url-encode" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">URL</Link>
              <Link href="/tools/hash-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">哈希</Link>
              <Link href="/tools/qrcode" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">二维码</Link>
              <Link href="/tools/timestamp" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">时间戳</Link>
              <Link href="/tools/my-ip" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline">IP</Link>
              <Link href="/tools/diff-checker" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline">Diff</Link>
              <Link href="/tools/cron-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">Cron</Link>
              <Link href="/tools/number-base" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">进制</Link>
              <Link href="/tools/bcrypt-generator" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">Bcrypt</Link>
              <Link href="/tools/html-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">HTML</Link>
              <Link href="/tools/js-formatter" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">JS</Link>
              <Link href="/tools/dns-lookup" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">DNS</Link>
              <Link href="/tools/css-gradient" className="hover:text-primary-600 dark:hover:text-primary-400 no-underline whitespace-nowrap">渐变</Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026 MoreToolbox. 免费在线开发者工具。{' '}
            <Link href="/advertise/" className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 no-underline">
              广告合作
            </Link>
          </div>
        </footer>

        {/* PWA Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />

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
