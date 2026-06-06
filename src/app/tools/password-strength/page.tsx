import type { Metadata } from 'next'
import PasswordStrengthClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Password Strength Checker - Test Password Security Online - MoreToolbox',
  description: 'Free online password strength checker. Test your password security with entropy score, crack time estimate, and character analysis. 100% private — all analysis runs in your browser.',
  keywords: ['password strength checker', 'password tester', 'password security', 'crack time estimate', '密码强度检查', '密码安全性测试', '密码破解时间'],
  alternates: { canonical: '/tools/password-strength' },
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
