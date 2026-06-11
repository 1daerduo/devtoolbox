import type { Metadata } from 'next'
import JsonMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 在线压缩工具 | JSON Minifier - MoreToolbox',
  description: '在线 JSON 压缩/Minify 工具，一键去除空白符和换行，压缩 JSON 数据体积。支持验证、统计压缩率。免费、无需注册，开发者必备。 | Free online JSON minifier. Remove whitespace, compress JSON instantly. No upload, no registration.',
  keywords: ['JSON压缩', 'JSON Minify', 'JSON压缩工具', '在线JSON压缩', 'JSON minifier'],
  alternates: { canonical: '/tools/json-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON 压缩", "item": "https://moretoolbox.com/tools/json-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON 在线压缩工具 - MoreToolbox", "description": "在线压缩 JSON 数据，去除空白符和换行 | Free online JSON minifier", "url": "https://moretoolbox.com/tools/json-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonMinifierClient />
      </>
    )
}
