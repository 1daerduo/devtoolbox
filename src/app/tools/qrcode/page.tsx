import type { Metadata } from 'next'
import QrcodeClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线二维码生成器 | QR Code Generator Online - MoreToolbox',
  description: '在线生成高清二维码，支持自定义颜色和尺寸，一键下载 PNG 图片。免费、无需注册，输入文本或网址即可生成。 | Free online QR code generator. Custom colors & size, one-click PNG download. No registration, instant generation.',
  keywords: ['二维码生成器', '在线二维码', 'QR Code生成', '二维码制作', 'QR code generator'],
  alternates: { canonical: 'https://moretoolbox.com/tools/qrcode' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "二维码生成器", "item": "https://moretoolbox.com/tools/qrcode" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "二维码生成器 - MoreToolbox", "description": "在线生成可下载的二维码 | Free online QR code generator", "url": "https://moretoolbox.com/tools/qrcode", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <QrcodeClient />
      </>
    )
}
