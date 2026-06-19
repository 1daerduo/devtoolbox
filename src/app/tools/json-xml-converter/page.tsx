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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON 和 XML 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 更轻量、可读性好、解析速度快，广泛用于 API 数据传输。XML 支持属性和命名空间，适合复杂的文档结构（如 SVG、配置文件）。JSON 不支持注释，XML 支持。JSON 数据体积通常比 XML 小 30%-50%。" } }, { "@type": "Question", "name": "如何将 JSON 转换为 XML？", "acceptedAnswer": { "@type": "Answer", "text": "将 JSON 对象的每个键转换为 XML 元素，值作为元素内容。数组转换为多个同名元素。本工具自动处理嵌套对象、数组和属性，支持自定义根节点名称，一键生成格式化的 XML。" } }, { "@type": "Question", "name": "JSON 数组在 XML 中如何表示？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 数组在 XML 中通常转换为多个同名子元素。例如 [1,2,3] 会转换为 <item>1</item><item>2</item><item>3</item>。本工具支持自定义数组元素名称。" } }] }),
          }}
        />
        <JsonXmlConverterClient />
      </>
    )
}
