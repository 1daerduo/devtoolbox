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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "图片格式转换会降低画质吗？", "acceptedAnswer": { "@type": "Answer", "text": "取决于目标格式。PNG 是无损格式，转 PNG 不损失质量；WebP 支持有损和无损两种模式，建议有损模式质量设为 80% 以上以保持视觉效果；JPG 是有损格式，重复转换会累积损失。建议从高质量源文件开始转换，避免 JPG→JPG 的多次转换。" } }, { "@type": "Question", "name": "上传的图片会被存储或泄露吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有图片处理完全在您浏览器本地使用 Canvas API 完成，原始文件和转换结果均不上传到任何服务器。处理完成后关闭页面即可清除全部数据，非常适合处理敏感图片或公司内部素材。" } }, { "@type": "Question", "name": "支持哪些图片格式互转？", "acceptedAnswer": { "@type": "Answer", "text": "支持 JPG、PNG、WebP、BMP 四种常见格式的互相转换。WebP 格式可显著减小文件体积（通常比 JPG 小 25-35%），适合网站性能优化。PNG 支持透明背景保留，适合图标和 Logo 格式转换。" } }] }),
          }}
        />
        <ImageConverterClient />
      </>
    )
}
