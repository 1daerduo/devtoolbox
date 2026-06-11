import type { Metadata } from 'next'
import CssMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS 在线压缩工具 | CSS Minifier - MoreToolbox',
  description: '在线 CSS 压缩/Minify 工具，一键去除注释、空白符和换行，压缩 CSS 代码体积。显示压缩率和字节数。免费、无需注册。 | Free online CSS minifier. Remove comments & whitespace, compress CSS instantly.',
  keywords: ['CSS压缩', 'CSS Minify', 'CSS压缩工具', '在线CSS压缩', 'CSS minifier'],
  alternates: { canonical: '/tools/css-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS 压缩", "item": "https://moretoolbox.com/tools/css-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS 在线压缩工具 - MoreToolbox", "description": "在线压缩 CSS 代码，去除注释和空白符 | Free online CSS minifier", "url": "https://moretoolbox.com/tools/css-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <CssMinifierClient />
      </>
    )
}
