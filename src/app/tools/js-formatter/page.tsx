import type { Metadata } from 'next'
import JsFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 格式化工具 - 在线 JS 美化压缩 - DevToolbox',
  description: '免费在线 JavaScript 格式化工具，支持 JS 代码美化与压缩，自定义缩进，一键复制。前端开发调试与代码优化必备。',
  keywords: 'JS格式化, JavaScript美化, JS压缩, JS minifier, JavaScript formatter, 代码美化, 在线JS工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/js-formatter' },
}

export default function Page() {
  return <JsFormatterClient />
}
