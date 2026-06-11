import type { Metadata } from 'next'
import JsMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 在线压缩工具 | JS Minifier - MoreToolbox',
  description: '在线 JavaScript 压缩/Minify 工具，一键去除注释和空白符，压缩 JS 代码体积。显示压缩率和节省字节数。免费、无需注册。 | Free online JavaScript minifier. Remove comments & whitespace, compress JS instantly.',
  keywords: ['JS压缩', 'JavaScript压缩', 'JS Minify', '在线JS压缩', 'JavaScript minifier'],
  alternates: { canonical: '/tools/js-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JS 压缩", "item": "https://moretoolbox.com/tools/js-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JavaScript 在线压缩工具 - MoreToolbox", "description": "在线压缩 JavaScript 代码，去除注释和空白符 | Free online JS minifier", "url": "https://moretoolbox.com/tools/js-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsMinifierClient />
      </>
    )
}
