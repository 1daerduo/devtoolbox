import type { Metadata } from 'next'
import FaviconExtractorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Favicon 提取器 | 网站图标在线提取 - MoreToolbox',
  description: '免费在线 Favicon 图标提取工具，输入任意网站 URL，自动扫描并提取所有尺寸的 Favicon 图标（ICO/PNG/SVG），支持一键下载所有尺寸的 ZIP 打包。适用于查找网站图标灵感、收集素材资源。纯浏览器端处理，无需上传。 | Free Favicon icon extractor. Enter any website URL, auto-extract all Favicon sizes (ICO/PNG/SVG). Download ZIP of all icons instantly. Browser-side processing, no upload.',
  keywords: ['favicon提取', '网站图标提取', 'favicon download', 'favicon extractor', 'Favicon下载器'],
  alternates: { canonical: 'https://moretoolbox.com/tools/favicon-extractor' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Favicon 提取器", "item": "https://moretoolbox.com/tools/favicon-extractor" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Favicon 提取器", "url": "https://moretoolbox.com/tools/favicon-extractor", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }) }} />
      <FaviconExtractorClient />
    </>
  )
}
