import type { Metadata } from 'next'
import MarkdownEditorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 Markdown 编辑器 - 实时预览/导出 - MoreToolbox',
  description: '免费在线 Markdown 编辑器，支持实时预览、语法高亮，可导出为 HTML 或下载 .md 文件，完全在浏览器本地运行。 | Free online Markdown editor. Real-time preview, syntax highlighting. Export to HTML or download .md file. 100% browser-side.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Markdown 编辑器 - MoreToolbox", "description": "实时预览 Markdown 编辑器 | Free online Markdown editor", "url": "https://moretoolbox.com/tools/markdown-editor", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Markdown 编辑器有哪些功能？", "acceptedAnswer": { "@type": "Answer", "text": "本编辑器支持实时分屏预览、语法高亮显示、自动保存到浏览器本地存储、导出为 HTML 文件以及下载 .md 源文件。支持标准 Markdown 语法：标题、列表、链接、图片、代码块、表格、任务列表等，还支持 GFM（GitHub Flavored Markdown）扩展语法。" } }, { "@type": "Question", "name": "编辑的 Markdown 内容会保存到云端吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有编辑内容仅存储在您浏览器的 localStorage 中，不会上传到任何服务器。关闭浏览器后数据仍会保留（同一设备），但清除浏览器数据会导致内容丢失。如需长期保存，请下载 .md 文件到本地。" } }, { "@type": "Question", "name": "如何导出编辑好的 Markdown 文档？", "acceptedAnswer": { "@type": "Answer", "text": "两种方式导出：1）点击导出 HTML 按钮，将 Markdown 渲染为格式化的 HTML 网页文件；2）点击下载 .md 按钮，保存原始 Markdown 源文件。两种格式均可在本地离线使用。" } }] }),
          }}
        />
        <MarkdownEditorClient />
      </>
    )
}
