import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON Schema 验证器 - 在线 JSON 结构校验工具 | MoreToolbox',
  description: '免费在线 JSON Schema 验证工具，支持 Draft-07 标准规范，校验 JSON 数据结构是否符合 Schema 定义。支持 type/required/properties/items/pattern/enum 等关键字验证，精准定位错误字段并提供修复建议。适合 API 开发、数据校验、前后端联调场景。100% 浏览器本地处理，数据安全。 | Free online JSON Schema validator. Draft-07 compliant, validates JSON against schema with error pinpointing. API dev & data validation essential. 100% browser-side.',
  keywords: ['JSON Schema 验证器', 'JSON Schema validator', 'JSON 结构校验', 'JSON 验证', '在线 JSON Schema', 'Draft-07', 'JSON data validation', 'json schema online'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/json-schema-validator',
  },
}

export default function JsonSchemaValidatorPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON Schema 验证器", "item": "https://moretoolbox.com/tools/json-schema-validator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON Schema 验证器 - MoreToolbox", "description": "Draft-07 JSON Schema 在线校验，精准定位字段错误 | Free online JSON Schema validator", "url": "https://moretoolbox.com/tools/json-schema-validator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
