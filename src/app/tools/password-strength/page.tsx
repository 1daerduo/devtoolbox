import type { Metadata } from 'next'
import PasswordStrengthClient from './ToolClient'

export const metadata: Metadata = {
  title: '密码强度检查器 - Password Strength Checker | MoreToolbox',
  description: '免费在线密码强度检查器。检测密码安全性：熵值评分、破解时间预估、字符组成分析。100% 浏览器本地处理，密码不会外传。 | Free online password strength checker with entropy score, crack time estimate, and character analysis.',
  keywords: ['password strength checker', 'password tester', 'password security', 'crack time estimate', '密码强度检查', '密码安全性测试', '密码破解时间'],
  alternates: { canonical: 'https://moretoolbox.com/tools/password-strength' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Password Strength Checker", "item": "https://moretoolbox.com/tools/password-strength" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Password Strength Checker - MoreToolbox", "description": "Test password strength with entropy and crack time analysis", "url": "https://moretoolbox.com/tools/password-strength", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <PasswordStrengthClient />
      </>
    )
}
