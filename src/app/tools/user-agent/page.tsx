import type { Metadata } from 'next'
import UserAgentClient from './ToolClient'

export const metadata: Metadata = {
  title: 'User Agent 在线解析器 | User Agent Parser Online - MoreToolbox',
  description: '在线解析浏览器 User Agent 字符串，识别浏览器类型、版本、操作系统、设备类型、渲染引擎等详细信息。 | Free online User-Agent string parser. Identify browser, version, OS, device type, rendering engine. Developer debugging tool.',
  keywords: ['User Agent解析', 'UA解析', '浏览器识别', 'UserAgent', '浏览器检测', '设备检测'],
  alternates: { canonical: 'https://moretoolbox.com/tools/user-agent' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "User Agent 解析", "item": "https://moretoolbox.com/tools/user-agent" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "User Agent 解析 - MoreToolbox", "description": "浏览器 UA 字符串解析 | Free online User-Agent string parser", "url": "https://moretoolbox.com/tools/user-agent", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "什么是 User Agent 字符串？", "acceptedAnswer": { "@type": "Answer", "text": "User Agent（UA）是浏览器发送给服务器的标识字符串，包含浏览器名称、版本、操作系统、设备等信息。服务器根据 UA 返回适配的内容。本工具可以解析任何 UA 字符串。" } }, { "@type": "Question", "name": "User Agent 包含哪些信息？", "acceptedAnswer": { "@type": "Answer", "text": "UA 包含浏览器类型和版本（如 Chrome 120）、渲染引擎（如 Blink、Gecko）、操作系统（如 Windows 11、macOS）、设备类型（桌面/移动）等信息。现代 UA 字符串越来越精简，可能需要结合 Client Hints 获取完整信息。" } }, { "@type": "Question", "name": "如何修改浏览器的 User Agent？", "acceptedAnswer": { "@type": "Answer", "text": "在 Chrome 中按 F12 打开开发者工具，点击右上角三个点 → More tools → Network conditions，在 User agent 部分取消勾选 Use browser default，即可选择或自定义 UA。常用于测试移动端页面或 API 调试。" } }] }),
          }}
        />
        <UserAgentClient />
      </>
    )
}
