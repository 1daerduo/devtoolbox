import type { Metadata } from 'next'
import PasswordGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线随机密码生成器 - 安全密码批量生成 - MoreToolbox',
  description: '在线随机密码生成工具，支持自定义长度、大小写字母、数字、特殊符号，crypto.getRandomValues 真随机，批量生成，浏览器本地计算。 | Free online random password generator. Custom length, uppercase, lowercase, numbers, symbols. Uses crypto.getRandomValues. Browser local, secure.',
  keywords: ['密码生成器', '随机密码', '强密码生成', '密码在线生成', '安全密码', 'password generator', '批量密码'],
  alternates: { canonical: 'https://moretoolbox.com/tools/password-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "密码生成器", "item": "https://moretoolbox.com/tools/password-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "密码生成器 - MoreToolbox", "description": "安全随机密码生成 | Free online random password generator", "url": "https://moretoolbox.com/tools/password-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "在线生成密码安全吗？密码会被上传吗？", "acceptedAnswer": { "@type": "Answer", "text": "绝对安全。密码完全在您的浏览器本地使用 crypto.getRandomValues 加密级随机数 API 生成，不会通过网络传输或存储到任何服务器。生成后请自行妥善保存。" } }, { "@type": "Question", "name": "什么样的密码最安全？", "acceptedAnswer": { "@type": "Answer", "text": "推荐至少 16 位长度，包含大写字母、小写字母、数字和特殊符号的混合密码。避免使用个人信息（生日、姓名）、常见单词或键盘序列（如 qwerty、123456）。" } }, { "@type": "Question", "name": "可以批量生成多个密码吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。支持一次批量生成最多 50 个不同密码，方便为多个账号、团队成员或测试环境创建独立的安全密码。一键复制或导出全部密码。" } }] }),
          }}
        />
        <PasswordGeneratorClient />
      </>
    )
}
