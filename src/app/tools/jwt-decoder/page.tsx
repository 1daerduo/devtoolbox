import type { Metadata } from 'next'
import JwtDecoderClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JWT 在线解码工具 - DevToolbox',
  description: '免费在线 JWT Token 解码工具，支持 HS256/RS256 等多种算法，解析 Header 和 Payload，验证签名。无需注册，开发者必备。',
  keywords: 'JWT解码, JWT decoder, JSON Web Token, JWT解析, token decode, 在线JWT工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/jwt-decoder' },
}

export default function Page() {
  return <JwtDecoderClient />
}
