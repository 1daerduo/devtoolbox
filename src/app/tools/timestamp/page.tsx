import type { Metadata } from 'next'
import TimestampClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Unix 时间戳在线转换工具 | Unix Timestamp Converter - MoreToolbox',
  description: '免费在线 Unix 时间戳转换工具，支持秒级和毫秒级时间戳与日期时间互相转换。实时显示当前 Unix 时间戳和 UTC/本地时间，支持批量时间戳转换、时区自动识别、历史时间戳查询。程序员开发调试、日志分析、API 对接必备。 | Free online Unix timestamp converter. Seconds & milliseconds support. Real-time current timestamp display. Batch conversion, timezone-aware. Essential for debugging & API development.',
  keywords: ['时间戳转换', 'Unix时间戳', '时间戳转日期', '日期转时间戳', 'timestamp converter', '毫秒时间戳', '在线时间戳'],
  alternates: { canonical: 'https://moretoolbox.com/tools/timestamp' },
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "时间戳转换 - MoreToolbox", "description": "Unix 时间戳与日期互转 | Free Unix timestamp converter", "url": "https://moretoolbox.com/tools/timestamp", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <TimestampClient />
      </>
    )
}
