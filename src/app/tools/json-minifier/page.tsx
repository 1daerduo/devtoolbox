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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON 压缩能减少多少体积？", "acceptedAnswer": { "@type": "Answer", "text": "压缩效果取决于原始 JSON 的缩进和空格量。典型情况下，格式化 JSON 压缩后可减少 30-50% 的体积。对于 API 响应数据，压缩 JSON 可显著降低网络传输带宽消耗，尤其在高并发场景下效果明显。工具会实时显示压缩前后大小对比和压缩率。" } }, { "@type": "Question", "name": "JSON 压缩和 Gzip 压缩有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 压缩（Minify）是去除空白符和换行的文本级优化，Gzip 是传输层的二进制压缩。两者互补：Minify 后的 JSON 配合 Gzip 可获得最佳的压缩效果。对于 API 开发，建议服务端同时开启 JSON Minify 和 Gzip 压缩。" } }, { "@type": "Question", "name": "压缩后的 JSON 还能格式化回来吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。只要原始 JSON 语法正确，压缩不会丢失任何数据或结构信息。压缩仅去除空白符和换行，JSON 的键值对、数组、嵌套结构完全保留。如需恢复可读格式，使用本网站的 JSON 格式化工具一键美化即可。" } }] }),
          }}
        />
        <JsonMinifierClient />
      </>
    )
}
