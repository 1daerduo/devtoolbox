import type { Metadata } from 'next'
import WebManifestClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Web Manifest 生成器 | PWA 配置生成 - MoreToolbox',
  description: '可视化生成 PWA manifest.json，配置图标/名称/主题色/显示模式，一键下载配置文件。免费、无需注册，纯浏览器本地处理。',
  keywords: ['web manifest', 'PWA manifest', 'manifest.json 生成', 'PWA配置'],
  alternates: { canonical: 'https://moretoolbox.com/tools/web-manifest' },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Web Manifest 生成器", "item": "https://moretoolbox.com/tools/web-manifest" }] }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Web Manifest 生成器 - MoreToolbox", "description": "可视化生成 PWA manifest.json 配置文件", "url": "https://moretoolbox.com/tools/web-manifest", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
        }}
      />
      <WebManifestClient />
    </>
  )
}
