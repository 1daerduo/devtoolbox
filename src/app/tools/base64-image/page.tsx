import type { Metadata } from 'next'
import Base64ImageClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 图片互转 - 在线 Image Base64 编解码 - DevToolbox',
  description: '免费在线 Base64 与图片互转工具，支持图片转 Base64 编码、Base64 解码为图片，支持 PNG/JPG/WebP/SVG 等格式，无需上传服务器。',
  keywords: 'Base64图片, 图片转Base64, Base64转图片, image to base64, base64 to image, 图片编码, Data URL',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/base64-image' },
}

export default function Page() {
  return <Base64ImageClient />
}
