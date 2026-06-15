import type { Metadata } from 'next'
import ChmodCalculatorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Chmod 计算器 | Chmod Calculator Online - MoreToolbox',
  description: '免费在线 Chmod 权限计算器，支持数字与符号表示法互转，可视化勾选权限自动计算八进制值。Linux/Unix 文件权限 rwx 设置必备工具，实时预览 chmod 命令。 | Free online chmod calculator. Convert between numeric and symbolic notation. Visual permission selector for Linux/Unix file permissions.',
  keywords: ['Chmod计算器', 'Chmod calculator', 'Linux权限', '文件权限', 'rwx', '八进制权限', 'chmod命令', '权限计算器', 'Linux chmod'],
  alternates: { canonical: 'https://moretoolbox.com/tools/chmod-calculator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Chmod 计算器", "item": "https://moretoolbox.com/tools/chmod-calculator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Chmod 计算器 - MoreToolbox", "description": "Linux/Unix 文件权限计算与转换工具 | Linux/Unix file permission calculator", "url": "https://moretoolbox.com/tools/chmod-calculator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ChmodCalculatorClient />
      </>
    )
}
