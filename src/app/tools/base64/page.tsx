import type { Metadata } from 'next'
import Base64Client from './ToolClient'

export const metadata: Metadata = {
  title: 'Base64 在线编解码工具 | Base64 Encoder & Decoder - MoreToolbox',
  description: '在线 Base64 编码解码工具，支持 UTF-8 中文，一键交换输入输出。免费、无需注册，数据纯前端处理，安全放心。 | Free online Base64 encoder & decoder. UTF-8 Chinese support, one-click swap input/output. 100% browser-side, secure & private.',
  keywords: ['Base64编码', 'Base64解码', '在线Base64', 'Base64转换', 'base64 encoder', 'base64 decoder'],
  alternates: { canonical: 'https://moretoolbox.com/tools/base64' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Base64 编解码", "item": "https://moretoolbox.com/tools/base64" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Base64 编解码 - MoreToolbox", "description": "文本与 Base64 互转 | Free online Base64 encoder & decoder", "url": "https://moretoolbox.com/tools/base64", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Base64 编码有什么用？", "acceptedAnswer": { "@type": "Answer", "text": "Base64 编码常用于在文本协议（如 HTTP、Email、JSON）中传输二进制数据。典型场景包括：邮件附件（MIME）、Data URL 嵌入图片、API 认证令牌（Basic Auth）、JWT Payload 编码等。Base64 不是加密，仅是编码转换。" } }, { "@type": "Question", "name": "Base64 编码后数据会变大吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的。Base64 编码会将每 3 个字节转换为 4 个字符，因此编码后体积约为原始数据的 133%（增加约 1/3）。对于大文件建议使用压缩后再编码。" } }, { "@type": "Question", "name": "Base64 编码安全吗？可以用来加密吗？", "acceptedAnswer": { "@type": "Answer", "text": "Base64 不是加密算法，任何人都可以解码，没有保密性。如果需要保护数据安全，应使用 AES 等加密算法。Base64 的目的是编码转换而非信息安全。" } }] }),
          }}
        />
        <Base64Client />
      </>
    )
}
