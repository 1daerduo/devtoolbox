import type { Metadata } from 'next'
import HashGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线哈希 Hash 生成工具 - MD5, SHA-1, SHA-256, SHA-512 - DevToolbox',
  description: '在线哈希值生成工具，支持 MD5、SHA-1、SHA-256、SHA-512 算法，数据在浏览器本地计算，不上传服务器，安全可靠。',
  keywords: 'MD5生成, SHA1生成, SHA256生成, SHA512生成, 哈希生成, Hash生成, 在线MD5, 在线SHA, 哈希计算, 加密工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/hash-generator' },
}

export default function Page() {
  return <HashGeneratorClient />
}
