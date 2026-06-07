import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'UUID 解码器 - 在线解析 UUID 版本/时间戳/节点信息 | MoreToolbox',
  description: '免费在线 UUID 解码工具，支持 UUID v1-v7 全部版本，解析 UUID 结构：版本号、变体、时间戳、时钟序列、节点 ID 等。100% 浏览器本地处理。',
  keywords: ['UUID 解码器', 'UUID decoder', 'UUID 解析', 'UUID 版本', 'UUID 时间戳', 'UUID v1 v4 v7', '在线 UUID 工具', 'uuid parse online'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/uuid-decoder',
  },
}

export default function UuidDecoderPage() {
  return <ToolClient />
}
