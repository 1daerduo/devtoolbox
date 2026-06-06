import type { Metadata } from 'next'
import JsFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 格式化工具 - 在线 JS 美化压缩 - MoreToolbox',
  description: '免费在线 JavaScript 格式化工具，支持 JS 代码美化与压缩，自定义缩进，一键复制。前端开发调试与代码优化必备。 | Free online JavaScript formatter and minifier. Custom indentation, one-click copy. JS code debugging & optimization essential.',
  keywords: ['JS格式化', 'JavaScript美化', 'JS压缩', 'JS minifier', 'JavaScript formatter', '代码美化', '在线JS工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/js-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JS 格式化", "item": "https://moretoolbox.com/tools/js-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JS 格式化 - MoreToolbox", "description": "JavaScript 美化与压缩 | Free online JavaScript formatter and minifier", "url": "https://moretoolbox.com/tools/js-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsFormatterClient />
      </>
    )
}
