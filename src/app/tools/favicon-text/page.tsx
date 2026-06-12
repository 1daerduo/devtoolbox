import type { Metadata } from 'next'
import FaviconTextClient from './ToolClient'

export const metadata: Metadata = {
  title: '文字 Favicon 生成器 | 字母图标制作 - MoreToolbox',
  description: '免费在线文字 Favicon 图标生成器，输入文本或字母，自定义选择字体、文字颜色和背景颜色，一键生成字母 Favicon 图标并实时预览。支持下载 16×16/32×32/48×48 等多种尺寸 PNG 图标包，适用于品牌首字母 Logo、网站图标制作。 | Free text Favicon maker. Create letter-based Favicon icons with custom fonts, colors & backgrounds. Multi-size PNG download: 16x16, 32x32, 48x48. Perfect for brand initials & website icons.',
  keywords: ['文字favicon', '字母图标', 'favicon文字', '文本favicon', '文字图标生成器', 'text favicon maker'],
  alternates: { canonical: 'https://moretoolbox.com/tools/favicon-text' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "文字 Favicon 生成器", "item": "https://moretoolbox.com/tools/favicon-text" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "文字 Favicon 生成器", "url": "https://moretoolbox.com/tools/favicon-text", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }) }} />
      <FaviconTextClient />
    </>
  )
}
