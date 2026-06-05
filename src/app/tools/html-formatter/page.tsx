import type { Metadata } from 'next'
import HtmlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 格式化工具 - 在线 HTML 美化压缩 - DevToolbox',
  description: '免费在线 HTML 格式化工具，支持 HTML 美化与压缩，自定义缩进，一键复制。适用于前端开发调试与生产环境优化。',
  keywords: 'HTML格式化, HTML美化, HTML压缩, HTML formatter, HTML minifier, 代码美化, 在线HTML工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/html-formatter' },
}

export default function Page() {
  return <HtmlFormatterClient />
}
