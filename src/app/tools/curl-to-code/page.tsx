import type { Metadata } from 'next'
import CurlToCodeClient from './ToolClient'

export const metadata: Metadata = {
  title: 'cURL 转代码工具 | cURL to Code Converter - MoreToolbox',
  description: '在线将 cURL 命令转换为 Python、JavaScript、PHP、Go 等语言代码。支持 GET/POST/PUT/DELETE，自动解析请求头和请求体。免费、无需注册。 | Convert cURL commands to Python, JS, PHP, Go code. Parse headers & body automatically.',
  keywords: ['cURL转代码', 'cURL to code', 'cURL converter', 'cURL转Python', 'cURL转JavaScript', 'curlconverter'],
  alternates: { canonical: '/tools/curl-to-code' },
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
