import type { Metadata } from 'next'
import ImageCompressorClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线图片压缩工具 - 无损压缩PNG/JPG/WebP - MoreToolbox',
  description: '免费在线图片压缩工具，支持 PNG、JPG、WebP 格式，调节压缩质量，预览压缩效果，完全在浏览器本地处理，不上传服务器，安全快速。 | Free online image compressor. Supports PNG, JPG, WebP. Adjust quality, preview result. 100% browser-side, no upload, fast & secure.',
  keywords: ['图片压缩', '在线压缩', 'PNG压缩', 'JPG压缩', 'WebP压缩', '图片优化', '减小图片体积', '前端压缩'],
  alternates: { canonical: 'https://moretoolbox.com/tools/image-compressor' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "图片压缩", "item": "https://moretoolbox.com/tools/image-compressor" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "图片压缩 - MoreToolbox", "description": "在线压缩 PNG/JPG/WebP | Free online image compressor", "url": "https://moretoolbox.com/tools/image-compressor", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ImageCompressorClient />
      </>
    )
}
