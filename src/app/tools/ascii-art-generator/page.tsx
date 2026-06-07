import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'ASCII 艺术字生成器 - 在线文字转 ASCII Art 工具 | MoreToolbox',
  description: '免费在线 ASCII 艺术字生成器，将文字转换为 ASCII 字符画。支持多种字体风格(Standard/Doom/Slant/Shadow 等)，一键复制到代码注释或社交媒体。',
  keywords: ['ASCII 艺术字', 'ASCII art generator', '文字转ASCII', '字符画生成', 'FIGlet', 'ASCII 字体', 'text to ascii art', '字符艺术'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/ascii-art-generator',
  },
}

export default function AsciiArtGeneratorPage() {
  return <ToolClient />
}
