import type { Metadata } from 'next'
import JsonToCsvClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 转 CSV 在线转换工具 | JSON to CSV Converter - MoreToolbox',
  description: '免费在线 JSON 与 CSV 互相转换工具，支持嵌套 JSON 展开、自定义分隔符。开发者数据处理必备。 | Free online JSON ↔ CSV converter. Flatten nested JSON, custom delimiter support. Developer data processing essential.',
  keywords: ['JSON转CSV', 'CSV转JSON', 'JSON to CSV', 'CSV to JSON', '数据格式转换', '在线转换工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-to-csv' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON ↔ CSV", "item": "https://moretoolbox.com/tools/json-to-csv" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON ↔ CSV - MoreToolbox", "description": "JSON 与 CSV 互转 | Free online JSON ↔ CSV converter", "url": "https://moretoolbox.com/tools/json-to-csv", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonToCsvClient />
      </>
    )
}
