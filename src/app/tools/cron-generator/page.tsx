import type { Metadata } from 'next'
import CronGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Cron 表达式生成器 - 在线定时任务表达式工具 - MoreToolbox',
  description: '免费在线 Cron 表达式生成器，可视化配置定时任务表达式，实时预览下次执行时间。支持秒级/分级 Cron，Linux/Crontab/Spring 兼容。 | Free online Cron expression generator. Visual configuration, real-time next execution preview. Linux/Crontab/Spring compatible.',
  keywords: ['Cron表达式', 'Cron生成器', 'crontab', '定时任务', 'cron job', '在线cron工具', 'cron表达式在线', '定时表达式'],
  alternates: { canonical: 'https://moretoolbox.com/tools/cron-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Cron 表达式生成器", "item": "https://moretoolbox.com/tools/cron-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Cron 表达式生成器 - MoreToolbox", "description": "可视化生成 Cron 定时表达式 | Free online Cron expression generator", "url": "https://moretoolbox.com/tools/cron-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <CronGeneratorClient />
      </>
    )
}
