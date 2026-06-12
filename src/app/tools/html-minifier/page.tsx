import type { Metadata } from 'next'
import HtmlMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 在线压缩工具 | HTML Minifier - MoreToolbox',
  description: '免费在线 HTML 压缩/Minify 工具，一键去除 HTML 代码中的注释、空白符、换行符和可选闭合标签，大幅压缩 HTML 文件体积。实时显示压缩前后大小对比和压缩率百分比。适合优化网站 HTML 页面大小、减少首次内容绘制（FCP）时间，SEO 和前端性能优化必备。 | Free online HTML minifier & compressor. Remove comments, whitespace & optional tags from HTML instantly. Shows compression ratio. Essential for page speed & SEO optimization.',
  keywords: ['HTML压缩', 'HTML Minify', 'HTML压缩工具', '在线HTML压缩', 'HTML minifier', 'HTML最小化', 'HTML compressor'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-minifier' },
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
