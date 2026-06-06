import type { Metadata } from 'next'
import MetaTagClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Meta 标签在线生成器 - SEO元标签/OG/Twitter Card - DevToolbox',
  description: '在线生成 SEO Meta 标签、Open Graph 标签和 Twitter Card 标签，可视化预览社交媒体分享效果，一键复制 HTML 代码。',
  keywords: ['Meta标签生成', 'SEO元标签', 'Open Graph', 'OG标签', 'Twitter Card', '网页描述', '搜索引擎优化'],
  alternates: { canonical: '/tools/meta-tag' },
}

export default function Page() {
  return <MetaTagClient />
}
