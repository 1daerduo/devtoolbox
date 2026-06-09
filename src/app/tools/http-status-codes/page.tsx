import type { Metadata } from 'next'
import HttpStatusCodesClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTTP 状态码参考大全 - HTTP Status Code Reference | MoreToolbox',
  description: '免费在线 HTTP 状态码参考大全。查询全部 HTTP 响应状态码(1xx-5xx)，含详细说明、使用场景和示例。Web 开发者和 API 调试必备。 | Free online HTTP status code reference. Search and browse all codes (1xx-5xx) with descriptions and examples.',
  keywords: ['HTTP status codes', 'status code reference', 'HTTP response codes', '404', '500', 'HTTP状态码', '状态码查询', 'HTTP响应码参考'],
  alternates: { canonical: 'https://moretoolbox.com/tools/http-status-codes' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTTP Status Code Reference", "item": "https://moretoolbox.com/tools/http-status-codes" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTTP Status Code Reference - MoreToolbox", "description": "Complete HTTP status code lookup and reference guide", "url": "https://moretoolbox.com/tools/http-status-codes", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HttpStatusCodesClient />
      </>
    )
}
