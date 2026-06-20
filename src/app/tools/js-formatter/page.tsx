import type { Metadata } from 'next'
import JsFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JavaScript 格式化工具 - 在线 JS 美化压缩 - MoreToolbox',
  description: '免费在线 JavaScript 格式化工具，支持 JS 代码美化与压缩，自定义缩进，一键复制。前端开发调试与代码优化必备。 | Free online JavaScript formatter and minifier. Custom indentation, one-click copy. JS code debugging & optimization essential.',
  keywords: ['JS格式化', 'JavaScript美化', 'JS压缩', 'JS minifier', 'JavaScript formatter', '代码美化', '在线JS工具'],
  alternates: { canonical: 'https://moretoolbox.com/tools/js-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JS 格式化", "item": "https://moretoolbox.com/tools/js-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JS 格式化 - MoreToolbox", "description": "JavaScript 美化与压缩 | Free online JavaScript formatter and minifier", "url": "https://moretoolbox.com/tools/js-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JavaScript 格式化有什么用？什么场景需要？", "acceptedAnswer": { "@type": "Answer", "text": "JS 格式化（美化）主要用于将压缩或混淆的 JS 代码恢复为可读的缩进格式，方便代码审查、调试和学习。常见场景：阅读第三方压缩库源码、调试线上 JS 错误、统一团队代码风格。反向操作（压缩）则用于减少文件体积，加快网页加载速度。" } }, { "@type": "Question", "name": "格式化会改变代码逻辑吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。本工具仅调整代码的缩进、换行和空格格式，不改变任何 JavaScript 语法和逻辑。格式化过程基于 AST（抽象语法树）解析，确保代码语义完全不变。如果输入代码有语法错误，工具会报错提示而非静默修改。" } }, { "@type": "Question", "name": "在线格式化安全吗？我的代码会被上传吗？", "acceptedAnswer": { "@type": "Answer", "text": "绝对安全。所有格式化操作完全在您的浏览器本地执行，代码不会通过网络传输到任何服务器。即使是包含商业机密的代码，也可以放心使用。处理完毕后关闭页面即可清除所有数据。" } }] }),
          }}
        />
        <JsFormatterClient />
      </>
    )
}
