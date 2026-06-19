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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "常见的进制有哪些？", "acceptedAnswer": { "@type": "Answer", "text": "常见进制包括：二进制（Bin，基 2，0-1）、八进制（Oct，基 8，0-7）、十进制（Dec，基 10，0-9）、十六进制（Hex，基 16，0-9A-F）。编程中还可能用到三进制、Base36、Base64 等。本工具支持 2-36 进制互转。" } }, { "@type": "Question", "name": "二进制如何转十进制？", "acceptedAnswer": { "@type": "Answer", "text": "二进制转十进制的方法是将每一位的值乘以 2 的对应次方然后求和。例如 1010 = 1×2³+0×2²+1×2¹+0×2⁰ = 8+0+2+0 = 10。本工具支持实时自动转换，无需手动计算。" } }, { "@type": "Question", "name": "十六进制在编程中有什么用途？", "acceptedAnswer": { "@type": "Answer", "text": "十六进制广泛用于表示内存地址、颜色值（如 #FF5733）、MAC 地址、字节数据等。每两位十六进制对应一个字节（0-255），比二进制更简洁。在 C/Java/Python 中用 0x 前缀表示十六进制字面量。" } }] }),
          }}
        />
        <NumberBaseClient />
      </>
    )
}
