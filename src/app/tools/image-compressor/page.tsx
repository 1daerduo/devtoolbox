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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "在线图片压缩会降低画质吗？", "acceptedAnswer": { "@type": "Answer", "text": "取决于压缩方式。PNG 使用无损压缩，不会降低画质但压缩率有限。JPG 和 WebP 使用有损压缩，质量设置越低文件越小但画质损失越明显。建议质量设为 80-90 之间，可在保持良好画质的同时显著减小文件体积。" } }, { "@type": "Question", "name": "图片压缩后能恢复原状吗？", "acceptedAnswer": { "@type": "Answer", "text": "PNG 无损压缩可以恢复原始数据。JPG/WebP 有损压缩是不可逆的，压缩后无法恢复丢弃的图像信息。建议压缩前保留原图备份，或下载时使用不同的文件名保存。" } }, { "@type": "Question", "name": "为什么上传图片后没有反应？", "acceptedAnswer": { "@type": "Answer", "text": "请确保图片格式为 PNG、JPG 或 WebP。单张图片最大支持 50MB。如果图片过大，浏览器可能需要较长时间处理，请耐心等待。所有处理在本地完成，不会上传到服务器。" } }] }),
          }}
        />
        <ImageCompressorClient />
      </>
    )
}
