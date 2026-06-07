import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '二维码扫描器 - 在线 QR Code 解码识别工具 | MoreToolbox',
  description: '免费在线二维码扫描器，上传图片或粘贴截图即可识别 QR Code 内容。支持 URL/文本/名片/WiFi 等多种格式解码。纯浏览器端处理，图片不上传。',
  keywords: ['二维码扫描器', 'QR 扫描', '在线二维码解码', 'QR scanner', '二维码识别', '扫码工具', 'QR code reader online', '图片扫码'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/qr-scanner',
  },
}

export default function QrScannerPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "二维码扫描器", "item": "https://moretoolbox.com/tools/qr-scanner" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "二维码扫描器 - MoreToolbox", "description": "上传图片在线扫码解码 QR Code 内容，支持 URL/文本/名片解码 | Free online QR code scanner & decoder", "url": "https://moretoolbox.com/tools/qr-scanner", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
