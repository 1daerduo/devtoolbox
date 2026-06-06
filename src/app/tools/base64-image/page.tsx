import type { Metadata } from 'next'
import Base64ImageClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 图片互转 - 在线 Image Base64 编解码 - DevToolbox',
  description: '免费在线 Base64 与图片互转工具，支持图片转 Base64 编码、Base64 解码为图片，支持 PNG/JPG/WebP/SVG 等格式，无需上传服务器。',
  keywords: ['Base64图片', '图片转Base64', 'Base64转图片', 'image to base64', 'base64 to image', '图片编码', 'Data URL'],
  alternates: { canonical: 'https://moretoolbox.com/tools/base64-image' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Base64 图片互转", "item": "https://moretoolbox.com/tools/base64-image" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Base64 图片互转 - DevToolbox", "description": "图片与 Base64 编码互转", "url": "https://moretoolbox.com/tools/base64-image", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <Base64ImageClient />
      </>
    )
}
