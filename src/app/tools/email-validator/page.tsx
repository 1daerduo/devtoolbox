import type { Metadata } from 'next'
import EmailValidatorClient from './ToolClient'

export const metadata: Metadata = {
  title: '邮箱地址在线验证器 | Email Validator Online - MoreToolbox',
  description: '免费在线邮箱地址格式验证器，支持单个和批量邮箱校验。自动检测邮箱格式错误、常见拼写错误（如 @gmial.com → @gmail.com）、域名 MX 记录有效性。支持 CSV 导入导出批量验证结果，数据完全在浏览器本地处理，保护隐私安全。开发者、运营人员邮件列表清洗必备工具。 | Free online email validator. Single & batch email verification. Detects format errors, common typos & domain validity. CSV import/export supported. 100% local processing for privacy.',
  keywords: ['邮箱验证', 'Email验证', '邮箱格式检查', '邮箱校验', 'email validator', '邮件地址验证', '批量邮箱验证', '邮箱清洗'],
  alternates: { canonical: 'https://moretoolbox.com/tools/email-validator' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "在线邮箱验证能检测什么？能验证邮箱是否存在吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具可以检测：邮箱格式是否正确（RFC 5322 标准）、是否存在常见拼写错误（如 gmial→gmail）、域名是否有有效 MX 记录、是否使用一次性临时邮箱。但无法确认邮箱是否真实存在（这需要发送验证邮件）。适合在用户注册前快速过滤无效地址。" } }, { "@type": "Question", "name": "批量验证邮箱时会泄露数据吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有邮箱验证完全在您的浏览器本地执行，支持 CSV 导入导出批量处理。数据不会上传到任何服务器，您的邮件列表始终保持私密安全。适合运营人员清洗邮件列表。" } }, { "@type": "Question", "name": "验证结果中的 MX 记录检查是什么意思？", "acceptedAnswer": { "@type": "Answer", "text": "MX 记录是域名的邮件交换记录。通过 DNS 查询检查邮箱域名是否有 MX 记录，可以判断该域名是否配置了邮件服务。例如 @gmail.com 有 MX 记录（可以收邮件），而 @example.com 可能没有。这是一个重要的有效性指标。" } }] }),
          }}
        />
        <EmailValidatorClient />
      </>
    )
}
