import type { Metadata } from 'next'
import ColorConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线颜色转换工具 - HEX RGB HSL 互转 - MoreToolbox',
  description: '在线颜色格式转换工具，支持 HEX 十六进制、RGB、HSL 三种颜色格式互相转换，实时预览颜色效果，前端开发必备工具。 | Free online color converter. HEX, RGB, HSL mutual conversion. Real-time color preview. Front-end development essential.',
  keywords: ['颜色转换', 'HEX转RGB', 'RGB转HEX', 'RGB转HSL', '十六进制颜色', '颜色格式转换', '在线取色', '前端工具', '颜色预览'],
  alternates: { canonical: 'https://moretoolbox.com/tools/color-converter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "颜色转换", "item": "https://moretoolbox.com/tools/color-converter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "颜色转换 - MoreToolbox", "description": "HEX/RGB/HSL 格式互转 | Free online color converter", "url": "https://moretoolbox.com/tools/color-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "HEX、RGB、HSL 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "HEX 用十六进制表示颜色（如 #FF5733），常用于 CSS 和设计软件。RGB 用红绿蓝三个 0-255 的值表示，直观对应显示器像素。HSL 用色相、饱和度、亮度表示，更符合人类对颜色的直觉感知，方便调整明暗和鲜艳度。" } }, { "@type": "Question", "name": "为什么 HEX 颜色有时是 3 位有时是 6 位？", "acceptedAnswer": { "@type": "Answer", "text": "3 位 HEX（如 #F53）是 6 位的缩写，每两位相同时可缩写为一位，等价于 #FF5533。浏览器都支持两种写法，但 6 位更通用且精确，本工具统一输出 6 位格式。" } }, { "@type": "Question", "name": "CSS 中应该用哪种颜色格式？", "acceptedAnswer": { "@type": "Answer", "text": "三种格式浏览器都完全支持。HEX 最简洁常用，RGB 适合需要透明度时使用 rgba()，HSL 适合需要动态调整颜色时使用。实际开发中 HEX 使用最广泛，推荐作为默认选择。" } }] }),
          }}
        />
        <ColorConverterClient />
      </>
    )
}
