import type { Metadata } from 'next'
import ColorPaletteClient from './ToolClient'

export const metadata: Metadata = {
  title: '颜色调色板生成器 - Color Palette Generator | MoreToolbox',
  description: '免费在线配色方案生成器。一键生成协调的配色方案，输出 HEX/RGB/HSL 格式。适合设计师和前端开发者使用。 | Free online color palette generator. Create harmonious color schemes with one click.',
  keywords: ['color palette generator', 'color scheme', 'color combination', 'palette maker', '调色板生成器', '配色方案', '颜色组合', '色彩搭配'],
  alternates: { canonical: 'https://moretoolbox.com/tools/color-palette' },
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
