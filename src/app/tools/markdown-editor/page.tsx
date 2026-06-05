import type { Metadata } from 'next'
import MarkdownEditorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 Markdown 编辑器 - 实时预览/导出 - DevToolbox',
  description: '免费在线 Markdown 编辑器，支持实时预览、语法高亮，可导出为 HTML 或下载 .md 文件，完全在浏览器本地运行。',
  keywords: 'Markdown编辑器, 在线Markdown, MD编辑器, 实时预览, Markdown转HTML, 导出Markdown',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/markdown-editor' },
}

export default function Page() {
  return <MarkdownEditorClient />
}
