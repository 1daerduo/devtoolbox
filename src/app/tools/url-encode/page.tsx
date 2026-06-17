import type { Metadata } from 'next'
import UrlEncodeClient from './ToolClient'

export const metadata: Metadata = {
  title: 'URL 在线编码解码工具 | URL Encoder & Decoder - MoreToolbox',
  description: '在线 URL 编码解码工具，支持 encodeURIComponent 编码和 decodeURIComponent 解码，将中文、空格、特殊字符转为 %XX 格式或还原。完全免费，无需安装。 | Free online URL encoder & decoder. Supports encodeURIComponent & decodeURIComponent. Convert special characters, Chinese to %XX format.',
  keywords: ['URL编码', 'URL解码', 'URL Encode', 'URL Decode', 'encodeURIComponent', '在线编码', '百分号编码', '网址编码'],
  alternates: { canonical: 'https://moretoolbox.com/tools/url-encode' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "URL 编码解码", "item": "https://moretoolbox.com/tools/url-encode" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL 编码解码 - MoreToolbox", "description": "URL 编码与解码互转 | Free online URL encoder & decoder", "url": "https://moretoolbox.com/tools/url-encode", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "URL 编码和解码有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "URL 编码（也叫百分号编码）将中文、空格、特殊字符转换为 %XX 格式，确保 URL 中只包含合法字符。URL 解码则是反向操作，将 %XX 格式还原为原始字符。例如空格编码为 %20，中文「你好」编码为 %E4%BD%A0%E5%A5%BD。" } }, { "@type": "Question", "name": "encodeURI 和 encodeURIComponent 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "encodeURI 用于编码完整 URL，不会编码 :/?#&= 等 URL 语法字符。encodeURIComponent 用于编码 URL 参数值，会编码所有特殊字符。通常在拼接查询参数时使用 encodeURIComponent 更安全。" } }, { "@type": "Question", "name": "URL 编码后的数据安全吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具所有编码解码操作完全在浏览器本地执行，不会将您的数据上传到任何服务器。URL 编码本身不是加密，仅是字符格式转换，不要将编码用于安全目的。如需保护数据，请使用加密工具。" } }] }),
          }}
        />
        <UrlEncodeClient />
      </>
    )
}
