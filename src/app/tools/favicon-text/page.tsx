import type { Metadata } from 'next'
import FaviconTextClient from './ToolClient'

export const metadata: Metadata = {
  title: '文字 Favicon 生成器 | 字母图标制作 - MoreToolbox',
  description: '输入文字，选择字体/颜色/背景，生成字母 Favicon，实时预览并下载全尺寸 PNG 图标。',
  keywords: ['文字favicon', '字母图标', 'favicon文字', '文本favicon'],
  alternates: { canonical: '/tools/favicon-text' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "文字 Favicon 生成器", "url": "https://moretoolbox.com/tools/favicon-text", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" } }) }} />
      <FaviconTextClient />
    </>
  )
}
