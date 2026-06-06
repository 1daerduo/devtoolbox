import type { Metadata } from 'next'
import WordCountClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线字数统计工具 - 中文字符、英文单词、段落计数 - MoreToolbox',
  description: '在线字数统计工具，实时统计文本总字符数、中文字符数、英文单词数、段落数、句子数、行数、数字个数、标点符号数，完全免费。 | Free online word counter. Real-time stats: characters, Chinese chars, English words, paragraphs, sentences, lines, numbers, punctuation.',
  keywords: ['字数统计', '字符统计', '在线字数统计', '统计字数', '中文字符统计', '英文单词统计', '段落计数', '文本统计'],
  alternates: { canonical: 'https://moretoolbox.com/tools/word-count' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "字数统计", "item": "https://moretoolbox.com/tools/word-count" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "字数统计 - MoreToolbox", "description": "字符数、单词数、段落数统计 | Free online word counter", "url": "https://moretoolbox.com/tools/word-count", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <WordCountClient />
      </>
    )
}
