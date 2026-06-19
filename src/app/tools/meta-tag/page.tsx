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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 Meta 标签？", "acceptedAnswer": { "@type": "Answer", "text": "Meta 标签是 HTML head 中的元数据标签，向搜索引擎和浏览器描述页面信息。常见的包括 description（页面描述）、keywords（关键词）、viewport（移动适配）、charset（编码）等。Meta description 对 SEO 点击率有重要影响。" } }, { "@type": "Question", "name": "Open Graph 标签有什么作用？", "acceptedAnswer": { "@type": "Answer", "text": "Open Graph（OG）标签控制网页在社交媒体（微信、Facebook、Twitter 等）分享时显示的标题、描述和图片。关键标签包括 og:title、og:description、og:image、og:url。本工具支持一键生成所有 OG 标签。" } }, { "@type": "Question", "name": "Twitter Card 标签怎么设置？", "acceptedAnswer": { "@type": "Answer", "text": "Twitter Card 标签控制网页在 Twitter 分享时的卡片样式。常用类型有 summary_large_image（大图卡片）和 summary（摘要卡片）。关键标签包括 twitter:card、twitter:title、twitter:description、twitter:image。本工具自动生成对应标签。" } }] }),
          }}
        />
        <MetaTagClient />
      </>
    )
}
