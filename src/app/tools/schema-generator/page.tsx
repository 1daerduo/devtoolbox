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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 Schema Markup？", "acceptedAnswer": { "@type": "Answer", "text": "Schema Markup（结构化数据标记）是一种标准化格式，用于向搜索引擎描述网页内容。通过在页面中添加 JSON-LD、Microdata 或 RDFa 格式的结构化数据，搜索引擎可以更好地理解页面内容，并在搜索结果中展示富文本摘要（Rich Snippets）。" } }, { "@type": "Question", "name": "JSON-LD 和 Microdata 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON-LD 是 Google 推荐的方式，以独立 script 标签嵌入 JSON 数据，不干扰 HTML 结构。Microdata 直接在 HTML 标签中添加 itemprop 等属性，与页面结构耦合。JSON-LD 更易维护、更清晰。" } }, { "@type": "Question", "name": "如何验证 Schema Markup 是否正确？", "acceptedAnswer": { "@type": "Answer", "text": "使用 Google Rich Results Test（搜索 Google Rich Results Test）输入 URL 或粘贴代码即可验证。该工具会检查结构化数据是否符合 Google 规范，并预览搜索结果中的富文本摘要效果。" } }] }),
          }}
        />
        <SchemaGeneratorClient />
      </>
    )
}
