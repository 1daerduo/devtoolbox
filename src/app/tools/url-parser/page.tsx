import type { Metadata } from 'next'
import UrlParserClient from './ToolClient'

export const metadata: Metadata = {
  title: 'URL 解析器 - Online URL Parser & Analyzer | MoreToolbox',
  description: '免费在线 URL 解析工具。将 URL 拆解为协议、主机名、端口、路径、查询参数、Hash 等组件，方便分析和调试。 | Free online URL parser. Break down URLs into protocol, hostname, port, path, query parameters, and hash for analysis.',
  keywords: ['URL parser', 'URL analyzer', 'query string parser', 'URL breakdown', 'parse URL online', 'URL解析器', 'URL分析', '查询字符串解析'],
  alternates: { canonical: 'https://moretoolbox.com/tools/url-parser' },
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
