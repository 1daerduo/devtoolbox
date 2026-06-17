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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "MD5 和 SHA-256 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "MD5 生成 128 位（32 字符十六进制）哈希值，速度快但已被证明存在碰撞漏洞，不适合安全场景。SHA-256 生成 256 位（64 字符十六进制）哈希值，安全性更高，广泛用于数字签名和区块链。一般场景用 MD5 做校验，安全场景用 SHA-256 或 SHA-512。" } }, { "@type": "Question", "name": "哈希值可以反向解密吗？", "acceptedAnswer": { "@type": "Answer", "text": "不可以。哈希是单向函数，无法从哈希值反推出原始数据。但攻击者可以使用彩虹表或暴力破解来尝试匹配常见输入。为增强安全性，建议对密码使用加盐（salt）的 Bcrypt 哈希，而非简单的 MD5 或 SHA。" } }, { "@type": "Question", "name": "我的数据会被上传到服务器吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有哈希计算完全在您的浏览器本地执行，输入的数据不会通过网络传输到任何服务器，您的数据绝对安全。" } }] }),
          }}
        />
        <HashGeneratorClient />
      </>
    )
}
