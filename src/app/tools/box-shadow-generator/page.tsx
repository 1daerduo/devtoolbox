import type { Metadata } from 'next'
import BoxShadowClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS Box Shadow Generator - Visual Shadow Builder - MoreToolbox',
  description: 'Free online CSS box-shadow generator. Visual builder with multi-layer shadows, inset mode, blur, spread, color picker. Real-time preview and one-click CSS code copy.',
  keywords: ['CSS box shadow', 'box shadow generator', 'CSS shadow builder', 'box-shadow CSS', 'drop shadow', 'CSS阴影生成器', 'box shadow在线工具'],
  alternates: { canonical: '/tools/box-shadow-generator' },
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
