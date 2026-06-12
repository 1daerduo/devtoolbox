import type { Metadata } from 'next'
import FaviconEmojiClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Emoji Favicon 生成器 | 表情图标制作 - MoreToolbox',
  description: '免费在线 Emoji Favicon 图标生成器，选择任意 Emoji 表情，一键生成透明背景 Favicon，支持 16×16/32×32/48×48 多尺寸 PNG 打包下载。适用于网站图标、书签图标、PWA 应用图标制作，完全免费无需注册。 | Free online Emoji Favicon maker. Turn any emoji into a transparent Favicon icon. Multi-size PNG download: 16x16, 32x32, 48x48. Perfect for website icons & bookmarks.',
  keywords: ['emoji favicon', '表情图标', 'favicon emoji', 'emoji图标生成', 'emoji favicon maker'],
  alternates: { canonical: 'https://moretoolbox.com/tools/favicon-emoji' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Emoji Favicon 生成器", "item": "https://moretoolbox.com/tools/favicon-emoji" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Emoji Favicon 生成器", "url": "https://moretoolbox.com/tools/favicon-emoji", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }) }} />
      <FaviconEmojiClient />
    </>
  )
}
