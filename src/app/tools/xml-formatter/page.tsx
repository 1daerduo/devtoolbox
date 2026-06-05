import type { Metadata } from 'next'
import XmlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'XML 在线格式化工具 - DevToolbox',
  description: '免费在线 XML 格式化、压缩、验证工具，支持语法高亮和缩进自定义。开发者必备的 XML 美化工具。',
  keywords: 'XML格式化, XML formatter, XML压缩, XML验证, 在线XML工具, XML beautifier',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/xml-formatter' },
}

export default function Page() {
  return <XmlFormatterClient />
}
