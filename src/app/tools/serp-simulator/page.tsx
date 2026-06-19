import type { Metadata } from 'next'
import SerpSimulatorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Google SERP 预览器 - 搜索结果模拟 - MoreToolbox',
  description: '在线预览网页在 Google 搜索结果中的显示效果，支持桌面和移动端，查看标题、URL、描述、富文本摘要（星级、FAQ、价格）实时模拟。 | Free online Google SERP preview simulator. Preview your page in Google search results.',
  keywords: ['SERP预览', 'Google搜索预览', '搜索结果模拟', 'SERP Simulator', 'SEO工具', '标题预览', '元描述预览', '富文本摘要预览'],
  alternates: { canonical: 'https://moretoolbox.com/tools/serp-simulator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "SERP 预览器", "item": "https://moretoolbox.com/tools/serp-simulator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SERP 预览器 - MoreToolbox", "description": "Google 搜索结果预览 | Free online Google SERP preview", "url": "https://moretoolbox.com/tools/serp-simulator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 SERP 预览器？", "acceptedAnswer": { "@type": "Answer", "text": "SERP（Search Engine Results Page）预览器是一种 SEO 工具，用于模拟网页在 Google 搜索结果中的显示效果，包括标题、URL、描述、富文本摘要等。通过预览可以优化标题和描述以提高点击率。" } }, { "@type": "Question", "name": "Google 搜索结果显示多少字符的标题和描述？", "acceptedAnswer": { "@type": "Answer", "text": "Google 搜索结果标题通常显示 50-60 个字符，描述显示 150-160 个字符。超出部分会被截断显示为省略号。移动端显示空间更少，建议标题控制在 55 字符以内。" } }, { "@type": "Question", "name": "如何优化搜索结果的点击率（CTR）？", "acceptedAnswer": { "@type": "Answer", "text": "优化 CTR 的方法包括：1) 撰写吸引人的标题含核心关键词；2) 描述中加入 CTA 行动号召；3) 使用结构化数据获得富文本摘要；4) 确保 URL 简洁有意义；5) 使用数字和特殊符号吸引注意。" } }] }),
          }}
        />
        <SerpSimulatorClient />
      </>
    )
}
