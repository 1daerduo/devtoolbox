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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "中文字数和英文字数怎么统计？", "acceptedAnswer": { "@type": "Answer", "text": "中文字数统计通常按字符计算，一个汉字算一个字。英文按单词（word）统计，以空格分隔。本工具同时统计中文字符数、英文单词数、总字符数（含空格和不含空格），满足不同场景的字数需求。" } }, { "@type": "Question", "name": "论文一般要求多少字？", "acceptedAnswer": { "@type": "Answer", "text": "本科论文一般要求 8000-15000 字，硕士论文 3-5 万字，博士论文 5-10 万字。不同学校和学科有差异。用本工具可以快速统计论文字数，确保符合要求。" } }, { "@type": "Question", "name": "字符数和字数有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "字符数包含所有字符（字母、数字、标点、空格），字数通常指单词数（英文）或字符数（中文）。例如 hello world 有 11 个字符（含空格）但只有 2 个单词。本工具同时显示两种统计结果。" } }] }),
          }}
        />
        <WordCountClient />
      </>
    )
}
