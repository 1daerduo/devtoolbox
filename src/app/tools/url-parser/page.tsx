import type { Metadata } from 'next'
import UrlParserClient from './ToolClient'

export const metadata: Metadata = {
  title: 'URL 解析器 - Online URL Parser & Analyzer | MoreToolbox',
  description: '免费在线 URL 解析与分解工具。将任意网址拆解为协议(Scheme)、主机名(Host)、端口(Port)、路径(Path)、查询参数(Query String)、哈希(Hash)等组件，彩色可视化展示每部分。支持一键复制解析结果，Web 开发者调试 API、SEO 分析链接结构必备，立即免费使用。 | Free online URL parser & analyzer. Break down any URL into scheme, hostname, port, path, query string, and hash components with color-coded visual display. One-click copy results. Essential for API debugging, SEO link analysis, and web development. Try it free now.',
  keywords: ['URL parser', 'URL analyzer', 'query string parser', 'URL breakdown', 'parse URL online', 'URL解析器', 'URL分析', '查询字符串解析'],
  alternates: { canonical: 'https://moretoolbox.com/tools/url-parser' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "URL Parser", "item": "https://moretoolbox.com/tools/url-parser" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "URL Parser - MoreToolbox", "description": "Parse and analyze URLs into components", "url": "https://moretoolbox.com/tools/url-parser", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <UrlParserClient />
      </>
    )
}
