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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Lorem Ipsum 是什么？为什么设计要用占位文本？", "acceptedAnswer": { "@type": "Answer", "text": "Lorem Ipsum 是设计印刷行业的标准占位文本，源自公元前 45 年的拉丁文文献。使用占位文本而非实际内容，可以让评审者专注于版面设计和视觉层次，而不被文字内容分心。前端开发和 UI 设计中常用它来填充页面原型。" } }, { "@type": "Question", "name": "支持中文占位文本吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。本工具提供经典英文 Lorem Ipsum 和中文占位文本两种模式。中文占位文本是随机生成的通顺中文段落，适合中文网站和应用的 UI 原型设计。可自定义段落数和每段字数。" } }, { "@type": "Question", "name": "生成的占位文本有版权问题吗？", "acceptedAnswer": { "@type": "Answer", "text": "没有。Lorem Ipsum 是公共领域文本，不受版权限制。中文占位文本由算法随机生成，不包含任何真实个人信息或受版权保护的内容，可以安全用于商业项目。" } }] }),
          }}
        />
        <LoremIpsumClient />
      </>
    )
}
