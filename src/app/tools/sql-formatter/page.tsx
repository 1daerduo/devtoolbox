import type { Metadata } from 'next'
import SqlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SQL 在线格式化美化工具 - DevToolbox',
  description: '免费在线 SQL 格式化、压缩、美化工具。支持 MySQL/PostgreSQL/SQLite/T-SQL 等多种方言，自定义缩进与大小写。开发者必备。',
  keywords: ['SQL格式化', 'SQL formatter', 'SQL美化', 'SQL beautifier', 'SQL压缩', '数据库工具', 'SQL格式化在线'],
  alternates: { canonical: 'https://moretoolbox.com/tools/sql-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "SQL 格式化", "item": "https://moretoolbox.com/tools/sql-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SQL 格式化 - DevToolbox", "description": "SQL 美化与压缩", "url": "https://moretoolbox.com/tools/sql-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <SqlFormatterClient />
      </>
    )
}
