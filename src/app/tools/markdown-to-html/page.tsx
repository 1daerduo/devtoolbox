import type { Metadata } from 'next'
import MarkdownToHtmlClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Markdown 转 HTML - 在线 Markdown 转换工具 - DevToolbox',
  description: '免费在线 Markdown 转 HTML 工具，实时预览渲染效果，支持 GFM 语法扩展，一键复制 HTML 代码。博客写作、文档转换必备。',
  keywords: 'Markdown转HTML, Markdown to HTML, MD转HTML, Markdown渲染, 在线Markdown转换, GFM',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/markdown-to-html' },
}

export default function Page() {
  return <MarkdownToHtmlClient />
}
