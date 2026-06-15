'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

function htmlToMarkdown(html: string): string {
  let md = html.trim()

  // Remove doctype and html/body tags
  md = md.replace(/<!DOCTYPE[^>]*>/gi, '')
  md = md.replace(/<\/?(html|head|body|!doctype)[^>]*>/gi, '')

  // Handle code blocks (pre > code)
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, content) => {
    const decoded = decodeHtml(content.trim())
    return '\n```\n' + decoded + '\n```\n'
  })
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, content) => {
    const decoded = decodeHtml(content.trim())
    return '\n```\n' + decoded + '\n```\n'
  })

  // Handle inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')

  // Headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n')
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n')

  // Bold & Italic
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, '**$2**')
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, '*$2*')
  md = md.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, '~~$1~~')

  // Links and images
  md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, '![$2]($1)')
  md = md.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![$1]($2)')
  md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![]($1)')
  md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')

  // Horizontal rule
  md = md.replace(/<hr\s*\/?>/gi, '\n---\n')

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
    const lines = content.trim().split('\n')
    return lines.map((l: string) => '> ' + l.trim()).join('\n')
  })

  // Unordered lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
  md = md.replace(/<\/?[uo]l[^>]*>/gi, '\n')

  // Ordered lists (basic)
  // Note: simplified - treats all as unordered

  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
    let result = ''
    const thead = tableContent.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
    const tbody = tableContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)

    const parseRows = (html: string) => {
      const rows: string[][] = []
      const trMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)
      for (const tr of trMatches) {
        const cells: string[] = []
        const tdMatches = tr[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)
        for (const td of tdMatches) {
          cells.push(td[1].replace(/<[^>]*>/g, '').trim())
        }
        if (cells.length > 0) rows.push(cells)
      }
      return rows
    }

    let rows: string[][] = []
    if (thead) rows.push(...parseRows(thead[1]))
    if (tbody) rows.push(...parseRows(tbody[1]))

    // Fallback: no thead/tbody
    if (rows.length === 0) rows = parseRows(tableContent)

    if (rows.length > 0) {
      const maxCols = Math.max(...rows.map(r => r.length))
      // Normalize rows
      for (let i = 0; i < rows.length; i++) {
        while (rows[i].length < maxCols) rows[i].push('')
      }
      result = rows.map(r => '| ' + r.join(' | ') + ' |').join('\n')
      if (rows.length >= 1) {
        result = rows[0].map(() => '---').join(' | ')
        result = '| ' + result + ' |\n' + rows.slice(1).map(r => '| ' + r.join(' | ') + ' |').join('\n')
        result = '| ' + rows[0].join(' | ') + ' |\n' + result
      }
    }

    return '\n' + result + '\n'
  })

  // Paragraphs and line breaks
  md = md.replace(/<br\s*\/?>/gi, '\n')
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')

  // Remove remaining tags
  md = md.replace(/<div[^>]*>/gi, '\n')
  md = md.replace(/<\/div>/gi, '\n')
  md = md.replace(/<[^>]+>/g, '')

  // Decode HTML entities
  md = decodeHtml(md)

  // Clean up excessive newlines
  md = md.replace(/\n{3,}/g, '\n\n')
  md = md.trim()

  return md
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
}

export default function HtmlToMarkdownClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = useCallback(() => {
    try {
      if (!input.trim()) {
        setError('请输入 HTML 代码')
        setOutput('')
        return
      }
      const result = htmlToMarkdown(input)
      setOutput(result)
      setError('')
    } catch (e: any) {
      setError('转换失败: ' + e.message)
      setOutput('')
    }
  }, [input])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'HTML 转 Markdown' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">HTML 转 Markdown / HTML to Markdown</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">将 HTML 代码一键转换为 Markdown 格式，支持标题、链接、图片、表格、代码块、列表等元素。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">输入 HTML</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> text with a <a href="https://example.com">link</a>.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>'}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">Markdown 输出</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-sm text-red-600 dark:text-red-400 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {output || 'Markdown 输出将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button onClick={convert}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          转换为 Markdown
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 HTML 转 Markdown 工具？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>粘贴 HTML 代码，点击「转换为 Markdown」即可。支持常见的 HTML 元素自动转换。</p>
        <p><strong>支持的元素：</strong>标题 (h1-h6)、段落、粗体/斜体/删除线、链接、图片、列表、代码块、表格、引用、分隔线。</p>
        <p><strong>使用场景：</strong>从网页复制内容到 Markdown 编辑器、博客平台迁移、文档格式转换。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="html-to-markdown" />
    </div>
  )
}
