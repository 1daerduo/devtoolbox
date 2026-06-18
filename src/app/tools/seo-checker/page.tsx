import type { Metadata } from 'next'
import SeoCheckerClient from './ToolClient'

export const metadata: Metadata = {
  title: 'On-Page SEO 检查器 - 网页SEO分析 - MoreToolbox',
  description: '在线 On-Page SEO 检查器，输入 URL 抓取并分析页面的 SEO 关键指标：标题、描述、关键词、H1、图片 Alt、内链外链、Open Graph、Twitter Card 等。 | Free online on-page SEO checker. Analyze page SEO factors.',
  keywords: ['SEO检查器', 'On-Page SEO', '页面SEO分析', 'SEO Checker', '网页SEO', 'SEO分析', '关键词密度', 'SEO审计'],
  alternates: { canonical: 'https://moretoolbox.com/tools/seo-checker' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "SEO 检查器", "item": "https://moretoolbox.com/tools/seo-checker" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SEO 检查器 - MoreToolbox", "description": "On-Page SEO 页面分析 | Free online on-page SEO checker", "url": "https://moretoolbox.com/tools/seo-checker", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <SeoCheckerClient />
      </>
    )
}
