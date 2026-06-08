import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '图片尺寸调整 - 在线图片缩放裁剪工具 | MoreToolbox',
  description: '免费在线图片尺寸调整与缩放工具，支持按像素精确指定宽高或按百分比缩放，可锁定宽高比防止变形。输出格式支持 PNG/JPEG/WebP，适合社交媒体配图、网页素材、电商产品图等场景。纯浏览器端 Canvas 处理，图片不会上传服务器，保护隐私安全。 | Free online image resizer. Resize by pixels or percentage, lock aspect ratio. Output PNG/JPEG/WebP. Perfect for social media, web assets. 100% browser-side, private & secure.',
  keywords: ['图片尺寸调整', '图片缩放', '在线图片裁剪', 'image resizer', '在线改图片大小', '图片压缩尺寸', 'image resize online', '免费图片工具'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/image-resizer',
  },
}

export default function ImageResizerPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "图片尺寸调整", "item": "https://moretoolbox.com/tools/image-resizer" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "图片尺寸调整 - MoreToolbox", "description": "在线图片缩放调整尺寸，支持像素/百分比/Png/JPEG/WebP 输出 | Free online image resize tool", "url": "https://moretoolbox.com/tools/image-resizer", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
