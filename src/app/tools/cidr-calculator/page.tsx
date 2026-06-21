import type { Metadata } from 'next'
import CidrCalculatorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CIDR 计算器 - IP子网划分与网络地址计算 | MoreToolbox',
  description: '免费在线 CIDR 计算器。输入 IP/CIDR 即可计算网络地址、广播地址、子网掩码、可用主机数、IP范围。支持 IPv4 子网划分和 VLSM 计算。 | Free online CIDR calculator. Compute network address, broadcast, subnet mask, usable hosts, and IP range from CIDR notation.',
  keywords: ['CIDR calculator', 'subnet calculator', 'IP subnet', 'CIDR notation', 'network address', 'broadcast address', 'subnet mask', 'CIDR计算器', '子网计算器', 'IP子网划分'],
  alternates: { canonical: 'https://moretoolbox.com/tools/cidr-calculator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CIDR Calculator", "item": "https://moretoolbox.com/tools/cidr-calculator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CIDR Calculator - MoreToolbox", "description": "Free online CIDR subnet calculator for IPv4 network planning", "url": "https://moretoolbox.com/tools/cidr-calculator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 CIDR 表示法？", "acceptedAnswer": { "@type": "Answer", "text": "CIDR（无类别域间路由）表示法用 IP 地址后加斜杠和网络位数来表示子网，例如 192.168.1.0/24 表示前 24 位为网络位，后 8 位为主机位，可容纳 254 台主机。" } }, { "@type": "Question", "name": "如何计算子网中的可用主机数？", "acceptedAnswer": { "@type": "Answer", "text": "可用主机数 = 2^(32-网络位数) - 2。减去 2 是因为网络地址（全0）和广播地址（全1）不能分配给主机。例如 /24 子网有 2^8 - 2 = 254 个可用主机。" } }, { "@type": "Question", "name": "子网掩码和 CIDR 有什么关系？", "acceptedAnswer": { "@type": "Answer", "text": "CIDR 中的网络位数就是子网掩码中连续 1 的位数。例如 /24 对应子网掩码 255.255.255.0（24个1 + 8个0），/16 对应 255.255.0.0。" } }] }),
          }}
        />
        <CidrCalculatorClient />
      </>
    )
}
