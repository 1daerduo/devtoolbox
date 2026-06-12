import type { Metadata } from 'next'
import CssMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS 在线压缩工具 | CSS Minifier - MoreToolbox',
  description: '免费在线 CSS 压缩/Minify 工具，一键去除 CSS 代码中的注释、空白符、换行符和冗余分号，大幅压缩 CSS 文件体积。实时显示压缩前后大小对比和压缩率百分比，支持粘贴输入和上传 .css 文件。前端开发优化页面加载速度、减少 CSS 传输带宽的必备工具。 | Free online CSS minifier & compressor. Remove comments, whitespace & redundancies from CSS instantly. Shows compression ratio & saved bytes. Essential for frontend optimization.',
  keywords: ['CSS压缩', 'CSS Minify', 'CSS压缩工具', '在线CSS压缩', 'CSS minifier', 'CSS最小化', 'CSS compressor'],
  alternates: { canonical: 'https://moretoolbox.com/tools/css-minifier' },
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
