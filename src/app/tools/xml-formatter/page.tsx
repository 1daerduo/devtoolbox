import type { Metadata } from 'next'
import XmlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'XML 在线格式化工具 | XML Formatter & Validator - MoreToolbox',
  description: '免费在线 XML 格式化、压缩、验证工具，支持语法高亮和缩进自定义。开发者必备的 XML 美化工具。 | Free online XML formatter, minifier & validator. Syntax highlighting, custom indentation. Developer essential.',
  keywords: ['XML格式化', 'XML formatter', 'XML压缩', 'XML验证', '在线XML工具', 'XML beautifier'],
  alternates: { canonical: 'https://moretoolbox.com/tools/xml-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "XML 格式化", "item": "https://moretoolbox.com/tools/xml-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "XML 格式化 - MoreToolbox", "description": "XML 格式化与压缩 | Free online XML formatter, minifier & validator", "url": "https://moretoolbox.com/tools/xml-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <XmlFormatterClient />
      </>
    )
}
