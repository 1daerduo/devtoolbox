import type { Metadata } from 'next'
import TextDedupClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线文本去重排序工具 - 按行去重、排序、反转 - MoreToolbox',
  description: '在线文本去重排序工具，支持按行去重、升序排序、降序排序、反转、去空行、去空格，适合处理名单列表日志等文本数据。 | Free online text dedup & sorting tool. Line dedup, ascending/descending sort, reverse, remove blanks. List & log processing.',
  keywords: ['文本去重', '文本排序', '去重工具', '按行去重', '列表去重', '文本处理', '文本反转', '数据清洗'],
  alternates: { canonical: 'https://moretoolbox.com/tools/text-dedup' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "文本去重排序", "item": "https://moretoolbox.com/tools/text-dedup" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "文本去重排序 - MoreToolbox", "description": "按行去重、排序、反转 | Free online text dedup & sorting tool", "url": "https://moretoolbox.com/tools/text-dedup", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <TextDedupClient />
      </>
    )
}
