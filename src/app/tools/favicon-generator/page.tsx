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
      <FaviconGeneratorClient />
    </>
  )
}
