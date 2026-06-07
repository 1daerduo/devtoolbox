import type { Metadata } from 'next'
import HtmlPlaygroundClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS 在线编辑器 - 代码实时预览 Playground | MoreToolbox',
  description: '免费在线 HTML/CSS/JS 代码编辑器，支持实时预览。在浏览器中编写和运行前端代码，无需任何配置安装。 | Free online HTML, CSS, JavaScript playground with live preview. Write, edit, and run web code instantly.',
  keywords: ['HTML playground', 'CSS playground', 'JavaScript playground', 'online code editor', 'live preview', 'HTML编辑器', '在线代码编辑器', 'HTML预览'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-playground' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML/CSS/JS Playground", "item": "https://moretoolbox.com/tools/html-playground" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML/CSS/JS Playground - MoreToolbox", "description": "Online HTML, CSS, JavaScript editor with live preview", "url": "https://moretoolbox.com/tools/html-playground", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } }),
          }}
        />
        <HtmlPlaygroundClient />
      </>
    )
}
