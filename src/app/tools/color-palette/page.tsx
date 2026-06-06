import type { Metadata } from 'next'
import ColorPaletteClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create Beautiful Color Schemes - MoreToolbox',
  description: 'Free online color palette generator. Create harmonious color schemes with one click. Export as HEX, RGB, HSL. Perfect for designers and developers.',
  keywords: ['color palette generator', 'color scheme', 'color combination', 'palette maker', '调色板生成器', '配色方案', '颜色组合', '色彩搭配'],
  alternates: { canonical: '/tools/color-palette' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Color Palette Generator", "item": "https://moretoolbox.com/tools/color-palette" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Color Palette Generator - MoreToolbox", "description": "Generate beautiful color palettes with one click", "url": "https://moretoolbox.com/tools/color-palette", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <ColorPaletteClient />
      </>
    )
}
