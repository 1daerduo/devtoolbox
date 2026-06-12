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
        <CurlToCodeClient />
      </>
    )
}
