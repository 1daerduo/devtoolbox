import type { Metadata } from 'next'
import HtmlToMarkdownClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 转 Markdown 工具 | HTML to Markdown Converter - MoreToolbox',
  description: '免费在线 HTML 转 Markdown 工具，将 HTML 代码一键转换为 Markdown 格式。支持表格、代码块、列表、链接、图片等元素，保留格式完整性。文档迁移、内容编辑必备工具。 | Free online HTML to Markdown converter. Convert HTML to Markdown format instantly. Supports tables, code blocks, lists, links, images.',
  keywords: ['HTML转Markdown', 'HTML to Markdown', 'Markdown转换', 'HTML2MD', 'HTML to MD', '在线转换', '文档格式转换'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-to-markdown' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML 转 Markdown", "item": "https://moretoolbox.com/tools/html-to-markdown" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 转 Markdown 工具 - MoreToolbox", "description": "将 HTML 代码转换为 Markdown 格式 | Convert HTML to Markdown format", "url": "https://moretoolbox.com/tools/html-to-markdown", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HtmlToMarkdownClient />
      </>
    )
}
