import type { Metadata } from 'next'
import JsonFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 在线格式化工具 - DevToolbox',
  description: '在线 JSON 数据格式化、压缩、验证工具，支持语法高亮显示和多种缩进模式。免费、无需注册，开发者必备。',
  keywords: ['JSON格式化', 'JSON压缩', 'JSON验证', '在线JSON工具', 'JSON formatter'],
  alternates: { canonical: '/tools/json-formatter' },
}

export default function Page() {
  return <JsonFormatterClient />
}
