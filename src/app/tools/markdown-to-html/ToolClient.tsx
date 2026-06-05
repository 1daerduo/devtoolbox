'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function mdToHtml(md: string): string {
  let html = md

  // Code blocks (```lang ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')
  html = html.replace(/_(.+?)_/g, '<em>$1</em>')

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>')

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr />')
  html = html.replace(/^\*\*\*+$/gm, '<hr />')

  // Unordered lists (simple)
  html = html.replace(/^[-*+]\s+(.+)$/gm, '<li>$1</li>')
  html = html.replace(/((<li>.*<\/li>\n?)+)/g, '<ul>\n$1</ul>')

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>')

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')

  // Paragraphs - wrap remaining text lines
  html = html.replace(/^(?!<[a-z/])(.+)$/gm, '<p>$1</p>')

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}

export default function MarkdownToHtmlClient() {
  const [input, setInput] = useState('')
  const [showPreview, setShowPreview] = useState(true)

  const htmlOutput = useMemo(() => {
    if (!input.trim()) return ''
    return mdToHtml(input)
  }, [input])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Markdown 转 HTML' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Markdown 转 HTML</h1>
      <p className="text-sm text-gray-500 mb-6">
        将 Markdown 文本转换为 HTML 代码，实时预览渲染效果。支持标题、粗体、斜体、链接、图片、代码块等常用语法。
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setShowPreview(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${!showPreview ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          HTML 代码
        </button>
        <button onClick={() => setShowPreview(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${showPreview ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          实时预览
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 Markdown</label>
            <button onClick={() => setInput('')}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[300px] lg:h-96 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'# Hello World\n\nThis is **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n```js\nconsole.log("Hello")\n```'}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">{showPreview ? '预览' : 'HTML 输出'}</label>
            {htmlOutput && !showPreview && <CopyButton text={htmlOutput} />}
          </div>
          {showPreview ? (
            <div
              className="w-full min-h-[180px] sm:min-h-[300px] lg:h-96 border rounded-lg p-4 bg-white border-gray-300 overflow-auto prose prose-sm"
              dangerouslySetInnerHTML={{ __html: htmlOutput || '<p class="text-gray-400">Markdown 预览将显示在这里...</p>' }}
            />
          ) : (
            <pre className="w-full min-h-[180px] sm:min-h-[300px] lg:h-96 border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 overflow-auto whitespace-pre-wrap">
              {htmlOutput || 'HTML 代码将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <RelatedTools current="markdown-to-html" />
    </div>
  )
}
