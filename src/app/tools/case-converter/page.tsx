import type { Metadata } from 'next'
import CaseConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线文本大小写转换工具 - 大写 小写 驼峰 蛇形等9种格式 - MoreToolbox',
  description: '在线文本大小写转换，支持大写、小写、首字母大写、句首大写、驼峰camelCase、帕斯卡PascalCase、蛇形snake_case、短横kebab-case、常量CONSTANT_CASE，输入即出。 | Free online text case converter. UPPERCASE, lowercase, Title Case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, sentence case.',
  keywords: ['大小写转换', '文本转换', '驼峰转换', '蛇形转换', 'camelCase', 'snake_case', '大写转小写', '小写转大写', '命名转换'],
  alternates: { canonical: 'https://moretoolbox.com/tools/case-converter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "大小写转换", "item": "https://moretoolbox.com/tools/case-converter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "大小写转换 - MoreToolbox", "description": "大写/小写/驼峰等9种格式 | Free online text case converter", "url": "https://moretoolbox.com/tools/case-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "camelCase 和 PascalCase 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "camelCase（小驼峰）首字母小写，如 myVariableName。PascalCase（大驼峰）首字母大写，如 MyClassName。JavaScript 变量用 camelCase，Java/C# 类名用 PascalCase。本工具一键转换两种格式。" } }, { "@type": "Question", "name": "snake_case 和 kebab-case 用在什么场景？", "acceptedAnswer": { "@type": "Answer", "text": "snake_case（蛇形）用下划线连接，如 user_name，常用于 Python、Ruby 变量命名和数据库字段名。kebab-case（短横线）用连字符连接，如 my-component，常用于 CSS 类名、HTML 标签属性、URL 路径。" } }, { "@type": "Question", "name": "编程中常用的命名规范有哪些？", "acceptedAnswer": { "@type": "Answer", "text": "常见命名规范：camelCase（JS变量）、PascalCase（类名）、snake_case（Python/DB）、kebab-case（CSS/URL）、CONSTANT_CASE（常量）、UPPERCASE（宏定义）、Title Case（标题）。本工具支持 9 种格式互转。" } }] }),
          }}
        />
        <CaseConverterClient />
      </>
    )
}
