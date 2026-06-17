import type { Metadata } from 'next'
import CssFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线 CSS 格式化工具 - 美化/压缩 CSS 代码 - MoreToolbox',
  description: '免费在线 CSS 格式化工具，支持 CSS 代码美化、压缩、一键复制，完全在浏览器本地处理，无需上传。 | Free online CSS formatter and minifier. Beautify compressed CSS, customize indentation. Pure browser-side processing.',
  keywords: ['CSS格式化', 'CSS美化', 'CSS压缩', 'CSS Beautify', 'CSS Minify', '在线CSS工具', '代码格式化'],
  alternates: { canonical: 'https://moretoolbox.com/tools/css-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSS 格式化", "item": "https://moretoolbox.com/tools/css-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSS 格式化 - MoreToolbox", "description": "CSS 美化与压缩 | Free online CSS formatter and minifier", "url": "https://moretoolbox.com/tools/css-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "CSS 格式化和 CSS 压缩有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "CSS 格式化（美化）将压缩的 CSS 代码添加缩进和换行，使其易于阅读和调试。CSS 压缩（Minify）则去除所有空格、换行和注释，减小文件体积，提升网页加载速度。开发时用格式化，上线时用压缩。" } }, { "@type": "Question", "name": "CSS 压缩后还能还原吗？", "acceptedAnswer": { "@type": "Answer", "text": "压缩去除了空格和换行但不改变逻辑，格式化工具可以重新添加缩进和换行来还原可读性。但压缩时移除的注释无法恢复，建议保留源文件作为开发版本。" } }, { "@type": "Question", "name": "支持 CSS3 和 Sass/Less 吗？", "acceptedAnswer": { "@type": "Answer", "text": "本工具支持标准 CSS3 语法（包括 Flexbox、Grid、变量等）。Sass/SCSS 和 Less 是 CSS 预处理器，需要先编译为标准 CSS 后再使用本工具格式化或压缩。" } }] }),
          }}
        />
        <CssFormatterClient />
      </>
    )
}
