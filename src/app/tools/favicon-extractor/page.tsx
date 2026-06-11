import type { Metadata } from 'next'
import FaviconExtractorClient from './ToolClient'
export const metadata: Metadata = { title: 'Favicon 提取器 | 网站图标提取 - MoreToolbox', description: '输入网站 URL，自动提取所有尺寸 Favicon 图标，一键下载 ZIP 打包。', keywords: ['favicon提取', '网站图标提取', 'favicon download'], alternates: { canonical: '/tools/favicon-extractor' } }
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Favicon 提取器", "url": "https://moretoolbox.com/tools/favicon-extractor", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" } }) }} /><FaviconExtractorClient /></> }
