import type { Metadata } from 'next'
import ColorConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线颜色转换工具 - HEX RGB HSL 互转 - DevToolbox',
  description: '在线颜色格式转换工具，支持 HEX 十六进制、RGB、HSL 三种颜色格式互相转换，实时预览颜色效果，前端开发必备工具。',
  keywords: '颜色转换, HEX转RGB, RGB转HEX, RGB转HSL, 十六进制颜色, 颜色格式转换, 在线取色, 前端工具, 颜色预览',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/color-converter' },
}

export default function Page() {
  return <ColorConverterClient />
}
