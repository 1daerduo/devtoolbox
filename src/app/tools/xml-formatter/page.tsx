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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "XML 格式化会验证 XML 语法吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的。格式化过程中会检查 XML 语法，包括标签是否正确闭合、属性是否合法、是否只有一个根元素等。如果发现语法错误，会提示错误位置和原因，方便快速修复。" } }, { "@type": "Question", "name": "XML 和 HTML 格式化有什么不同？", "acceptedAnswer": { "@type": "Answer", "text": "XML 要求严格的闭合标签和嵌套规则，而 HTML 相对宽松（如 <br> 可不闭合）。XML 格式化会严格检查语法正确性，HTML 格式化则更关注缩进层级。两者都支持压缩以减小文件体积。" } }, { "@type": "Question", "name": "支持 SVG 和 XSLT 吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。SVG 是基于 XML 的矢量图形格式，XSLT 是 XML 转换语言，本工具可以格式化和压缩这些 XML 衍生格式。对于大型 SVG 文件，压缩可以显著减小文件体积。" } }] }),
          }}
        />
        <XmlFormatterClient />
      </>
    )
}
