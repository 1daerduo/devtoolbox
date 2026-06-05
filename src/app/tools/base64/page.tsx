import type { Metadata } from 'next'
import Base64Client from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 在线编解码工具 - DevToolbox',
  description: '在线 Base64 编码解码工具，支持 UTF-8 中文，一键交换输入输出。免费、无需注册，数据纯前端处理，安全放心。',
  keywords: ['Base64编码', 'Base64解码', '在线Base64', 'Base64转换', 'base64 encoder', 'base64 decoder'],
  alternates: { canonical: '/tools/base64' },
}

export default function Page() {
  return <Base64Client />
}
