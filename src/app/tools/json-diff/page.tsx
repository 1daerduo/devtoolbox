import type { Metadata } from 'next'
import JsonDiffClient from './ToolClient'

export const metadata: Metadata = {
  title: 'JSON 对比工具 - 在线JSON差异比较 | MoreToolbox',
  description: '免费在线 JSON 对比工具。可视化比较两个 JSON 数据的差异，高亮显示新增、删除、修改的字段，支持深层嵌套对比。 | Free online JSON diff tool. Compare two JSON objects with highlighted additions, deletions, and modifications.',
  keywords: ['JSON diff', 'JSON compare', 'JSON difference', 'JSON对比', 'JSON比较', 'JSON差异', 'JSON compare tool', 'JSON diff checker'],
  alternates: { canonical: 'https://moretoolbox.com/tools/json-diff' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "JSON Diff", "item": "https://moretoolbox.com/tools/json-diff" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "JSON Diff - MoreToolbox", "description": "Compare two JSON objects and highlight differences", "url": "https://moretoolbox.com/tools/json-diff", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "JSON 对比和文本对比有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "JSON 对比会解析 JSON 数据结构后按字段路径比较，忽略格式差异（缩进、空格、键顺序），能精确识别嵌套对象中某个字段的变更。文本对比只按行比较字符串，会因格式差异产生误报。" } }, { "@type": "Question", "name": "支持深层嵌套的 JSON 对比吗？", "acceptedAnswer": { "@type": "Answer", "text": "支持。本工具递归遍历 JSON 对象的所有层级，对每个叶子节点按完整路径进行对比。无论嵌套多深，都能精确识别变更位置。" } }, { "@type": "Question", "name": "如何处理数组差异？", "acceptedAnswer": { "@type": "Answer", "text": "数组按索引逐项比较。如果数组长度不同，多出的元素标记为新增或删除；相同索引的元素递归比较内容差异。" } }] }),
          }}
        />
        <JsonDiffClient />
      </>
    )
}
