import type { Metadata } from 'next'
import ImageConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线图片格式转换 - JPG/PNG/WebP 互转 - MoreToolbox',
  description: '免费在线图片格式转换工具，支持 JPG、PNG、WebP、BMP 格式互转，纯浏览器端处理，无需上传服务器，保护数据隐私。 | Free online image format converter. JPG, PNG, WebP, BMP mutual conversion. Pure browser-side, no upload, private & secure.',
  keywords: ['图片格式转换', 'JPG转PNG', 'PNG转WebP', 'WebP转JPG', '图片转换器', '格式互转', '在线转换图片'],
  alternates: { canonical: 'https://moretoolbox.com/tools/image-converter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "图片格式转换", "item": "https://moretoolbox.com/tools/image-converter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "图片格式转换 - MoreToolbox", "description": "JPG/PNG/WebP 格式互转 | Free online image format converter", "url": "https://moretoolbox.com/tools/image-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ImageConverterClient />
      </>
    )
}
