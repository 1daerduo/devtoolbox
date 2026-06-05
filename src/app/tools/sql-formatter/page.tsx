import type { Metadata } from 'next'
import SqlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SQL 在线格式化美化工具 - DevToolbox',
  description: '免费在线 SQL 格式化、压缩、美化工具。支持 MySQL/PostgreSQL/SQLite/T-SQL 等多种方言，自定义缩进与大小写。开发者必备。',
  keywords: 'SQL格式化, SQL formatter, SQL美化, SQL beautifier, SQL压缩, 数据库工具, SQL格式化在线',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/sql-formatter' },
}

export default function Page() {
  return <SqlFormatterClient />
}
