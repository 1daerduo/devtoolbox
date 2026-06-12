import type { Metadata } from 'next'
import MetaTagClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Meta 标签在线生成器 - SEO元标签/OG/Twitter Card - MoreToolbox',
  description: '在线生成 SEO Meta 标签、Open Graph 标签和 Twitter Card 标签，可视化预览社交媒体分享效果，一键复制 HTML 代码。 | Free online SEO meta tag generator. Generate meta, Open Graph, Twitter Card tags. Visual social preview. One-click HTML copy.',
  keywords: ['Meta标签生成', 'SEO元标签', 'Open Graph', 'OG标签', 'Twitter Card', '网页描述', '搜索引擎优化'],
  alternates: { canonical: 'https://moretoolbox.com/tools/meta-tag' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Meta 标签生成器", "item": "https://moretoolbox.com/tools/meta-tag" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Meta 标签生成器 - MoreToolbox", "description": "SEO/OG/Twitter 标签生成 | Free online SEO meta tag generator", "url": "https://moretoolbox.com/tools/meta-tag", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <MetaTagClient />
      </>
    )
}
