import type { Metadata } from 'next'
import HtmlPlaygroundClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS 在线编辑器 - 代码实时预览 Playground | MoreToolbox',
  description: '免费在线 HTML/CSS/JS 代码编辑器与实时预览 Playground，支持组合模式（三栏同屏）和分离模式（独立标签页），自动保存代码到浏览器本地。无需注册安装，打开即用，是前端开发者快速原型、调试代码、学习测试的必备在线工具。 | Free online HTML, CSS, JavaScript code playground with live preview. Combined mode (3-pane) and split tab mode, auto-save to localStorage. No setup required — open and code instantly. Perfect for rapid prototyping, debugging, and learning front-end development.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML/CSS/JS Playground - MoreToolbox", "description": "Online HTML, CSS, JavaScript editor with live preview", "url": "https://moretoolbox.com/tools/html-playground", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <HtmlPlaygroundClient />
      </>
    )
}
