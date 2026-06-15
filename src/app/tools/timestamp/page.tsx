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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 Unix 时间戳？", "acceptedAnswer": { "@type": "Answer", "text": "Unix 时间戳是从 1970 年 1 月 1 日 00:00:00 UTC 到指定时间的总秒数（也叫 Epoch 时间）。它是跨平台、跨语言通用的标准时间表示方式，广泛用于数据库、API、日志系统中。" } }, { "@type": "Question", "name": "秒级时间戳和毫秒级时间戳有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "秒级时间戳是 10 位数字（如 1700000000），毫秒级是 13 位（如 1700000000000）。JavaScript Date.getTime() 返回毫秒级，Unix date 命令默认返回秒级。使用时需注意区分，否则转换结果会差 1000 倍。" } }, { "@type": "Question", "name": "时间戳 2038 年问题是什么？", "acceptedAnswer": { "@type": "Answer", "text": "32 位有符号整数最大值为 2147483647，对应 UTC 时间 2038-01-19 03:14:07。超过此时间后 32 位系统的时间戳会溢出变为负数。64 位系统不受此影响，本工具使用 64 位处理，无 2038 限制。" } }] }),
          }}
        />
        <TimestampClient />
      </>
    )
}
