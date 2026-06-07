import type { Metadata } from 'next'
import BoxShadowClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS Box Shadow 生成器 - 可视化阴影构建工具 | MoreToolbox',
  description: '免费在线 CSS box-shadow 阴影生成器。可视化构建多层阴影效果，支持内阴影、模糊、扩散、颜色选择器。实时预览，一键复制 CSS 代码。 | Free online CSS box-shadow generator with visual builder, multi-layer shadows, inset mode, blur, spread, color picker.',
  keywords: ['CSS box shadow', 'box shadow generator', 'CSS shadow builder', 'box-shadow CSS', 'drop shadow', 'CSS阴影生成器', 'box shadow在线工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/box-shadow-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS Box Shadow Generator", "item": "https://moretoolbox.com/tools/box-shadow-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS Box Shadow Generator - MoreToolbox", "description": "Visual CSS box-shadow builder with multi-layer support", "url": "https://moretoolbox.com/tools/box-shadow-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <BoxShadowClient />
      </>
    )
}
