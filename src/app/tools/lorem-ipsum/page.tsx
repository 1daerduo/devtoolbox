import type { Metadata } from 'next'
import LoremIpsumClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Lorem Ipsum 生成器 - 在线占位文本生成工具 - DevToolbox',
  description: '免费在线 Lorem Ipsum 占位文本生成器，支持中文占位文本、英文 Lorem Ipsum，自定义段落数和字数，前端开发必备。',
  keywords: 'Lorem Ipsum, 占位文本, 假文生成, 中文占位文本, placeholder text, 随机文本生成, 网页占位符',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/lorem-ipsum' },
}

export default function Page() {
  return <LoremIpsumClient />
}
