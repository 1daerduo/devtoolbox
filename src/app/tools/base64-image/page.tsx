import type { Metadata } from 'next'
import Base64ImageClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 图片互转 - 在线 Image Base64 编解码 - MoreToolbox',
  description: '免费在线 Base64 与图片互转工具，支持图片转 Base64 编码、Base64 解码为图片，支持 PNG/JPG/WebP/SVG 等格式，无需上传服务器。 | Free online Base64 ↔ Image converter. Supports PNG, JPG, WebP, SVG formats. No file upload to server, fully private.',
  keywords: ['Base64图片', '图片转Base64', 'Base64转图片', 'image to base64', 'base64 to image', '图片编码', 'Data URL'],
  alternates: { canonical: 'https://moretoolbox.com/tools/base64-image' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Base64 图片互转", "item": "https://moretoolbox.com/tools/base64-image" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Base64 图片互转 - MoreToolbox", "description": "图片与 Base64 编码互转 | Free online Base64 ↔ Image converter", "url": "https://moretoolbox.com/tools/base64-image", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Base64 编码后图片会变大吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的。Base64 编码会使数据体积增加约 33%。例如一张 100KB 的 PNG 图片，Base64 编码后约 133KB。这是因为 Base64 将每 3 个字节编码为 4 个字符。建议仅对小图标或内联图片使用 Base64，大图仍应使用 URL 引用。" } }, { "@type": "Question", "name": "Base64 图片可以用在 CSS 中吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。Base64 编码的图片可以直接用在 CSS 的 background-image 属性或 HTML 的 img 标签 src 属性中，格式为 data:image/{type};base64,{data}。这种方式减少 HTTP 请求，适合小图标和装饰性图片。" } }, { "@type": "Question", "name": "转换过程会上传我的图片吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有图片和 Base64 之间的转换完全在您的浏览器本地执行，图片数据不会上传到任何服务器，您的隐私和数据安全得到保障。" } }] }),
          }}
        />
        <Base64ImageClient />
      </>
    )
}
