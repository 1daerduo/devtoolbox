import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Emoji 选择器 - 在线 Emoji 搜索复制工具 | MoreToolbox',
  description: '免费在线 Emoji 选择器与表情符号搜索工具，6 大分类浏览（笑脸/手势/动物/食物/交通/符号），关键词快速搜索，一键复制 Emoji 字符、HTML 实体代码或 CSS content 代码。适合开发者、社交媒体运营、内容创作者日常使用。 | Free online emoji picker with search and category browsing. Copy emoji as character, HTML entity or CSS code. Perfect for developers and content creators.',
  keywords: ['Emoji 选择器', 'Emoji 搜索', 'emoji picker', '在线表情符号', 'emoji 复制', 'Unicode emoji', 'emoji search copy', '表情符号工具'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/emoji-picker',
  },
}

export default function EmojiPickerPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Emoji 选择器", "item": "https://moretoolbox.com/tools/emoji-picker" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Emoji 选择器 - MoreToolbox", "description": "分类浏览搜索 Emoji，支持字符/HTML/CSS 多种复制格式 | Free online emoji picker with search", "url": "https://moretoolbox.com/tools/emoji-picker", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
