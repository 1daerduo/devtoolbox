import type { Metadata } from 'next'
import FaviconValidatorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Favicon 校验器 | 网站图标配置检测 - MoreToolbox',
  description: '免费在线 Favicon 配置校验工具，一键检测网站图标配置是否完整。自动扫描缺失的图标尺寸(16/32/180/192/512px)、格式问题、manifest 引用，给出详细修复建议。提升网站在浏览器标签页、书签和 PWA 中的显示效果。 | Free Favicon configuration checker. Scan your website for missing icon sizes, format issues & manifest problems. Get fix suggestions. Free & online.',
  keywords: ['favicon校验', 'favicon检测', 'website icon checker', 'favicon checker', '网站图标检测'],
  alternates: { canonical: 'https://moretoolbox.com/tools/favicon-validator' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Favicon 校验器", "item": "https://moretoolbox.com/tools/favicon-validator" }] }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Favicon 校验器", "url": "https://moretoolbox.com/tools/favicon-validator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }) }} />
      <FaviconValidatorClient />
    </>
  )
}
