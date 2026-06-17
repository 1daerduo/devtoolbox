import type { Metadata } from 'next'
import HtmlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 格式化工具 - 在线 HTML 美化压缩 - MoreToolbox',
  description: '免费在线 HTML 格式化工具，支持 HTML 美化与压缩，自定义缩进，一键复制。适用于前端开发调试与生产环境优化。 | Free online HTML formatter and minifier. Custom indentation, one-click copy. Front-end development essential.',
  keywords: ['HTML格式化', 'HTML美化', 'HTML压缩', 'HTML formatter', 'HTML minifier', '代码美化', '在线HTML工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/html-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "HTML 格式化", "item": "https://moretoolbox.com/tools/html-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "HTML 格式化 - MoreToolbox", "description": "HTML 代码美化与压缩 | Free online HTML formatter and minifier", "url": "https://moretoolbox.com/tools/html-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "HTML 格式化有什么用？", "acceptedAnswer": { "@type": "Answer", "text": "HTML 格式化将压缩或混乱的 HTML 代码添加缩进和换行，使其层级结构清晰易读。方便开发者调试页面结构、排查标签嵌套错误、维护他人编写的代码。格式化不改变页面渲染效果。" } }, { "@type": "Question", "name": "HTML 压缩对 SEO 有影响吗？", "acceptedAnswer": { "@type": "Answer", "text": "HTML 压缩减小文件体积、加快页面加载速度，间接有利于 SEO（页面速度是排名因素）。压缩仅去除空白字符和注释，不改变 HTML 语义和内容结构，搜索引擎可以正常解析。" } }, { "@type": "Question", "name": "支持 JSX 和 Vue 模板吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具主要处理标准 HTML 格式化和压缩。对于包含 JSX 语法或 Vue 指令（v-if、v-for 等）的模板，基础 HTML 结构可以正常格式化，但特殊语法可能无法完美处理。" } }] }),
          }}
        />
        <HtmlFormatterClient />
      </>
    )
}
