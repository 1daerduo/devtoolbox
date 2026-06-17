import type { Metadata } from 'next'
import DiffCheckerClient from './ToolClient'

export const metadata: Metadata = {
  title: '文本差异对比工具 - 在线 Diff Checker - MoreToolbox',
  description: '免费在线文本差异对比工具，左右并排对比两个文本内容，高亮显示新增、删除、修改行。支持代码 diff、文档对比等多种场景。 | Free online text diff checker. Side-by-side comparison, highlight added/deleted/modified lines. Code diff, document comparison.',
  keywords: ['文本对比', 'diff checker', '代码差异', 'text diff', '文本比较', '在线diff工具', '代码对比'],
  alternates: { canonical: 'https://moretoolbox.com/tools/diff-checker' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "文本差异对比", "item": "https://moretoolbox.com/tools/diff-checker" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "文本差异对比 - MoreToolbox", "description": "在线 Diff Checker | Free online text diff checker", "url": "https://moretoolbox.com/tools/diff-checker", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "文本差异对比的工作原理是什么？", "acceptedAnswer": { "@type": "Answer", "text": "本工具使用 Myers 差分算法（也叫最长公共子序列算法），逐行比较两段文本，找出最少编辑操作（插入、删除、修改）使文本 A 变为文本 B 的方案，然后高亮显示差异部分。" } }, { "@type": "Question", "name": "支持对比代码文件吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。本工具可以对比任何纯文本内容，包括源代码、配置文件、JSON、XML 等。差异结果会以不同颜色标注新增行（绿色）、删除行（红色）和修改行，方便快速定位变更。" } }, { "@type": "Question", "name": "对比的数据会被保存吗？", "acceptedAnswer": { "@type": "Answer", "text": "不会。所有对比操作在浏览器本地完成，输入的文本内容不会发送到服务器或保存到任何地方。关闭页面后数据即消失，您的代码和文档安全无忧。" } }] }),
          }}
        />
        <DiffCheckerClient />
      </>
    )
}
