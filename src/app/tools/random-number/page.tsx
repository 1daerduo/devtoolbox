import type { Metadata } from 'next'
import RandomNumberClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线随机数生成器 | Random Number Generator - MoreToolbox',
  description: '在线生成指定范围内的随机整数或小数，支持排除特定数字、批量生成、不重复模式，可用于抽奖、测试数据、游戏等场景。 | Free online random number generator. Custom range, exclude numbers, batch mode, no-repeat. Lottery, testing data, gaming.',
  keywords: ['随机数生成', '随机数生成器', '随机整数', '随机小数', '抽奖', '随机选择', 'random number'],
  alternates: { canonical: 'https://moretoolbox.com/tools/random-number' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "随机数生成器", "item": "https://moretoolbox.com/tools/random-number" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "随机数生成器 - MoreToolbox", "description": "随机整数/小数批量生成 | Free online random number generator", "url": "https://moretoolbox.com/tools/random-number", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "在线随机数生成器的随机性够吗？是真随机吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具使用 JavaScript crypto.getRandomValues API 生成密码学安全的真随机数，而非伪随机数。适用于抽奖、密码学种子、游戏等需要高质量随机性的场景。但请注意，浏览器端随机数不适用于金融级别的加密密钥生成。" } }, { "@type": "Question", "name": "可以生成不重复的随机数吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。开启去重模式后，每次生成的随机数都不会与已生成的结果重复。适用于需要不重复抽奖号码、座位号分配等场景。支持批量生成多组不重复随机数。" } }, { "@type": "Question", "name": "随机数范围有限制吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持任意范围的整数和小数，可设置最小值、最大值和小数位数。整数模式下支持负数和极大范围（如 -999999 到 999999），小数模式可设置 0-10 位小数精度。" } }] }),
          }}
        />
        <RandomNumberClient />
      </>
    )
}
