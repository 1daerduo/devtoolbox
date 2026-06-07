import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '正则表达式测试器 - 在线 Regex 调试工具 | MoreToolbox',
  description: '免费在线正则表达式测试工具，支持 JavaScript 正则语法，实时匹配高亮、捕获组查看、替换功能、常用正则库。100% 浏览器本地处理。',
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
        <ToolClient />
      </>
    )
}
