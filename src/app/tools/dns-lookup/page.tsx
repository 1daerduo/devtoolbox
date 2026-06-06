import type { Metadata } from 'next'
import DnsLookupClient from './ToolClient'

export const metadata: Metadata = {
  title: 'DNS 在线查询工具 - A/AAAA/CNAME/MX/NS/TXT 记录查询 - MoreToolbox',
  description: '在线 DNS 记录查询工具，支持 A、AAAA、CNAME、MX、NS、TXT、SOA 等常见 DNS 记录查询，快速诊断域名解析问题。 | Free online DNS record lookup. Query A, AAAA, CNAME, MX, NS, TXT, SOA records. Quickly diagnose domain resolution issues.',
  keywords: ['DNS查询', 'DNS记录', 'A记录', 'CNAME', 'MX记录', '域名解析', 'NS记录', 'TXT记录', 'DNS lookup'],
  alternates: { canonical: '/tools/dns-lookup' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "DNS 查询工具", "item": "https://moretoolbox.com/tools/dns-lookup" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "DNS 查询工具 - MoreToolbox", "description": "A/AAAA/CNAME/MX 等记录查询 | Free online DNS record lookup", "url": "https://moretoolbox.com/tools/dns-lookup", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <DnsLookupClient />
      </>
    )
}
