import type { Metadata } from 'next'
import MyIpClient from './ToolClient'

export const metadata: Metadata = {
  title: 'IP 地址查询工具 - 我的IP是什么 - MoreToolbox',
  description: '免费在线查询本机公网 IP 地址、地理位置、ISP 运营商信息。支持 IPv4/IPv6 地址检测，查询当前网络信息。 | Free online IP address lookup. Public IP, geolocation, ISP info. IPv4 & IPv6 detection. Check your current network information.',
  keywords: ['IP查询', '我的IP', 'what is my ip', 'IP地址查询', '公网IP', '本机IP', 'IPv4', 'IPv6'],
  alternates: { canonical: 'https://moretoolbox.com/tools/my-ip' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "IP 地址查询", "item": "https://moretoolbox.com/tools/my-ip" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IP 地址查询 - MoreToolbox", "description": "查询公网 IP 与位置 | Free online IP address lookup", "url": "https://moretoolbox.com/tools/my-ip", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是公网 IP 地址？", "acceptedAnswer": { "@type": "Answer", "text": "公网 IP（Public IP）是互联网上唯一标识你设备的 IP 地址，由 ISP 分配。与内网 IP（如 192.168.x.x）不同，公网 IP 可以被全球访问。本工具自动检测你当前的公网 IP 地址。" } }, { "@type": "Question", "name": "IPv4 和 IPv6 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "IPv4 是 32 位地址（如 192.168.1.1），约 43 亿个地址，已基本耗尽。IPv6 是 128 位地址（如 2001:db8::1），地址空间几乎无限。IPv6 还简化了头部、增强了安全性。全球正在逐步过渡到 IPv6。" } }, { "@type": "Question", "name": "如何隐藏我的 IP 地址？", "acceptedAnswer": { "@type": "Answer", "text": "隐藏 IP 的方法包括：使用 VPN（加密所有流量）、代理服务器（仅代理特定流量）、Tor 浏览器（多层加密匿名访问）。注意隐藏 IP 主要用于隐私保护，不能完全保证匿名性。" } }] }),
          }}
        />
        <MyIpClient />
      </>
    )
}
