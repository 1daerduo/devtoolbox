import type { Metadata } from 'next'
import JsFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 格式化工具 - 在线 JS 美化压缩 - DevToolbox',
  description: '免费在线 JavaScript 格式化工具，支持 JS 代码美化与压缩，自定义缩进，一键复制。前端开发调试与代码优化必备。',
  keywords: ['JS格式化', 'JavaScript美化', 'JS压缩', 'JS minifier', 'JavaScript formatter', '代码美化', '在线JS工具'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/js-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "JS 格式化", "item": "https://devtoolbox-61u.pages.dev/tools/js-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JS 格式化 - DevToolbox", "description": "JavaScript 美化与压缩", "url": "https://devtoolbox-61u.pages.dev/tools/js-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsFormatterClient />
      </>
    )
}
