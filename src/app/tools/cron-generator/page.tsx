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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "Cron 表达式是什么？", "acceptedAnswer": { "@type": "Answer", "text": "Cron 表达式是由 5-6 个用空格分隔的字段组成的字符串，用于定义定时任务的执行时间规则。字段依次为：秒 分 时 日 月 周。广泛应用于 Linux crontab、Spring @Scheduled、Quartz 等定时任务框架。" } }, { "@type": "Question", "name": "如何看懂 Cron 表达式的各个字段？", "acceptedAnswer": { "@type": "Answer", "text": "*（星号）表示任意值，匹配所有；*/N 表示每隔 N 个单位执行；M-N 表示从 M 到 N 的范围；M,N,O 表示枚举多个值。例如 '0 8 * * 1-5' 表示每个工作日早上8点执行。" } }, { "@type": "Question", "name": "生成的 Cron 表达式兼容哪些平台？", "acceptedAnswer": { "@type": "Answer", "text": "兼容标准 Linux crontab（5字段格式）、Spring Framework @Scheduled 注解（6字段含秒）、Quartz Scheduler、Kubernetes CronJob、Node.js node-cron 等主流定时任务平台。" } }] }),
          }}
        />
        <CronGeneratorClient />
      </>
    )
}
