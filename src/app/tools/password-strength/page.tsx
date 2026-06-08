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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "密码强度是如何计算的？", "acceptedAnswer": { "@type": "Answer", "text": "基于信息熵（Entropy）理论计算。综合考虑密码长度、字符集大小（小写26+大写26+数字10+特殊符号32）和字符组合复杂度。同时检测常见弱密码模式，如重复字符、键盘序列、常见单词和泄露密码等。" } }, { "@type": "Question", "name": "破解时间预估准确吗？", "acceptedAnswer": { "@type": "Answer", "text": "破解时间基于理论暴力破解计算（密码组合数 ÷ 每秒尝试速率），提供最佳、中等、最差三种硬件场景预估。实际破解时间取决于攻击者的计算资源和攻击方式，此预估仅供参考。" } }, { "@type": "Question", "name": "输入的密码会被上传或存储吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有密码强度分析完全在您的浏览器本地进行，密码绝不会离开您的设备。我们不收集、不存储、不传输任何密码内容。您可以放心使用。" } }] }),
          }}
        />
        <PasswordStrengthClient />
      </>
    )
}
