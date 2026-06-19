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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS Box Shadow Generator - MoreToolbox", "description": "Visual CSS box-shadow builder with multi-layer support", "url": "https://moretoolbox.com/tools/box-shadow-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "CSS box-shadow 语法是什么？", "acceptedAnswer": { "@type": "Answer", "text": "box-shadow 语法：box-shadow: h-offset v-offset blur spread color; 例如 box-shadow: 2px 4px 8px 0px rgba(0,0,0,0.2)。h-offset 和 v-offset 是水平和垂直偏移，blur 是模糊半径，spread 是扩散半径。" } }, { "@type": "Question", "name": "如何实现内阴影效果？", "acceptedAnswer": { "@type": "Answer", "text": "在 box-shadow 值前加 inset 关键字即可实现内阴影。例如 box-shadow: inset 0 2px 4px rgba(0,0,0,0.2)。内阴影常用于输入框、按钮按下效果等场景。本工具支持一键切换内外阴影。" } }, { "@type": "Question", "name": "box-shadow 支持多层阴影吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。用逗号分隔多组阴影值即可实现多层阴影。例如 box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.2)。多层阴影可以创建更丰富的深度效果。本工具支持添加无限层阴影。" } }] }),
          }}
        />
        <BoxShadowClient />
      </>
    )
}
