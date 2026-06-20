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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "颜色调色板生成器支持哪些配色模式？", "acceptedAnswer": { "@type": "Answer", "text": "支持 6 种色彩和谐模式：类比色（Analogous）适合柔和渐变、单色（Monochromatic）适合品牌一致性、三色（Triadic）适合活力配色、互补色（Complementary）适合强调对比、分裂互补色（Split-Complementary）适合平衡对比、随机模式适合灵感探索。每种模式根据色彩理论自动生成协调的配色方案。" } }, { "@type": "Question", "name": "如何锁定喜欢的颜色？", "acceptedAnswer": { "@type": "Answer", "text": "点击颜色卡上的锁定图标即可固定该颜色，后续点击生成新配色时，锁定的颜色不会变化，其余颜色围绕锁定色自动生成新的协调方案。适合已有主色需要搭配辅助色的场景。" } }, { "@type": "Question", "name": "生成的配色可以导出吗？支持哪些格式？", "acceptedAnswer": { "@type": "Answer", "text": "每个配色方案会显示 HEX、RGB 和 HSL 三种格式的颜色值，点击即可复制。如需导出，可一键复制全部颜色（多种格式可选），方便粘贴到 CSS、设计工具（Figma/Sketch）或 Tailwind 配置中直接使用。" } }] }),
          }}
        />
        <ColorPaletteClient />
      </>
    )
}
