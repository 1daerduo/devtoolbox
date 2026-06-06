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
        <MarkdownToHtmlClient />
      </>
    )
}
