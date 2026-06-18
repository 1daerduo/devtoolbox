import type { Metadata } from 'next'
import SchemaGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Schema Markup 生成器 - JSON-LD 结构化数据 - MoreToolbox',
  description: '在线 Schema Markup 生成器，可视化创建 JSON-LD 结构化数据（Article、Product、FAQ、Recipe、BreadcrumbList 等），支持 Google 富文本摘要验证，一键复制代码。 | Free online Schema Markup generator. Create JSON-LD structured data for Google rich snippets.',
  keywords: ['Schema生成器', 'JSON-LD', '结构化数据', 'Schema.org', '富文本摘要', 'Rich Snippets', 'SEO工具', 'Schema Markup Generator'],
  alternates: { canonical: 'https://moretoolbox.com/tools/schema-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Schema 生成器", "item": "https://moretoolbox.com/tools/schema-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Schema Markup 生成器 - MoreToolbox", "description": "JSON-LD 结构化数据生成 | Free online Schema markup generator", "url": "https://moretoolbox.com/tools/schema-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <SchemaGeneratorClient />
      </>
    )
}
