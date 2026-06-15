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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "二维码最多能存多少字符？", "acceptedAnswer": { "@type": "Answer", "text": "二维码容量取决于版本和纠错等级。最大容量约：数字 7,089 位、字母数字 4,296 个、字节 2,953 个、汉字 1,817 个。实际使用建议控制在几百字符以内，信息越少二维码越容易扫描。" } }, { "@type": "Question", "name": "生成的二维码会过期吗？", "acceptedAnswer": { "@type": "Answer", "text": "二维码本身不会过期。如果内容是静态文本或固定网址，二维码永久有效。但如果内容指向的网页被删除或链接失效，扫描后无法正常访问，这是链接本身的问题而非二维码问题。" } }, { "@type": "Question", "name": "二维码纠错等级有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "纠错等级从低到高为 L(7%)、M(15%)、Q(25%)、H(30%)。等级越高，二维码能容忍的损坏面积越大，但图片也越大。日常使用建议 M 级，需要印刷或可能被遮挡时使用 H 级。" } }] }),
          }}
        />
        <QrcodeClient />
      </>
    )
}
