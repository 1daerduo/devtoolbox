import type { Metadata } from 'next'
import DiffCheckerClient from './ToolClient'

export const metadata: Metadata = {
  title: '文本差异对比工具 - 在线 Diff Checker - DevToolbox',
  description: '免费在线文本差异对比工具，左右并排对比两个文本内容，高亮显示新增、删除、修改行。支持代码 diff、文档对比等多种场景。',
  keywords: '文本对比, diff checker, 代码差异, text diff, 文本比较, 在线diff工具, 代码对比',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/diff-checker' },
}

export default function Page() {
  return <DiffCheckerClient />
}
