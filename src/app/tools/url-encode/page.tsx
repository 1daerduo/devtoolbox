import type { Metadata } from 'next'
import UrlEncodeClient from './ToolClient'

export const metadata: Metadata = {
  title: 'URL 在线编码解码工具 - DevToolbox',
  description: '在线 URL 编码解码工具，支持 encodeURIComponent 编码和 decodeURIComponent 解码，将中文、空格、特殊字符转为 %XX 格式或还原。完全免费，无需安装。',
  keywords: ['URL编码', 'URL解码', 'URL Encode', 'URL Decode', 'encodeURIComponent', '在线编码', '百分号编码', '网址编码'],
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/url-encode' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://devtoolbox-61u.pages.dev" }, { "@type": "ListItem", "position": 2, "name": "URL 编码解码", "item": "https://devtoolbox-61u.pages.dev/tools/url-encode" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL 编码解码 - DevToolbox", "description": "URL 编码与解码互转", "url": "https://devtoolbox-61u.pages.dev/tools/url-encode", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <UrlEncodeClient />
      </>
    )
}
