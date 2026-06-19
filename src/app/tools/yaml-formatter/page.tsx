import type { Metadata } from 'next'
import YamlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'YAML 在线格式化验证工具 | YAML Formatter & Validator - MoreToolbox',
  description: '免费在线 YAML 格式化、压缩、验证工具。支持 Kubernetes/Docker Compose 配置验证，YAML↔JSON 互转。DevOps 必备工具。 | Free online YAML formatter & validator. Kubernetes/Docker Compose config validation. YAML ↔ JSON conversion. DevOps essential.',
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
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "YAML 格式化 - MoreToolbox", "description": "YAML ↔ JSON 互转 | Free online YAML formatter & validator", "url": "https://moretoolbox.com/tools/yaml-formatter", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "YAML 和 JSON 有什么区别？", "acceptedAnswer": { "@type": "Answer", "text": "YAML 使用缩进表示层级，更易读写，支持注释。JSON 使用花括号和引号，解析速度更快。YAML 适合配置文件（Docker Compose、K8s），JSON 适合 API 数据传输。本工具支持 YAML 与 JSON 互转。" } }, { "@type": "Question", "name": "如何验证 YAML 语法是否正确？", "acceptedAnswer": { "@type": "Answer", "text": "将 YAML 内容粘贴到本工具的输入框中，点击格式化按钮即可验证。如果语法有误，工具会显示错误信息和行号。常见错误包括：缩进不一致、使用了 Tab 缩进、冒号后缺少空格等。" } }, { "@type": "Question", "name": "Docker Compose 和 Kubernetes 配置用什么格式？", "acceptedAnswer": { "@type": "Answer", "text": "Docker Compose 和 Kubernetes 都使用 YAML 格式编写配置文件。YAML 的层级缩进结构非常适合描述复杂的容器编排配置。本工具可以帮助验证和格式化这些配置文件。" } }] }),
          }}
        />
        <YamlFormatterClient />
      </>
    )
}
