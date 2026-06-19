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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "百分比怎么计算？", "acceptedAnswer": { "@type": "Answer", "text": "百分比计算公式：部分 ÷ 总数 × 100% = 百分比。例如 25 占 200 的百分比是 25 ÷ 200 × 100% = 12.5%。本工具支持多种百分比计算模式，输入数值即可自动计算。" } }, { "@type": "Question", "name": "如何计算增长百分比？", "acceptedAnswer": { "@type": "Answer", "text": "增长百分比公式：(新值 - 原值) ÷ 原值 × 100%。例如从 100 增长到 150，增长百分比 = (150-100) ÷ 100 × 100% = 50%。如果结果为负数，则表示下降。" } }, { "@type": "Question", "name": "利润率怎么算？", "acceptedAnswer": { "@type": "Answer", "text": "利润率公式：(售价 - 成本) ÷ 售价 × 100%。例如成本 80 元售价 100 元，利润率 = (100-80) ÷ 100 × 100% = 20%。注意利润率与利润率（基于成本）不同，后者公式为 (售价-成本) ÷ 成本 × 100%。" } }] }),
          }}
        />
        <PercentageCalculatorClient />
      </>
    )
}
