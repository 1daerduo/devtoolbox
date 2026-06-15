import type { Metadata } from 'next'
import JsonToTypescriptClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 转 TypeScript 类型生成器 | JSON to TypeScript Interface Generator - MoreToolbox',
  description: '免费在线 JSON 转 TypeScript 工具，一键将 JSON 数据转换为 TypeScript 接口（interface）和类型定义。支持嵌套对象、数组、可选属性、联合类型，自动推断类型名称。前端开发接口对接必备工具。 | Free online JSON to TypeScript converter. Generate TypeScript interfaces from JSON data instantly. Supports nested objects, arrays, optional properties, and union types.',
  keywords: ['JSON转TypeScript', 'JSON to TypeScript', 'JSON to interface', 'TypeScript类型生成', 'TypeScript interface generator', 'JSON转类型', 'TypeScript类型推断'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-to-typescript' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON 转 TypeScript", "item": "https://moretoolbox.com/tools/json-to-typescript" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON 转 TypeScript 类型生成器 - MoreToolbox", "description": "将 JSON 数据转换为 TypeScript 接口和类型定义 | Convert JSON to TypeScript interfaces", "url": "https://moretoolbox.com/tools/json-to-typescript", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonToTypescriptClient />
      </>
    )
}
