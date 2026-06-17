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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "UUID v4 和 UUID v7 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "UUID v4 基于随机数生成，不包含时间信息，分布均匀但无序。UUID v7 基于时间戳生成，前 48 位为毫秒级时间戳，天然有序，适合作为数据库主键，可提高索引性能和范围查询效率。" } }, { "@type": "Question", "name": "UUID 重复的概率有多大？", "acceptedAnswer": { "@type": "Answer", "text": "UUID v4 重复概率极低。128 位空间中随机取值，生成 10 亿个 UUID 后碰撞概率约 0.00000000006%。实际应用中可以认为 UUID 是全局唯一的，不需要中心化分配。" } }, { "@type": "Question", "name": "UUID 和 GUID 是一回事吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的。UUID（Universally Unique Identifier）是开放标准，GUID（Globally Unique Identifier）是微软对 UUID 的实现。两者格式相同，都是 128 位标识符，通常可以互换使用。" } }] }),
          }}
        />
        <UUIDGeneratorClient />
      </>
    )
}
