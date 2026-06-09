import type { Metadata } from 'next'
import ColorPaletteClient from './ToolClient'

export const metadata: Metadata = {
  title: '颜色调色板生成器 - Color Palette Generator | MoreToolbox',
  description: '免费在线配色方案生成器，支持 6 种配色模式（类比色、单色、三色、互补色、分裂互补、随机搭配），一键锁定喜欢的颜色自动生成协调配色。输出 HEX/RGB/HSL 格式颜色值，设计师和前端开发者必备的颜色搭配工具，立即免费使用。 | Free online color palette generator with 6 harmony modes (analogous, monochromatic, triadic, complementary, split-complementary, random). Lock colors to auto-generate matching palettes. Export HEX/RGB/HSL values. Essential color tool for designers & developers.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Color Palette Generator - MoreToolbox", "description": "Generate beautiful color palettes with one click", "url": "https://moretoolbox.com/tools/color-palette", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ColorPaletteClient />
      </>
    )
}
