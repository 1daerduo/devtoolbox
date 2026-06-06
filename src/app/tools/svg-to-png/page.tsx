import type { Metadata } from 'next'
import SvgToPngClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SVG 转 PNG 在线转换器 | SVG to PNG Converter Online - MoreToolbox',
  description: '在线将 SVG 矢量图转换为 PNG 位图，支持自定义输出尺寸和背景色，纯浏览器端处理，无需上传文件，保护数据安全。 | Free online SVG to PNG converter. Custom output size & background color. Pure browser-side processing, no file upload, secure.',
  keywords: ['SVG转PNG', 'SVG转换', '矢量图转位图', 'SVG to PNG', 'SVG导出', '图片转换'],
  alternates: { canonical: '/tools/svg-to-png' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "SVG 转 PNG", "item": "https://moretoolbox.com/tools/svg-to-png" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SVG 转 PNG - MoreToolbox", "description": "SVG 矢量图转 PNG 位图 | Free online SVG to PNG converter", "url": "https://moretoolbox.com/tools/svg-to-png", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <SvgToPngClient />
      </>
    )
}
