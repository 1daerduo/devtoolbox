import type { Metadata } from 'next'
import TextDedupClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线文本去重排序工具 - 按行去重、排序、反转 - DevToolbox',
  description: '在线文本去重排序工具，支持按行去重、升序排序、降序排序、反转、去空行、去空格，适合处理名单列表日志等文本数据。',
  keywords: '文本去重, 文本排序, 去重工具, 按行去重, 列表去重, 文本处理, 文本反转, 数据清洗',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/text-dedup' },
}

export default function Page() {
  return <TextDedupClient />
}
