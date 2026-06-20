import type { Metadata } from 'next'
import FaviconGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Favicon 生成器 | 在线 Favicon 制作 - MoreToolbox',
  description: '上传图片生成全尺寸 Favicon（PNG 16/32/48/64/128/256px），一键下载 ZIP 打包。免费、无需注册，纯浏览器本地处理。',
  keywords: ['favicon生成器', 'favicon制作', 'ico图标', '网站图标生成'],
  alternates: { canonical: 'https://moretoolbox.com/tools/favicon-generator' },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Favicon 生成器", "item": "https://moretoolbox.com/tools/favicon-generator" }] }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Favicon 生成器 - MoreToolbox",
            "description": "上传图片生成全尺寸 Favicon",
            "url": "https://moretoolbox.com/tools/favicon-generator",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Favicon 生成器支持生成哪些尺寸？", "acceptedAnswer": { "@type": "Answer", "text": "本工具一键生成全尺寸 Favicon 包：16x16、32x32、48x48、64x64、128x128、256x256，覆盖主流浏览器、iOS Safari、Android Chrome 和 Windows 磁贴的全部需求。支持 PNG 格式，并以 ZIP 包形式一键下载。" } }, { "@type": "Question", "name": "上传的图片会被存储吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。图片处理和 Favicon 生成完全在您的浏览器本地完成，原始图片和生成的图标不会上传到任何服务器。关闭页面后所有数据自动清除，保护您的品牌资产安全。" } }, { "@type": "Question", "name": "推荐使用什么格式和尺寸的原始图片？", "acceptedAnswer": { "@type": "Answer", "text": "推荐上传至少 256x256 像素的 PNG 或 JPG 图片，建议使用正方形图片以避免裁剪变形。如果上传的图片不是正方形，工具会自动居中裁剪。对于品牌 Logo，建议使用透明背景的 PNG 格式以获得最佳效果。" } }] }),
        }}
      />
      <FaviconGeneratorClient />
    </>
  )
}
