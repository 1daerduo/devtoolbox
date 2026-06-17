import type { Metadata } from 'next'
import SqlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SQL 在线格式化美化工具 | SQL Formatter & Beautifier - MoreToolbox',
  description: '免费在线 SQL 格式化、压缩、美化工具。支持 MySQL/PostgreSQL/SQLite/T-SQL 等多种方言，自定义缩进与大小写。开发者必备。 | Free online SQL formatter, beautifier. Supports MySQL, PostgreSQL, SQLite, T-SQL dialects. Custom indentation & casing.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SQL 格式化 - MoreToolbox", "description": "SQL 美化与压缩 | Free online SQL formatter, beautifier", "url": "https://moretoolbox.com/tools/sql-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "SQL 格式化会影响查询性能吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。SQL 格式化只是调整代码的缩进、换行和大小写，不改变语句的逻辑语义。数据库引擎在执行前会解析 SQL，格式化后的 SQL 和压缩的 SQL 执行效果完全一致。" } }, { "@type": "Question", "name": "支持哪些 SQL 方言？", "acceptedAnswer": { "@type": "Answer", "text": "本工具支持多种主流 SQL 方言，包括 MySQL、PostgreSQL、SQLite、Transact-SQL（T-SQL）、PL/SQL 等。不同方言在函数名和语法上有细微差异，选择正确的方言可以获得更准确的格式化结果。" } }, { "@type": "Question", "name": "SQL 压缩有什么用？", "acceptedAnswer": { "@type": "Answer", "text": "SQL 压缩将格式化的 SQL 代码去除多余空格、换行和缩进，转换为单行紧凑格式。适用于减小 SQL 语句体积、嵌入代码字符串、或传输场景中节省带宽。压缩后不影响查询逻辑。" } }] }),
          }}
        />
        <SqlFormatterClient />
      </>
    )
}
