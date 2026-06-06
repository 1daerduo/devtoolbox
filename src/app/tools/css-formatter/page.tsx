import type { Metadata } from 'next'
import CssFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 CSS 格式化工具 - 美化/压缩 CSS 代码 - MoreToolbox',
  description: '免费在线 CSS 格式化工具，支持 CSS 代码美化、压缩、一键复制，完全在浏览器本地处理，无需上传。 | Free online CSS formatter and minifier. Beautify compressed CSS, customize indentation. Pure browser-side processing.',
  keywords: ['CSS格式化', 'CSS美化', 'CSS压缩', 'CSS Beautify', 'CSS Minify', '在线CSS工具', '代码格式化'],
  alternates: { canonical: 'https://moretoolbox.com/tools/css-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS 格式化", "item": "https://moretoolbox.com/tools/css-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS 格式化 - MoreToolbox", "description": "CSS 美化与压缩 | Free online CSS formatter and minifier", "url": "https://moretoolbox.com/tools/css-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <CssFormatterClient />
      </>
    )
}
