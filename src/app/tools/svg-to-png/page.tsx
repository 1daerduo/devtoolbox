import type { Metadata } from 'next'
import SvgToPngClient from './ToolClient'

export const metadata: Metadata = {
  title: 'SVG 转 PNG 在线转换器 | SVG to PNG Converter Online - MoreToolbox',
  description: '在线将 SVG 矢量图转换为 PNG 位图，支持自定义输出尺寸和背景色，纯浏览器端处理，无需上传文件，保护数据安全。 | Free online SVG to PNG converter. Custom output size & background color. Pure browser-side processing, no file upload, secure.',
  keywords: ['SVG转PNG', 'SVG转换', '矢量图转位图', 'SVG to PNG', 'SVG导出', '图片转换'],
  alternates: { canonical: 'https://moretoolbox.com/tools/svg-to-png' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "SVG 转 PNG", "item": "https://moretoolbox.com/tools/svg-to-png" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SVG 转 PNG - MoreToolbox", "description": "SVG 矢量图转 PNG 位图 | Free online SVG to PNG converter", "url": "https://moretoolbox.com/tools/svg-to-png", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "为什么要将 SVG 转换为 PNG？", "acceptedAnswer": { "@type": "Answer", "text": "SVG 是矢量格式，适合网页展示，但某些场景需要 PNG 位图：社交媒体分享（微信/微博不支持 SVG）、邮件签名中的图片、Word/PPT 文档插入、应用图标等。PNG 格式兼容性更好，几乎所有平台都原生支持。" } }, { "@type": "Question", "name": "转换后图片质量会下降吗？", "acceptedAnswer": { "@type": "Answer", "text": "取决于输出尺寸设置。如果输出尺寸大于或等于原始 SVG 的 viewBox 尺寸，图片保持清晰。如果缩小输出，由于 PNG 是位图格式，放大后可能出现锯齿。建议根据实际使用场景设置合适的输出尺寸（如 512x512 用于图标）。" } }, { "@type": "Question", "name": "SVG 文件会上传到服务器吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。转换过程完全在浏览器端使用 Canvas API 完成，SVG 源文件和生成的 PNG 都不会上传到任何服务器。您的设计稿和数据始终保持私密安全。" } }] }),
          }}
        />
        <SvgToPngClient />
      </>
    )
}
