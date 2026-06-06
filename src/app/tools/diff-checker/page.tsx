import type { Metadata } from 'next'
import DiffCheckerClient from './ToolClient'

export const metadata: Metadata = {
  title: '文本差异对比工具 - 在线 Diff Checker - DevToolbox',
  description: '免费在线文本差异对比工具，左右并排对比两个文本内容，高亮显示新增、删除、修改行。支持代码 diff、文档对比等多种场景。',
  keywords: ['文本对比', 'diff checker', '代码差异', 'text diff', '文本比较', '在线diff工具', '代码对比'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/diff-checker' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "文本差异对比", "item": "https://devtoolbox-61u.pages.dev/tools/diff-checker" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "文本差异对比 - DevToolbox", "description": "在线 Diff Checker", "url": "https://devtoolbox-61u.pages.dev/tools/diff-checker", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <DiffCheckerClient />
      </>
    )
}
