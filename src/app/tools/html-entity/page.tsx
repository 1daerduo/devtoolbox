import type { Metadata } from 'next'
import HtmlEntityClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 实体编码解码工具 - 在线转义 &lt; &gt; &amp; - DevToolbox',
  description: '在线 HTML 实体编码解码工具，将 < > & " 等特殊字符与 HTML 实体 (&lt; &amp;) 互转，防止 XSS 攻击，前端开发必备。',
  keywords: ['HTML实体', 'HTML编码', 'HTML解码', 'html entities', '转义字符', 'HTML特殊字符', 'html encode', 'html decode', 'XSS防护'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-entity' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML 实体编解码", "item": "https://moretoolbox.com/tools/html-entity" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 实体编解码 - DevToolbox", "description": "HTML 特殊字符与实体互转", "url": "https://moretoolbox.com/tools/html-entity", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HtmlEntityClient />
      </>
    )
}
