import type { Metadata } from 'next'
import CreditCardValidatorClient from './ToolClient'

export const metadata: Metadata = {
  title: '信用卡验证器 - Luhn算法在线校验 | MoreToolbox',
  description: '免费在线信用卡验证器。基于 Luhn 算法校验卡号合法性，识别卡类型（Visa/MasterCard/Amex/Discover等），支持批量验证。数据本地处理，安全可靠。 | Free online credit card validator with Luhn algorithm. Identify card type, validate card number, batch support.',
  keywords: ['credit card validator', 'Luhn algorithm', 'card number check', 'credit card checker', 'Luhn验证', '信用卡验证', '卡号校验', 'Luhn算法'],
  alternates: { canonical: 'https://moretoolbox.com/tools/credit-card-validator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Credit Card Validator", "item": "https://moretoolbox.com/tools/credit-card-validator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Credit Card Validator - MoreToolbox", "description": "Validate credit card numbers using Luhn algorithm", "url": "https://moretoolbox.com/tools/credit-card-validator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 Luhn 算法？", "acceptedAnswer": { "@type": "Answer", "text": "Luhn 算法（模10算法）是一种简单的校验和算法，用于验证信用卡号、IMEI号等标识号码的有效性。它通过从右到左对数字交替乘2并求和来计算校验位。" } }, { "@type": "Question", "name": "这个工具会发送我的卡号到服务器吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有验证逻辑完全在浏览器本地执行，卡号数据不会发送到任何服务器。我们建议仅使用测试卡号进行验证，不要输入真实信用卡信息。" } }, { "@type": "Question", "name": "如何识别信用卡类型？", "acceptedAnswer": { "@type": "Answer", "text": "信用卡类型通过卡号前缀（BIN/IIN）识别：Visa 以 4 开头，MasterCard 以 5 开头（51-55）或 2 开头（2221-2720），American Express 以 34 或 37 开头，Discover 以 6011 或 65 开头。" } }] }),
          }}
        />
        <CreditCardValidatorClient />
      </>
    )
}
