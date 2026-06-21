import type { Metadata } from 'next'
import PassphraseGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '密码短语生成器 - 安全易记密码短语 | MoreToolbox',
  description: '免费在线密码短语生成器。生成安全且易记的密码短语，支持自定义单词数、分隔符、大写、数字追加。比随机密码更安全更好记。 | Free online passphrase generator. Create secure, memorable passphrases with custom word count, separators, and options.',
  keywords: ['passphrase generator', 'diceware', 'password phrase', 'secure passphrase', 'memorable password', '密码短语生成器', '安全密码短语', '易记密码'],
  alternates: { canonical: 'https://moretoolbox.com/tools/passphrase-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Passphrase Generator", "item": "https://moretoolbox.com/tools/passphrase-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Passphrase Generator - MoreToolbox", "description": "Generate secure, memorable passphrases online", "url": "https://moretoolbox.com/tools/passphrase-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "密码短语比传统密码更安全吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的。一个4词密码短语（如 correct-horse-battery-staple）的熵值约为 51 bits，远高于8字符随机密码。而且密码短语更容易记忆，因此用户不太可能写在便签上，从而更安全。" } }, { "@type": "Question", "name": "密码短语生成器使用什么单词列表？", "acceptedAnswer": { "@type": "Answer", "text": "本工具使用 EFF 大型单词列表（7776个单词），这是 Diceware 方法的标准单词列表，经过专门挑选以确保每个单词都容易拼写和识别。" } }, { "@type": "Question", "name": "应该使用几个单词？", "acceptedAnswer": { "@type": "Answer", "text": "推荐至少 4 个单词用于一般账户，5-6 个单词用于高安全性账户（如加密货币钱包）。每增加一个单词，暴力破解难度增加约 7776 倍。" } }] }),
          }}
        />
        <PassphraseGeneratorClient />
      </>
    )
}
