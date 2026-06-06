import type { Metadata } from 'next'
import PasswordGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线随机密码生成器 - 安全密码批量生成 - DevToolbox',
  description: '在线随机密码生成工具，支持自定义长度、大小写字母、数字、特殊符号，crypto.getRandomValues 真随机，批量生成，浏览器本地计算。',
  keywords: ['密码生成器', '随机密码', '强密码生成', '密码在线生成', '安全密码', 'password generator', '批量密码'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/password-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "密码生成器", "item": "https://devtoolbox-61u.pages.dev/tools/password-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "密码生成器 - DevToolbox", "description": "安全随机密码生成", "url": "https://devtoolbox-61u.pages.dev/tools/password-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <PasswordGeneratorClient />
      </>
    )
}
