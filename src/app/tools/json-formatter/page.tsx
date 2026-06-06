import type { Metadata } from 'next'
import JsonFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 在线格式化工具 - DevToolbox',
  description: '在线 JSON 数据格式化、压缩、验证工具，支持语法高亮显示和多种缩进模式。免费、无需注册，开发者必备。',
  keywords: ['JSON格式化', 'JSON压缩', 'JSON验证', '在线JSON工具', 'JSON formatter'],
  alternates: { canonical: '/tools/json-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON 格式化", "item": "https://moretoolbox.com/tools/json-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON 格式化 - DevToolbox", "description": "格式化、压缩、验证 JSON 数据", "url": "https://moretoolbox.com/tools/json-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonFormatterClient />
      </>
    )
}
