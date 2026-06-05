import type { Metadata } from 'next'
import WordCountClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线字数统计工具 - 中文字符、英文单词、段落计数 - DevToolbox',
  description: '在线字数统计工具，实时统计文本总字符数、中文字符数、英文单词数、段落数、句子数、行数、数字个数、标点符号数，完全免费。',
  keywords: '字数统计, 字符统计, 在线字数统计, 统计字数, 中文字符统计, 英文单词统计, 段落计数, 文本统计',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/word-count' },
}

export default function Page() {
  return <WordCountClient />
}
