import type { Metadata } from 'next'
import PercentageCalculatorClient from './ToolClient'

export const metadata: Metadata = {
  title: '百分比计算器 - 在线百分比计算 - MoreToolbox',
  description: '免费在线百分比计算器，支持 6 种计算：X 占 Y 的百分比、X 是 Y 的百分之几、增减百分比、增加/减少百分比、折扣计算、利润率计算。 | Free online percentage calculator with 6 calculation modes.',
  keywords: ['百分比计算器', '百分比计算', '折扣计算', '增长率', '利润率', 'Percentage Calculator', '在线计算器', '数学工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/percentage-calculator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "百分比计算器", "item": "https://moretoolbox.com/tools/percentage-calculator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "百分比计算器 - MoreToolbox", "description": "在线百分比计算工具 | Free online percentage calculator", "url": "https://moretoolbox.com/tools/percentage-calculator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <PercentageCalculatorClient />
      </>
    )
}
