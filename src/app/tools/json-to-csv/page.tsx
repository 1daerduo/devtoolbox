import type { Metadata } from 'next'
import JsonToCsvClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 转 CSV 在线转换工具 - DevToolbox',
  description: '免费在线 JSON 与 CSV 互相转换工具，支持嵌套 JSON 展开、自定义分隔符。开发者数据处理必备。',
  keywords: 'JSON转CSV, CSV转JSON, JSON to CSV, CSV to JSON, 数据格式转换, 在线转换工具',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/json-to-csv' },
}

export default function Page() {
  return <JsonToCsvClient />
}
