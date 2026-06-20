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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON Schema 验证器和普通 JSON 验证有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "普通 JSON 验证只检查语法是否正确（如括号是否匹配、逗号是否正确），JSON Schema 验证则进一步检查数据结构是否符合预定义的规则。例如可以验证字段类型（name 必须是 string）、必填字段是否缺失、数值范围、正则匹配等。适合 API 开发和数据校验场景。" } }, { "@type": "Question", "name": "支持哪些 JSON Schema 版本？", "acceptedAnswer": { "@type": "Answer", "text": "本工具基于 Draft-07 标准（最广泛使用的版本），支持所有核心关键字：type、required、properties、items、enum、pattern、minimum、maximum、minLength、additionalProperties 等。验证结果会精准指出错误字段路径和具体原因。" } }, { "@type": "Question", "name": "Schema 验证数据会上传吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。JSON 数据和 Schema 定义均在浏览器本地完成解析验证，不经网络传输。你可以在离线环境下使用，敏感 API 数据结构也可以放心校验。" } }] }),
          }}
        />
        <ToolClient />
      </>
    )
}
