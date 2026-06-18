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
        <SerpSimulatorClient />
      </>
    )
}
