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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON 和 CSV 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 是树状层级结构，支持嵌套对象和数组，适合 API 数据传输。CSV 是表格结构，每行一条记录，字段用逗号分隔，适合 Excel 和数据分析。JSON 更灵活但文件较大，CSV 更紧凑但只支持平面数据。" } }, { "@type": "Question", "name": "如何处理嵌套的 JSON 对象转 CSV？", "acceptedAnswer": { "@type": "Answer", "text": "嵌套 JSON 转 CSV 时需要展平（flatten），将嵌套字段用点号连接作为列名。例如 {\"user\":{\"name\":\"Tom\"}} 会展平为 user.name 列。数组字段通常用分号分隔多个值。本工具自动处理展平逻辑。" } }, { "@type": "Question", "name": "CSV 文件中的逗号和换行如何转义？", "acceptedAnswer": { "@type": "Answer", "text": "CSV 中包含逗号的字段需要用双引号包裹，如 \"hello, world\"。字段内包含双引号则用两个双引号转义。包含换行符的字段也需要引号包裹。本工具自动处理这些转义规则。" } }] }),
          }}
        />
        <JsonToCsvClient />
      </>
    )
}
