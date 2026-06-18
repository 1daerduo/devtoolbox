import type { Metadata } from 'next'
import JsonXmlConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON ↔ XML 在线转换器 - 数据格式互转 - MoreToolbox',
  description: '免费在线 JSON 和 XML 互相转换工具，支持嵌套对象、数组、属性配置、自动格式化，一键复制。 | Free online JSON to XML and XML to JSON converter.',
  keywords: ['JSON转XML', 'XML转JSON', 'JSON XML互转', '数据格式转换', 'JsonToXml', 'XmlToJson', '在线转换'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-xml-converter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON ↔ XML 转换器", "item": "https://moretoolbox.com/tools/json-xml-converter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON ↔ XML 转换器 - MoreToolbox", "description": "JSON 和 XML 数据格式互转 | Free online JSON XML converter", "url": "https://moretoolbox.com/tools/json-xml-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonXmlConverterClient />
      </>
    )
}
