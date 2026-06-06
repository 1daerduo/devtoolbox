import type { Metadata } from 'next'
import SvgToPngClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SVG 转 PNG 在线转换器 - DevToolbox',
  description: '在线将 SVG 矢量图转换为 PNG 位图，支持自定义输出尺寸和背景色，纯浏览器端处理，无需上传文件，保护数据安全。',
  keywords: ['SVG转PNG', 'SVG转换', '矢量图转位图', 'SVG to PNG', 'SVG导出', '图片转换'],
  alternates: { canonical: '/tools/svg-to-png' },
}

export default function Page() {
  return <SvgToPngClient />
}
