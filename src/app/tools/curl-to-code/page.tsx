import type { Metadata } from 'next'
import CurlToCodeClient from './ToolClient'

export const metadata: Metadata = {
  title: 'cURL 转代码工具 | cURL to Code Converter - MoreToolbox',
  description: '免费在线 cURL 命令转代码工具，一键将 cURL 命令转换为 Python (requests/urllib)、JavaScript (fetch/axios)、PHP (curl)、Go (net/http)、Java (OkHttp) 等多语言可执行代码。自动解析 HTTP 请求方法、请求头、请求体和 Cookie，支持 GET/POST/PUT/PATCH/DELETE。API 调试和代码迁移必备工具。 | Free online cURL to code converter. Convert cURL commands to Python, JavaScript, PHP, Go, Java code instantly. Auto-parses headers, body & cookies. Essential for API migration.',
  keywords: ['cURL转代码', 'cURL to code', 'cURL converter', 'cURL转Python', 'cURL转JavaScript', 'curlconverter', 'cURL转PHP', 'cURL转Go'],
  alternates: { canonical: 'https://moretoolbox.com/tools/curl-to-code' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "cURL 转代码", "item": "https://moretoolbox.com/tools/curl-to-code" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "cURL 转代码工具 - MoreToolbox", "description": "将 cURL 命令转换为多种编程语言代码 | Convert cURL commands to code", "url": "https://moretoolbox.com/tools/curl-to-code", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "cURL 转代码支持哪些编程语言？", "acceptedAnswer": { "@type": "Answer", "text": "支持转换为 Python (requests/urllib)、JavaScript (fetch/axios/XMLHttpRequest)、PHP (cURL/Guzzle)、Go (net/http)、Java (OkHttp/HttpClient)、Node.js (http/https)、Rust (reqwest) 等主流语言的 HTTP 请求代码。自动识别请求方法、请求头、请求体和 Cookie。" } }, { "@type": "Question", "name": "cURL 命令从哪里获取？", "acceptedAnswer": { "@type": "Answer", "text": "可以从浏览器开发者工具（Network 面板 → 右键请求 → Copy as cURL）、Postman、API 文档、Swagger 等工具中获取 cURL 命令。粘贴到本工具即可一键转为目标语言的可执行代码，无需手动编写 HTTP 请求代码。" } }, { "@type": "Question", "name": "转换的代码可以直接运行吗？是否需要修改？", "acceptedAnswer": { "@type": "Answer", "text": "大部分情况下可以直接运行。工具会自动处理 URL 编码、请求头转换、JSON body 解析等。但请注意检查：1）认证 Token 是否过期；2）HTTPS 证书验证；3）特殊字符转义。建议在测试环境中先验证。" } }] }),
          }}
        />
        <CurlToCodeClient />
      </>
    )
}
