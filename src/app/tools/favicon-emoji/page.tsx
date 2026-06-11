import type { Metadata } from 'next'
import FaviconEmojiClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Emoji Favicon 生成器 | 表情图标制作 - MoreToolbox',
  description: '选择 Emoji，生成透明背景 Favicon，支持多种尺寸一键打包下载。',
  keywords: ['emoji favicon', '表情图标', 'favicon emoji'],
  alternates: { canonical: '/tools/favicon-emoji' },
}
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Emoji Favicon 生成器", "url": "https://moretoolbox.com/tools/favicon-emoji", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" } }) }} /><FaviconEmojiClient /></> }
