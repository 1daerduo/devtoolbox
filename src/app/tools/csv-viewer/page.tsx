import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSV 表格查看器 - 在线 CSV 数据浏览编辑工具 | MoreToolbox',
  description: '免费在线 CSV 表格查看器，支持粘贴/拖拽上传 CSV/TSV 文件，自动检测分隔符，表格式可视化浏览，搜索筛选排序。纯浏览器端处理，数据安全。',
  keywords: ['CSV 查看器', 'CSV viewer', '在线 CSV 表格', 'CSV 浏览', 'TSV 查看', '分隔符文件查看', 'csv table viewer online', '表格数据浏览'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/csv-viewer',
  },
}

export default function CsvViewerPage() {
  return <ToolClient />
}
