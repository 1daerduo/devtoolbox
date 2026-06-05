import type { Metadata } from 'next'
import ImageCompressorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线图片压缩工具 - 无损压缩PNG/JPG/WebP - DevToolbox',
  description: '免费在线图片压缩工具，支持 PNG、JPG、WebP 格式，调节压缩质量，预览压缩效果，完全在浏览器本地处理，不上传服务器，安全快速。',
  keywords: '图片压缩, 在线压缩, PNG压缩, JPG压缩, WebP压缩, 图片优化, 减小图片体积, 前端压缩',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/image-compressor' },
}

export default function Page() {
  return <ImageCompressorClient />
}
