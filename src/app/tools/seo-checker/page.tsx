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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 On-Page SEO？", "acceptedAnswer": { "@type": "Answer", "text": "On-Page SEO 是指在网页本身进行的搜索引擎优化，包括标题标签、Meta 描述、H1-H6 标签、图片 Alt 属性、内链结构、页面速度、移动适配等。与 Off-Page SEO（外链建设）相对。" } }, { "@type": "Question", "name": "SEO 检查器检查哪些项目？", "acceptedAnswer": { "@type": "Answer", "text": "本工具检查页面标题、Meta 描述、关键词、H1 标签、图片 Alt 属性、内链外链数量、Open Graph 标签、Twitter Card 标签、canonical URL、robots 标签、页面大小等关键 SEO 指标。" } }, { "@type": "Question", "name": "如何提高页面 SEO 分数？", "acceptedAnswer": { "@type": "Answer", "text": "提高 SEO 分数的方法：1) 确保每个页面有唯一的 title 和 description；2) 使用语义化 HTML 标签（H1-H6）；3) 为所有图片添加 Alt 属性；4) 优化页面加载速度；5) 建立合理的内链结构；6) 添加结构化数据（JSON-LD）。" } }] }),
          }}
        />
        <SeoCheckerClient />
      </>
    )
}
