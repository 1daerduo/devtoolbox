import type { Metadata } from 'next'
import LoremIpsumClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Lorem Ipsum 生成器 - 在线占位文本生成工具 - MoreToolbox',
  description: '免费在线 Lorem Ipsum 占位文本生成器，支持中文占位文本、英文 Lorem Ipsum，自定义段落数和字数，前端开发必备。 | Free online Lorem Ipsum generator. Chinese & English placeholder text, custom paragraphs & word counts. UI/UX design essential.',
  keywords: ['Lorem Ipsum', '占位文本', '假文生成', '中文占位文本', 'placeholder text', '随机文本生成', '网页占位符'],
  alternates: { canonical: 'https://moretoolbox.com/tools/lorem-ipsum' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Lorem Ipsum 生成器", "item": "https://moretoolbox.com/tools/lorem-ipsum" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Lorem Ipsum 生成器 - MoreToolbox", "description": "中英文占位文本生成 | Free online Lorem Ipsum generator", "url": "https://moretoolbox.com/tools/lorem-ipsum", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <LoremIpsumClient />
      </>
    )
}
