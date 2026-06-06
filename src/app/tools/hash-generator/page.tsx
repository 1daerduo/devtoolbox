import type { Metadata } from 'next'
import HashGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线哈希 Hash 生成工具 - MD5, SHA-1, SHA-256, SHA-512 - MoreToolbox',
  description: '在线哈希值生成工具，支持 MD5、SHA-1、SHA-256、SHA-512 算法，数据在浏览器本地计算，不上传服务器，安全可靠。 | Free online hash generator. Supports MD5, SHA-1, SHA-256, SHA-512. Browser-side computation, no upload, secure & reliable.',
  keywords: ['MD5生成', 'SHA1生成', 'SHA256生成', 'SHA512生成', '哈希生成', 'Hash生成', '在线MD5', '在线SHA', '哈希计算', '加密工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/hash-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "哈希生成器", "item": "https://moretoolbox.com/tools/hash-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "哈希生成器 - MoreToolbox", "description": "MD5/SHA 哈希值生成 | Free online hash generator", "url": "https://moretoolbox.com/tools/hash-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HashGeneratorClient />
      </>
    )
}
