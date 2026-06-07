import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'UUID 解码器 - 在线解析 UUID 版本/时间戳/节点信息 | MoreToolbox',
  description: '免费在线 UUID 解码工具，支持 UUID v1-v7 全部版本，解析 UUID 结构：版本号、变体、时间戳、时钟序列、节点 ID 等。100% 浏览器本地处理。',
  keywords: ['UUID 解码器', 'UUID decoder', 'UUID 解析', 'UUID 版本', 'UUID 时间戳', 'UUID v1 v4 v7', '在线 UUID 工具', 'uuid parse online'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/uuid-decoder',
  },
}

export default function UuidDecoderPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "UUID 解码器", "item": "https://moretoolbox.com/tools/uuid-decoder" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "UUID 解码器 - MoreToolbox", "description": "解析 UUID v1-v7 版本时间戳节点信息 | Free online UUID decoder and analyzer", "url": "https://moretoolbox.com/tools/uuid-decoder", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
