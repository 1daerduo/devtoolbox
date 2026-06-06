import type { Metadata } from 'next'
import BcryptGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Bcrypt 生成验证工具 - 在线密码哈希生成 - DevToolbox',
  description: '免费在线 Bcrypt 哈希生成与验证工具，支持自定义 rounds (salt rounds)，安全生成密码哈希，验证密码与哈希匹配。后端开发必备。',
  keywords: ['Bcrypt生成', 'Bcrypt验证', '密码哈希', 'bcrypt hash', 'bcrypt generator', 'bcrypt checker', '密码加密'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/bcrypt-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "Bcrypt 生成验证", "item": "https://devtoolbox-61u.pages.dev/tools/bcrypt-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Bcrypt 生成验证 - DevToolbox", "description": "Bcrypt 密码哈希生成与验证", "url": "https://devtoolbox-61u.pages.dev/tools/bcrypt-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <BcryptGeneratorClient />
      </>
    )
}
