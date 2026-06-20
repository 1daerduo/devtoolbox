'use client'

import { useState, useMemo, useCallback } from 'react'
import { marked } from 'marked'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const DEFAULT_MD = `# Markdown 编辑器

欢迎使用 **Markdown 编辑器**！

## 功能列表

- ✅ 实时预览
- ✅ 一键复制 HTML
- ✅ 下载 .md 文件
- ✅ 全在浏览器本地运行

## 代码示例

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## 表格

| 功能 | 状态 |
|------|------|
| 实时预览 | ✅ |
| 导出 HTML | ✅ |
| 下载 MD | ✅ |

> 提示：编辑左侧内容，右侧实时预览效果。

---

[访问 MoreToolbox](https://moretoolbox.com)
`

type Tab = 'edit' | 'preview'

export default function MarkdownEditorClient() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD)
  const [tab, setTab] = useState<Tab>('edit')
  const [copied, setCopied] = useState(false)

  const html = useMemo(() => {
    try {
      return marked.parse(markdown, { gfm: true }) as string
    } catch {
      return '<p class="text-red-600">Markdown 解析出错</p>'
    }
  }, [markdown])

  const downloadMd = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [markdown])

  const copyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = html
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [html])

  const downloadHtml = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Exported</title>
<style>body{max-width:800px;margin:40px auto;padding:0 20px;font-family:system-ui,sans-serif;line-height:1.7;color:#1a1a1a}h1{border-bottom:1px solid #e5e5e5;padding-bottom:8px}pre{background:#f5f5f5;padding:12px;border-radius:6px;overflow-x:auto}code{background:#f0f0f0;padding:2px 5px;border-radius:3px;font-size:0.9em}pre code{background:none}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px}th{background:#f5f5f5}blockquote{border-left:4px solid #ddd;margin:0;padding-left:16px;color:#666}</style>
</head><body>${html}</body></html>`
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.html'
    a.click()
    URL.revokeObjectURL(url)
  }, [html])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Markdown 编辑器' }]} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              在线 Markdown 编辑器 | Online Markdown Editor
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              支持实时预览，可导出 HTML 或下载 .md 文件
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={copyHtml}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[36px]"
            >
              {copied ? '已复制 HTML' : '复制 HTML'}
            </button>
            <button
              onClick={downloadHtml}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[36px]"
            >
              导出 HTML
            </button>
            <button
              onClick={downloadMd}
              className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 min-h-[36px]"
            >
              下载 .md
            </button>
          </div>
        </div>

        {/* Mobile tab switch */}
        <div className="flex md:hidden mb-3 gap-2">
          {(['edit', 'preview'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                tab === t ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              {t === 'edit' ? '✏️ 编辑' : '👁 预览'}
            </button>
          ))}
        </div>

        {/* Editor + Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[500px]">
          {/* Editor */}
          <div className={`${tab === 'preview' ? 'hidden md:flex' : 'flex'} flex-col`}>
            <label className="text-sm font-medium text-gray-700 mb-1.5">Markdown 输入</label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 w-full min-h-[500px] border border-gray-300 rounded-lg p-3 font-mono text-sm bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
              placeholder="在此输入 Markdown..."
            />
          </div>

          {/* Preview */}
          <div className={`${tab === 'edit' ? 'hidden md:flex' : 'flex'} flex-col`}>
            <label className="text-sm font-medium text-gray-700 mb-1.5">实时预览</label>
            <div
              className="flex-1 w-full min-h-[500px] border border-gray-300 rounded-lg p-4 bg-white overflow-auto prose prose-sm max-w-none"
              // Use a wrapper div for the preview
            >
              <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>

        {/* Word/char count */}
        <div className="mt-4 text-xs text-gray-400 flex gap-4">
          <span>字符数：{markdown.length}</span>
          <span>行数：{markdown.split('\n').length}</span>
          <span>汉字：{Array.from(markdown).filter(c => /\p{Script=Han}/u.test(c)).length}</span>
        </div>

        <RelatedTools current="markdown-editor" />
      </div>
    </div>
  )
}
