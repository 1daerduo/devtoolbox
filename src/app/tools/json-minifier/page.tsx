import type { Metadata } from 'next'
import JsonMinifierClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 在线压缩工具 | JSON Minifier - MoreToolbox',
  description: '免费在线 JSON 压缩/Minify 工具，一键去除 JSON 数据中的空白符、换行符和缩进，大幅压缩 JSON 数据体积。实时显示压缩前后大小对比和压缩率百分比。支持 JSON 语法验证，输入无效 JSON 自动提示错误位置。适合优化 API 响应大小、减少网络传输带宽，开发者日常必备工具。 | Free online JSON minifier & compressor. Remove whitespace, newlines & indent instantly. Shows compression ratio & saved bytes. JSON validation included. Essential for API optimization.',
  keywords: ['JSON压缩', 'JSON Minify', 'JSON压缩工具', '在线JSON压缩', 'JSON minifier', 'JSON最小化', 'JSON compressor'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-minifier' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON 压缩", "item": "https://moretoolbox.com/tools/json-minifier" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON 在线压缩工具 - MoreToolbox", "description": "在线压缩 JSON 数据，去除空白符和换行 | Free online JSON minifier", "url": "https://moretoolbox.com/tools/json-minifier", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <JsonMinifierClient />
      </>
    )
}
