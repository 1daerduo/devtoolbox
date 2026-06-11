import type { Metadata } from 'next'
import FaviconValidatorClient from './ToolClient'
export const metadata: Metadata = { title: 'Favicon 校验器 | 图标配置检测 - MoreToolbox', description: '检查网站 Favicon 配置是否完整，检测缺失尺寸和格式问题，给出修复建议。', keywords: ['favicon校验', 'favicon检测', 'website icon checker'], alternates: { canonical: '/tools/favicon-validator' } }
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Favicon 校验器", "url": "https://moretoolbox.com/tools/favicon-validator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" } }) }} /><FaviconValidatorClient /></> }
