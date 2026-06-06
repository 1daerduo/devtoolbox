import type { Metadata } from 'next'
import CaseConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线文本大小写转换工具 - 大写 小写 驼峰 蛇形等9种格式 - DevToolbox',
  description: '在线文本大小写转换，支持大写、小写、首字母大写、句首大写、驼峰camelCase、帕斯卡PascalCase、蛇形snake_case、短横kebab-case、常量CONSTANT_CASE，输入即出。',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "大小写转换 - DevToolbox", "description": "大写/小写/驼峰等9种格式", "url": "https://moretoolbox.com/tools/case-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <CaseConverterClient />
      </>
    )
}
