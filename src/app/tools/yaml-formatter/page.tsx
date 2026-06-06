import type { Metadata } from 'next'
import YamlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'YAML 在线格式化验证工具 - DevToolbox',
  description: '免费在线 YAML 格式化、压缩、验证工具。支持 Kubernetes/Docker Compose 配置验证，YAML↔JSON 互转。DevOps 必备工具。',
  keywords: ['YAML格式化', 'YAML formatter', 'YAML验证', 'YAML压缩', 'YAML转JSON', 'Kubernetes配置', 'Docker Compose'],
  alternates: { canonical: 'https://moretoolbox.com/tools/yaml-formatter' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "YAML 格式化", "item": "https://moretoolbox.com/tools/yaml-formatter" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YAML 格式化 - DevToolbox", "description": "YAML ↔ JSON 互转", "url": "https://moretoolbox.com/tools/yaml-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <YamlFormatterClient />
      </>
    )
}
