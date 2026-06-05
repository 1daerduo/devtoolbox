import type { Metadata } from 'next'
import UUIDGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 UUID 生成器 - UUID v4 v7 批量生成 - DevToolbox',
  description: '在线 UUID 生成器，支持 UUID v4（随机）和 UUID v7（时间排序）版本，可批量生成多达 50 个，一键复制，开发必备工具。',
  keywords: 'UUID生成, UUID生成器, GUID生成, UUID v4, UUID v7, 在线UUID, 批量UUID, 唯一标识, 开发工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/uuid-generator' },
}

export default function Page() {
  return <UUIDGeneratorClient />
}
