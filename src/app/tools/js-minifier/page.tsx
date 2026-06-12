import type { Metadata } from 'next'
import JsMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 在线压缩工具 | JS Minifier - MoreToolbox',
  description: '免费在线 JavaScript 压缩/Minify 工具，一键去除 JS 代码中的注释、空白符、换行符，压缩 JavaScript 代码体积。实时显示压缩前后大小对比和节省字节数。支持 ES6+ 语法，适合优化 Web 应用 JS Bundle 大小、减少页面加载时间，前端开发性能优化必备。 | Free online JavaScript minifier & compressor. Remove comments & whitespace from JS instantly. Shows compression ratio & saved bytes. ES6+ support. Essential for web performance optimization.',
  keywords: ['JS压缩', 'JavaScript压缩', 'JS Minify', '在线JS压缩', 'JavaScript minifier', 'JS最小化', 'JS compressor'],
  alternates: { canonical: 'https://moretoolbox.com/tools/js-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JS 压缩", "item": "https://moretoolbox.com/tools/js-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JavaScript 在线压缩工具 - MoreToolbox", "description": "在线压缩 JavaScript 代码，去除注释和空白符 | Free online JS minifier", "url": "https://moretoolbox.com/tools/js-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsMinifierClient />
      </>
    )
}
