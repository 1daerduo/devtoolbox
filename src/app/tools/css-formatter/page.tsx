import type { Metadata } from 'next'
import CssFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 CSS 格式化工具 - 美化/压缩 CSS 代码 - DevToolbox',
  description: '免费在线 CSS 格式化工具，支持 CSS 代码美化、压缩、一键复制，完全在浏览器本地处理，无需上传。',
  keywords: 'CSS格式化, CSS美化, CSS压缩, CSS Beautify, CSS Minify, 在线CSS工具, 代码格式化',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/css-formatter' },
}

export default function Page() {
  return <CssFormatterClient />
}
