import type { Metadata } from 'next'
import MarkdownToHtmlClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Markdown 转 HTML - 在线 Markdown 转换工具 - MoreToolbox',
  description: '免费在线 Markdown 转 HTML 工具，实时预览渲染效果，支持 GFM 语法扩展，一键复制 HTML 代码。博客写作、文档转换必备。 | Free online Markdown to HTML converter. Real-time preview, GFM syntax support. One-click HTML copy. Blog & documentation essential.',
  keywords: ['Markdown转HTML', 'Markdown to HTML', 'MD转HTML', 'Markdown渲染', '在线Markdown转换', 'GFM'],
  alternates: { canonical: 'https://moretoolbox.com/tools/markdown-to-html' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Markdown 转 HTML", "item": "https://moretoolbox.com/tools/markdown-to-html" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markdown 转 HTML - MoreToolbox", "description": "Markdown 转换为 HTML 代码 | Free online Markdown to HTML converter", "url": "https://moretoolbox.com/tools/markdown-to-html", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 Markdown？", "acceptedAnswer": { "@type": "Answer", "text": "Markdown 是一种轻量级标记语言，用简单的符号表示格式（如 # 表示标题，** 表示加粗）。它易读易写，广泛用于博客、文档、README、论坛等。本工具可将 Markdown 实时转换为 HTML 代码。" } }, { "@type": "Question", "name": "Markdown 支持哪些语法？", "acceptedAnswer": { "@type": "Answer", "text": "Markdown 支持标题（#）、加粗（**bold**）、斜体（*italic*）、链接、图片、列表、代码块、引用、表格、分割线等。GFM 还支持任务列表、删除线、自动链接等扩展语法。" } }, { "@type": "Question", "name": "GFM 和标准 Markdown 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "GFM（GitHub Flavored Markdown）是 GitHub 扩展的 Markdown 变体，增加了表格、任务列表（- [x]）、删除线（~~text~~）、自动链接、代码围栏等功能。本工具支持 GFM 语法。" } }] }),
          }}
        />
        <MarkdownToHtmlClient />
      </>
    )
}
