import type { Metadata } from 'next'
import HtmlEntityClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 实体编码解码工具 - 在线转义 &lt; &gt; &amp; - MoreToolbox',
  description: '在线 HTML 实体编码解码工具，将 < > & " 等特殊字符与 HTML 实体 (&lt; &amp;) 互转，防止 XSS 攻击，前端开发必备。 | Free online HTML entity encoder & decoder. Convert < > & " to entities (&lt; &amp;). Prevent XSS attacks. Frontend essential.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 实体编解码 - MoreToolbox", "description": "HTML 特殊字符与实体互转 | Free online HTML entity encoder & decoder", "url": "https://moretoolbox.com/tools/html-entity", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 HTML 实体编码？什么时候需要用到？", "acceptedAnswer": { "@type": "Answer", "text": "HTML 实体编码是将 HTML 中有特殊含义的字符（如 < > & \" '）转换为安全文本的机制。例如 < 转成 &lt;，> 转成 &gt;。在网页中嵌入用户输入的内容、展示代码片段、写技术博客时都需要用到，否则可能导致页面渲染错误或 XSS 安全漏洞。" } }, { "@type": "Question", "name": "HTML 实体编码和 URL 编码有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "HTML 实体编码解决的是 HTML 文档中的特殊字符问题（如 < 写成 &lt;），URL 编码解决的是 URL 参数中的特殊字符问题（如空格写成 %20）。两者用途不同：前者防止 HTML 注入，后者确保 URL 正确传输。" } }, { "@type": "Question", "name": "编码后的数据在浏览器端会泄露吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。本工具所有编解码操作完全在您的浏览器本地执行，输入输出数据不会通过网络上传到任何服务器。您可以放心处理敏感内容。" } }] }),
          }}
        />
        <HtmlEntityClient />
      </>
    )
}
