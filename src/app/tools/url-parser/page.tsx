import type { Metadata } from 'next'
import UrlParserClient from './ToolClient'

export const metadata: Metadata = {
  title: 'URL Parser - Online URL Analyzer & Query String Splitter - MoreToolbox',
  description: 'Free online URL parser tool. Break down URLs into protocol, hostname, port, path, query parameters, and hash. Analyze and debug URLs instantly in your browser.',
  keywords: ['URL parser', 'URL analyzer', 'query string parser', 'URL breakdown', 'parse URL online', 'URL解析器', 'URL分析', '查询字符串解析'],
  alternates: { canonical: '/tools/url-parser' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "URL Parser", "item": "https://moretoolbox.com/tools/url-parser" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL Parser - MoreToolbox", "description": "Parse and analyze URLs into components", "url": "https://moretoolbox.com/tools/url-parser", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <UrlParserClient />
      </>
    )
}
