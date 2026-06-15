import type { Metadata } from 'next'
import JsonFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 在线格式化工具 | JSON Formatter & Validator - MoreToolbox',
  description: '在线 JSON 数据格式化、压缩、验证工具，支持语法高亮显示和多种缩进模式。免费、无需注册，开发者必备。 | Free online JSON formatter, beautifier & validator. Syntax highlighting, multiple indent modes. No upload, no registration.',
  keywords: ['JSON格式化', 'JSON压缩', 'JSON验证', '在线JSON工具', 'JSON formatter'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-formatter' },
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON 格式化 - MoreToolbox", "description": "格式化、压缩、验证 JSON 数据 | Free online JSON formatter, beautifier & validator", "url": "https://moretoolbox.com/tools/json-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON 格式化有什么用？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 格式化能将压缩成一行的 JSON 数据转换为带缩进和换行的易读格式，方便开发者调试 API 响应、阅读配置文件、排查数据结构错误。格式化不会改变数据内容，仅改变显示方式。" } }, { "@type": "Question", "name": "我的 JSON 数据会被上传到服务器吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有格式化、压缩、验证操作完全在您的浏览器本地执行，JSON 数据不会通过网络传输到任何服务器，您的数据绝对安全。" } }, { "@type": "Question", "name": "JSON 和 JSONL 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 是标准的键值对结构（对象或数组），适合表示复杂数据。JSONL（JSON Lines）是每行一个独立 JSON 对象的格式，常用于日志和大数据流处理。本工具主要处理标准 JSON 格式。" } }] }),
          }}
        />
        <JsonFormatterClient />
      </>
    )
}
