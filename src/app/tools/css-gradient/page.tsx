import type { Metadata } from 'next'
import CssGradientClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSS 渐变在线生成器 - 线性/径向/圆锥渐变可视化 - DevToolbox',
  description: '可视化 CSS 渐变生成器，支持线性渐变、径向渐变、圆锥渐变，多色标自由调节，实时预览效果，一键复制 CSS 代码。',
  keywords: ['CSS渐变', '渐变生成器', '线性渐变', '径向渐变', '圆锥渐变', 'gradient', 'CSS背景', '渐变色'],
  alternates: { canonical: '/tools/css-gradient' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "CSS 渐变生成器", "item": "https://devtoolbox-61u.pages.dev/tools/css-gradient" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS 渐变生成器 - DevToolbox", "description": "可视化 CSS 渐变生成", "url": "https://devtoolbox-61u.pages.dev/tools/css-gradient", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <CssGradientClient />
      </>
    )
}
