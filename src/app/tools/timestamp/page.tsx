import type { Metadata } from 'next'
import TimestampClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Unix 时间戳在线转换工具 - DevToolbox',
  description: 'Unix 时间戳与日期时间互相转换，支持秒/毫秒，实时显示当前时间。免费在线工具，无需注册。',
  keywords: ['时间戳转换', 'Unix时间戳', '时间戳转日期', '日期转时间戳', 'timestamp converter'],
  alternates: { canonical: '/tools/timestamp' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "时间戳转换", "item": "https://moretoolbox.com/tools/timestamp" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "时间戳转换 - DevToolbox", "description": "Unix 时间戳与日期互转", "url": "https://moretoolbox.com/tools/timestamp", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <TimestampClient />
      </>
    )
}
