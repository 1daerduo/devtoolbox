import type { Metadata } from 'next'
import MyIpClient from './ToolClient'

export const metadata: Metadata = {
  title: 'IP 地址查询工具 - 我的IP是什么 - DevToolbox',
  description: '免费在线查询本机公网 IP 地址、地理位置、ISP 运营商信息。支持 IPv4/IPv6 地址检测，查询当前网络信息。',
  keywords: ['IP查询', '我的IP', 'what is my ip', 'IP地址查询', '公网IP', '本机IP', 'IPv4', 'IPv6'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/my-ip' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "IP 地址查询", "item": "https://devtoolbox-61u.pages.dev/tools/my-ip" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "IP 地址查询 - DevToolbox", "description": "查询公网 IP 与位置", "url": "https://devtoolbox-61u.pages.dev/tools/my-ip", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <MyIpClient />
      </>
    )
}
