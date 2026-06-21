import type { Metadata } from 'next'
import BorderRadiusClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS Border Radius 生成器 - 可视化圆角工具 | MoreToolbox',
  description: '免费在线 CSS border-radius 生成器。可视化调整四角圆角，支持独立控制每个角，实时预览效果，一键复制 CSS 代码。 | Free online CSS border-radius generator. Adjust each corner independently, live preview, one-click copy.',
  keywords: ['CSS border radius', 'border radius generator', 'CSS rounded corners', 'border-radius CSS', '圆角生成器', 'CSS圆角', 'border-radius工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/border-radius-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS Border Radius Generator", "item": "https://moretoolbox.com/tools/border-radius-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS Border Radius Generator - MoreToolbox", "description": "Visual CSS border-radius builder with per-corner control", "url": "https://moretoolbox.com/tools/border-radius-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "CSS border-radius 语法是什么？", "acceptedAnswer": { "@type": "Answer", "text": "border-radius 语法：border-radius: top-left top-right bottom-right bottom-left; 例如 border-radius: 10px 20px 10px 20px。四个值分别对应左上、右上、右下、左下四个角的圆角半径。" } }, { "@type": "Question", "name": "如何用 border-radius 做圆形？", "acceptedAnswer": { "@type": "Answer", "text": "将 border-radius 设为 50%，配合正方形容器即可实现圆形。例如 .circle { width: 100px; height: 100px; border-radius: 50%; }。如果是非正方形容器，50% 会生成椭圆形。" } }, { "@type": "Question", "name": "border-radius 支持椭圆弧吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。使用斜杠语法可以分别指定水平和垂直半径：border-radius: 50px / 25px; 表示水平半径50px、垂直半径25px。也可以对每个角单独设置：border-radius: 10px 20px / 5px 15px。" } }] }),
          }}
        />
        <BorderRadiusClient />
      </>
    )
}
