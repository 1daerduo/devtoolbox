import type { Metadata } from 'next'
import NumberBaseClient from './ToolClient'

export const metadata: Metadata = {
  title: '进制转换器 - 二进制八进制十进制十六进制互转 - DevToolbox',
  description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制等多种进制互转，实时计算，开发者必备。',
  keywords: ['进制转换', '二进制转十进制', '十六进制转十进制', '八进制', 'number base converter', '进制计算器', 'bin dec hex oct'],
  alternates: { canonical: 'https://moretoolbox.com/tools/number-base' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "进制转换器", "item": "https://moretoolbox.com/tools/number-base" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "进制转换器 - DevToolbox", "description": "多进制互转", "url": "https://moretoolbox.com/tools/number-base", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <NumberBaseClient />
      </>
    )
}
