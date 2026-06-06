import type { Metadata } from 'next'
import HttpStatusCodesClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTTP Status Code Reference - Complete Status Code Lookup - MoreToolbox',
  description: 'Free online HTTP status code reference. Search and browse all HTTP response codes (1xx-5xx) with descriptions, use cases, and examples. Essential for web developers and API debugging.',
  keywords: ['HTTP status codes', 'status code reference', 'HTTP response codes', '404', '500', 'HTTP状态码', '状态码查询', 'HTTP响应码参考'],
  alternates: { canonical: '/tools/http-status-codes' },
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTTP Status Code Reference - MoreToolbox", "description": "Complete HTTP status code lookup and reference guide", "url": "https://moretoolbox.com/tools/http-status-codes", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <HttpStatusCodesClient />
      </>
    )
}
