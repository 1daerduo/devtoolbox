import type { Metadata } from 'next'
import DnsLookupClient from './ToolClient'

export const metadata: Metadata = {
  title: 'DNS 在线查询工具 - A/AAAA/CNAME/MX/NS/TXT 记录查询 - MoreToolbox',
  description: '在线 DNS 记录查询工具，支持 A、AAAA、CNAME、MX、NS、TXT、SOA 等常见 DNS 记录查询，快速诊断域名解析问题。 | Free online DNS record lookup. Query A, AAAA, CNAME, MX, NS, TXT, SOA records. Quickly diagnose domain resolution issues.',
  keywords: ['DNS查询', 'DNS记录', 'A记录', 'CNAME', 'MX记录', '域名解析', 'NS记录', 'TXT记录', 'DNS lookup'],
  alternates: { canonical: 'https://moretoolbox.com/tools/dns-lookup' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "DNS 查询在线工具有什么用？常用场景有哪些？", "acceptedAnswer": { "@type": "Answer", "text": "DNS 查询用于检查域名的解析记录，常见场景包括：排查网站无法访问（确认 A 记录是否正确）、验证域名邮箱配置（MX 记录）、检查 CDN 解析（CNAME 记录）、验证域名所有权（TXT 记录）以及查看 SPF/DKIM 等反垃圾邮件记录。" } }, { "@type": "Question", "name": "在线 DNS 查询准确吗？和命令行有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "在线 DNS 查询通常通过公开 DNS 解析器（如 Google DNS、Cloudflare DNS）发起，结果与本地命令行 nslookup 或 dig 基本一致。区别在于在线工具可能经过缓存，且查询来源 IP 不同。本工具使用 Google DNS over HTTPS 确保结果的权威性。" } }, { "@type": "Question", "name": "查询 DNS 记录需要多长时间？", "acceptedAnswer": { "@type": "Answer", "text": "通常 1-3 秒即可返回结果。如果查询超时，可能是目标域名 DNS 服务器响应缓慢或网络问题，建议刷新后重试。修改 DNS 记录后，全球生效通常需要几分钟到 48 小时（取决于 TTL 设置）。" } }] }),
          }}
        />
        <DnsLookupClient />
      </>
    )
}
