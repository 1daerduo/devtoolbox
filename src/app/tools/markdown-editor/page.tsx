import type { Metadata } from 'next'
import MarkdownEditorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 Markdown 编辑器 - 实时预览/导出 - DevToolbox',
  description: '免费在线 Markdown 编辑器，支持实时预览、语法高亮，可导出为 HTML 或下载 .md 文件，完全在浏览器本地运行。',
  keywords: ['Markdown编辑器', '在线Markdown', 'MD编辑器', '实时预览', 'Markdown转HTML', '导出Markdown'],
  alternates: { canonical: 'https://moretoolbox.com/tools/markdown-editor' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Markdown 编辑器", "item": "https://moretoolbox.com/tools/markdown-editor" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markdown 编辑器 - DevToolbox", "description": "实时预览 Markdown 编辑器", "url": "https://moretoolbox.com/tools/markdown-editor", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <MarkdownEditorClient />
      </>
    )
}
