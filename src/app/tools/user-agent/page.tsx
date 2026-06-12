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
        <UserAgentClient />
      </>
    )
}
