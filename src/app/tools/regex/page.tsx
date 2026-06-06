import type { Metadata } from 'next'
import RegexClient from './ToolClient'

export const metadata: Metadata = {
  title: '正则表达式在线测试工具 | Regex Tester Online - MoreToolbox',
  description: '在线测试正则表达式，支持多种标志位、实时匹配高亮，内置常用正则速查。免费，无需注册，开发者调试必备。 | Free online regex tester. Multiple flags, real-time match highlighting. Built-in regex cheatsheet. Developer debugging essential.',
  keywords: ['正则表达式', '正则测试', 'Regex测试', '在线正则', 'regex tester', '正则匹配'],
  alternates: { canonical: '/tools/regex' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "正则表达式测试", "item": "https://moretoolbox.com/tools/regex" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "正则表达式测试 - MoreToolbox", "description": "在线正则匹配与高亮 | Free online regex tester", "url": "https://moretoolbox.com/tools/regex", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <RegexClient />
      </>
    )
}
