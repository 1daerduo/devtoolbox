import type { Metadata } from 'next'
import EmailValidatorClient from './ToolClient'

export const metadata: Metadata = {
  title: '邮箱地址在线验证器 | Email Validator Online - MoreToolbox',
  description: '在线验证邮箱地址格式，检测常见拼写错误、域名有效性，支持批量邮箱验证，数据本地处理保护隐私。 | Free online email validator. Check format, detect common typos, domain validity. Batch email verification, local processing for privacy.',
  keywords: ['邮箱验证', 'Email验证', '邮箱格式检查', '邮箱校验', 'email validator', '邮件地址验证'],
  alternates: { canonical: '/tools/email-validator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "邮箱验证器", "item": "https://moretoolbox.com/tools/email-validator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "邮箱验证器 - MoreToolbox", "description": "邮箱格式在线验证 | Free online email validator", "url": "https://moretoolbox.com/tools/email-validator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <EmailValidatorClient />
      </>
    )
}
