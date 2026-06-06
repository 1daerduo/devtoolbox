import type { Metadata } from 'next'
import ColorConverterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线颜色转换工具 - HEX RGB HSL 互转 - DevToolbox',
  description: '在线颜色格式转换工具，支持 HEX 十六进制、RGB、HSL 三种颜色格式互相转换，实时预览颜色效果，前端开发必备工具。',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "颜色转换 - DevToolbox", "description": "HEX/RGB/HSL 格式互转", "url": "https://moretoolbox.com/tools/color-converter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ColorConverterClient />
      </>
    )
}
