import type { Metadata } from 'next'
import Base64Client from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 在线编解码工具 - DevToolbox',
  description: '在线 Base64 编码解码工具，支持 UTF-8 中文，一键交换输入输出。免费、无需注册，数据纯前端处理，安全放心。',
  keywords: ['Base64编码', 'Base64解码', '在线Base64', 'Base64转换', 'base64 encoder', 'base64 decoder'],
  alternates: { canonical: '/tools/base64' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Base64 编解码", "item": "https://moretoolbox.com/tools/base64" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Base64 编解码 - DevToolbox", "description": "文本与 Base64 互转", "url": "https://moretoolbox.com/tools/base64", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <Base64Client />
      </>
    )
}
