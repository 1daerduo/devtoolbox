import type { Metadata } from 'next'
import JwtDecoderClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JWT 在线解码工具 - DevToolbox',
  description: '免费在线 JWT Token 解码工具，支持 HS256/RS256 等多种算法，解析 Header 和 Payload，验证签名。无需注册，开发者必备。',
  keywords: ['JWT解码', 'JWT decoder', 'JSON Web Token', 'JWT解析', 'token decode', '在线JWT工具'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/jwt-decoder' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "JWT 解码器", "item": "https://devtoolbox-61u.pages.dev/tools/jwt-decoder" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JWT 解码器 - DevToolbox", "description": "解析 JWT Token 数据", "url": "https://devtoolbox-61u.pages.dev/tools/jwt-decoder", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JwtDecoderClient />
      </>
    )
}
