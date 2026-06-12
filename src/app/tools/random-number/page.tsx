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
        <RandomNumberClient />
      </>
    )
}
