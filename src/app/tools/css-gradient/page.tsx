import type { Metadata } from 'next'
import CssGradientClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS 渐变在线生成器 - 线性/径向/圆锥渐变可视化 - MoreToolbox',
  description: '可视化 CSS 渐变生成器，支持线性渐变、径向渐变、圆锥渐变，多色标自由调节，实时预览效果，一键复制 CSS 代码。 | Free online CSS gradient generator. Linear, radial, conic gradients. Multi color stops, real-time preview. One-click CSS code copy.',
  keywords: ['CSS渐变', '渐变生成器', '线性渐变', '径向渐变', '圆锥渐变', 'gradient', 'CSS背景', '渐变色'],
  alternates: { canonical: 'https://moretoolbox.com/tools/css-gradient' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS 渐变生成器", "item": "https://moretoolbox.com/tools/css-gradient" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS 渐变生成器 - MoreToolbox", "description": "可视化 CSS 渐变生成 | Free online CSS gradient generator", "url": "https://moretoolbox.com/tools/css-gradient", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "CSS 渐变有哪些类型？分别适用于什么场景？", "acceptedAnswer": { "@type": "Answer", "text": "主要有三种：线性渐变（linear-gradient）适合按钮、进度条、背景色条；径向渐变（radial-gradient）适合圆形元素、聚光灯效果；圆锥渐变（conic-gradient）适合饼图、色环、加载动画。本工具支持三种渐变类型的可视化编辑。" } }, { "@type": "Question", "name": "生成的 CSS 代码可以直接用于项目吗？", "acceptedAnswer": { "@type": "Answer", "text": "可以。生成的代码是标准 CSS 语法，直接复制粘贴到你的项目 CSS 文件中即可使用。支持主流浏览器（Chrome、Firefox、Safari、Edge），无需额外前缀。渐变代码纯 CSS 实现，零依赖，高性能。" } }, { "@type": "Question", "name": "可以添加多少个颜色停止点？", "acceptedAnswer": { "@type": "Answer", "text": "CSS 渐变支持任意数量的色标，本工具支持添加多个颜色停止点，每个色标可独立调节颜色和位置百分比。建议 2-5 个色标以获得最佳的视觉效果，过多的色标可能导致渐变过渡过于复杂。" } }] }),
          }}
        />
        <CssGradientClient />
      </>
    )
}
