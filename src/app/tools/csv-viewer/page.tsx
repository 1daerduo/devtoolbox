import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'CSV 表格查看器 - 在线 CSV 数据浏览编辑工具 | MoreToolbox',
  description: '免费在线 CSV/TSV 表格查看器，支持粘贴或拖拽上传文件，自动检测逗号/制表符/分号等分隔符，表格式可视化浏览大文件数据。内置搜索、筛选、排序功能，支持分页浏览。纯浏览器端处理，数据不会上传服务器，安全放心。 | Free online CSV/TSV table viewer. Paste or drag-drop files, auto-detect delimiter. Sort, filter, search with pagination. 100% browser-side processing, no data upload.',
  keywords: ['CSV 查看器', 'CSV viewer', '在线 CSV 表格', 'CSV 浏览', 'TSV 查看', '分隔符文件查看', 'csv table viewer online', '表格数据浏览'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/csv-viewer',
  },
}

export default function CsvViewerPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "CSV 表格查看器", "item": "https://moretoolbox.com/tools/csv-viewer" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSV 表格查看器 - MoreToolbox", "description": "在线 CSV/TSV 数据表格式浏览与搜索筛选 | Free online CSV data table viewer", "url": "https://moretoolbox.com/tools/csv-viewer", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
