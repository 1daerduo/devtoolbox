import type { Metadata } from 'next'
import UUIDGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 UUID 生成器 - UUID v4 v7 批量生成 - MoreToolbox',
  description: '在线 UUID 生成器，支持 UUID v4（随机）和 UUID v7（时间排序）版本，可批量生成多达 50 个，一键复制，开发必备工具。 | Free online UUID generator. UUID v4 (random) and v7 (time-sorted). Batch generate up to 50, one-click copy. Dev essential.',
  keywords: ['UUID生成', 'UUID生成器', 'GUID生成', 'UUID v4', 'UUID v7', '在线UUID', '批量UUID', '唯一标识', '开发工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/uuid-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "UUID 生成器", "item": "https://moretoolbox.com/tools/uuid-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "UUID 生成器 - MoreToolbox", "description": "UUID v4/v7 批量生成 | Free online UUID generator", "url": "https://moretoolbox.com/tools/uuid-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <UUIDGeneratorClient />
      </>
    )
}
