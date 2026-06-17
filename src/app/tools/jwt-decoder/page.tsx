import type { Metadata } from 'next'
import JwtDecoderClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JWT 在线解码工具 | JWT Decoder Online - MoreToolbox',
  description: '免费在线 JWT Token 解码工具，支持 HS256/RS256 等多种算法，解析 Header 和 Payload，验证签名。无需注册，开发者必备。 | Free online JWT token decoder. Supports HS256/RS256 algorithms. Parse Header & Payload, verify signature. No registration needed.',
  keywords: ['JWT解码', 'JWT decoder', 'JSON Web Token', 'JWT解析', 'token decode', '在线JWT工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/jwt-decoder' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JWT 解码器", "item": "https://moretoolbox.com/tools/jwt-decoder" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JWT 解码器 - MoreToolbox", "description": "解析 JWT Token 数据 | Free online JWT token decoder", "url": "https://moretoolbox.com/tools/jwt-decoder", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JWT Token 由哪几部分组成？", "acceptedAnswer": { "@type": "Answer", "text": "JWT 由三部分组成，用点号（.）分隔：Header（头部，包含令牌类型和签名算法）、Payload（载荷，包含用户声明数据）和 Signature（签名，用于验证数据完整性）。每部分都是 Base64Url 编码的 JSON。" } }, { "@type": "Question", "name": "JWT 解码能看到密码吗？", "acceptedAnswer": { "@type": "Answer", "text": "JWT 的 Header 和 Payload 只是 Base64 编码，任何人都可以解码查看内容，因此不应在 JWT 中存储敏感信息如密码。JWT 的安全性依赖于签名验证——确保令牌未被篡改，而非内容的加密。" } }, { "@type": "Question", "name": "本工具可以验证 JWT 签名吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具可以解码 JWT 的 Header 和 Payload 部分，并展示签名算法信息。对于 HS256 算法，您可以输入密钥来验证签名是否正确。对于 RS256 等非对称算法，签名验证需要公钥支持。" } }] }),
          }}
        />
        <JwtDecoderClient />
      </>
    )
}
