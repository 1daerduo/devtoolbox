import type { Metadata } from 'next'
import HtmlMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 在线压缩工具 | HTML Minifier - MoreToolbox',
  description: '在线 HTML 压缩/Minify 工具，一键去除注释、空白符和可选标签，压缩 HTML 代码体积。显示压缩率和字节数。免费、无需注册。 | Free online HTML minifier. Remove comments & whitespace, compress HTML instantly.',
  keywords: ['HTML压缩', 'HTML Minify', 'HTML压缩工具', '在线HTML压缩', 'HTML minifier'],
  alternates: { canonical: '/tools/html-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML 压缩", "item": "https://moretoolbox.com/tools/html-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 在线压缩工具 - MoreToolbox", "description": "在线压缩 HTML 代码，去除注释和空白符 | Free online HTML minifier", "url": "https://moretoolbox.com/tools/html-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HtmlMinifierClient />
      </>
    )
}
