import type { Metadata } from 'next'
import NumberBaseClient from './ToolClient'

export const metadata: Metadata = {
  title: '进制转换器 - 二进制八进制十进制十六进制互转 - MoreToolbox',
  description: '免费在线进制转换计算器，支持二进制(Bin)、八进制(Oct)、十进制(Dec)、十六进制(Hex)等多种进制之间互转。实时同步计算，输入任意进制数值自动转换，支持自定义进制(2-36)，附带进制对照速查表。程序员开发调试、计算机基础学习必备工具。 | Free online number base converter. Binary, octal, decimal, hexadecimal & custom bases (2-36). Real-time synchronous conversion. Essential for programmers & CS students.',
  keywords: ['进制转换', '二进制转十进制', '十六进制转十进制', '八进制', 'number base converter', '进制计算器', 'bin dec hex oct', '进制互转'],
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "进制转换器 - MoreToolbox", "description": "多进制互转 | Free online number base converter", "url": "https://moretoolbox.com/tools/number-base", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <NumberBaseClient />
      </>
    )
}
