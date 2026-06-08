import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '正则表达式测试器 - 在线 Regex 调试工具 | MoreToolbox',
  description: '免费在线正则表达式测试与调试工具，支持 JavaScript 正则语法，实时匹配高亮显示、捕获组可视化查看、正则替换功能。内置 8 个常用正则模板（邮箱/URL/手机号/IP/身份证/日期等），即选即用。适合前端开发、数据清洗、日志分析、表单验证等场景。100% 浏览器本地处理。 | Free online regex tester & debugger. Real-time match highlighting, capture groups, replace mode. 8 built-in regex patterns. Perfect for frontend dev & data cleaning. 100% browser-side.',
  keywords: ['正则表达式测试器', 'regex tester', '在线正则工具', 'regex101', '正则调试', '正则匹配', '正则替换', '捕获组', 'online regex tool', 'regular expression tester'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/regex-tester',
  },
}

export default function RegexTesterPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "正则表达式测试器", "item": "https://moretoolbox.com/tools/regex-tester" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "正则表达式测试器 - MoreToolbox", "description": "在线正则表达式测试调试工具，实时匹配高亮与捕获组 | Free online regex tester with real-time matching", "url": "https://moretoolbox.com/tools/regex-tester", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "正则表达式测试器是免费的吗？", "acceptedAnswer": { "@type": "Answer", "text": "是的，MoreToolbox 的正则表达式测试器完全免费使用，无需注册，所有匹配计算在浏览器本地完成，数据不会上传到服务器。" } }, { "@type": "Question", "name": "支持哪些正则表达式标志(flags)？", "acceptedAnswer": { "@type": "Answer", "text": "支持 g（全局匹配）、i（忽略大小写）、m（多行模式）、s（dotAll 允许 . 匹配换行符）、u（Unicode 模式）、y（粘性匹配 sticky）全部 JavaScript 正则标志。" } }, { "@type": "Question", "name": "内置的正则模板有哪些？", "acceptedAnswer": { "@type": "Answer", "text": "内置 8 个常用正则表达式模板：邮箱地址、URL 链接、中国手机号、IP 地址、日期（YYYY-MM-DD）、十六进制颜色值、HTML 标签、中文字符，点击即可应用并测试。" } }] }),
          }}
        />
        <ToolClient />
      </>
    )
}
