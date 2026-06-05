import type { Metadata } from 'next'
import CronGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Cron 表达式生成器 - 在线定时任务表达式工具 - DevToolbox',
  description: '免费在线 Cron 表达式生成器，可视化配置定时任务表达式，实时预览下次执行时间。支持秒级/分级 Cron，Linux/Crontab/Spring 兼容。',
  keywords: 'Cron表达式, Cron生成器, crontab, 定时任务, cron job, 在线cron工具, cron表达式在线, 定时表达式',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/cron-generator' },
}

export default function Page() {
  return <CronGeneratorClient />
}
