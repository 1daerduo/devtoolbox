import type { Metadata } from 'next'
import HtmlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 格式化工具 - 在线 HTML 美化压缩 - MoreToolbox',
  description: '免费在线 HTML 格式化工具，支持 HTML 美化与压缩，自定义缩进，一键复制。适用于前端开发调试与生产环境优化。 | Free online HTML formatter and minifier. Custom indentation, one-click copy. Front-end development essential.',
  keywords: ['HTML格式化', 'HTML美化', 'HTML压缩', 'HTML formatter', 'HTML minifier', '代码美化', '在线HTML工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML 格式化", "item": "https://moretoolbox.com/tools/html-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 格式化 - MoreToolbox", "description": "HTML 代码美化与压缩 | Free online HTML formatter and minifier", "url": "https://moretoolbox.com/tools/html-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HtmlFormatterClient />
      </>
    )
}
