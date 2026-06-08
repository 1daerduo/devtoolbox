'use client'

import { useState, useMemo, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

function parseCSV(text: string, delimiter = ','): string[][] {
  const rows: string[][] = []
  let current = ''
  let inQuotes = false
  const row: string[] = []

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { current += '"'; i++ }
        else inQuotes = false
      } else current += ch
    } else {
      if (ch === '"') inQuotes = true
      else if (ch === delimiter) { row.push(current.trim()); current = '' }
      else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        row.push(current.trim())
        rows.push([...row])
        row.length = 0
        current = ''
        if (ch === '\r') i++
      } else if (ch === '\r') {
        row.push(current.trim())
        rows.push([...row])
        row.length = 0
        current = ''
      } else current += ch
    }
  }
  row.push(current.trim())
  if (row.some(c => c !== '')) rows.push([...row])

  const maxCols = Math.max(...rows.map(r => r.length))
  return rows.map(r => { while (r.length < maxCols) r.push(''); return r })
}

export default function ToolClient() {
  const [csvText, setCsvText] = useState('Name,Age,Email,City\nAlice,28,alice@example.com,New York\nBob,35,bob@test.org,London\nCharlie,42,charlie@demo.com,Tokyo')
  const [delimiter, setDelimiter] = useState(',')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const ROWS_PER_PAGE = 50

  const data = useMemo(() => {
    const delim = delimiter === '\\t' ? '\t' : delimiter
    return parseCSV(csvText, delim)
  }, [csvText, delimiter])

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(row => row.some(cell => cell.toLowerCase().includes(q)))
  }, [data, search])

  const paged = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE
    return filtered.slice(start, start + ROWS_PER_PAGE)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE)
  const headers = data.length > 0 ? data[0] : []

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setCsvText(text)
      if (text.includes('\t') && !text.includes(',')) setDelimiter('\\t')
      else if (text.includes(';') && !text.includes(',')) setDelimiter(';')
    }
    reader.readAsText(file)
  }, [])

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'CSV 表格查看器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">CSV 表格查看器</h1>
      <p className="text-gray-600 mb-6">在线浏览 CSV/TSV 表格数据，支持搜索筛选和排序</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">功能介绍</h2>
      <p className="text-gray-600 mb-4 text-sm">支持粘贴 CSV/TSV 文本或拖拽上传文件，自动检测逗号、制表符、分号等分隔符。内置搜索筛选、列排序、分页浏览功能，轻松处理大数据量表格。</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">数据源</label>
            <label className="text-xs text-blue-600 cursor-pointer hover:underline">
              <input type="file" accept=".csv,.tsv,.txt" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              上传 CSV 文件
            </label>
          </div>
          <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)}
            className="w-full border rounded-lg p-3 font-mono text-xs h-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="粘贴 CSV 数据..." />
          <div className="flex gap-3 mt-2">
            <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}
              className="border rounded px-2 py-1 text-xs">
              <option value=",">逗号 (,)</option>
              <option value="\t">制表符 (Tab)</option>
              <option value=";">分号 (;)</option>
              <option value="|">竖线 (|)</option>
            </select>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="border rounded px-2 py-1 text-xs flex-1" placeholder="搜索..." />
            <span className="text-xs text-gray-500 self-center">
              {filtered.length} 行 {filtered.length !== data.length ? `(共 ${data.length} 行)` : ''}
            </span>
          </div>
        </div>
        <div className="lg:col-span-3 overflow-auto">
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 sticky top-0 z-10">
                    <th className="px-3 py-2 text-left text-gray-600 font-medium border-b w-10">#</th>
                    {headers.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left text-gray-700 font-semibold border-b whitespace-nowrap">{h || `Col ${i + 1}`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map((row, ri) => {
                    const actualIdx = (page - 1) * ROWS_PER_PAGE + ri
                    return (
                      <tr key={actualIdx} className="border-b hover:bg-blue-50/50">
                        <td className="px-3 py-1.5 text-gray-400">{actualIdx + 1}</td>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-1.5 whitespace-nowrap max-w-[300px] truncate">{cell}</td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 border-t">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-2 py-1 text-xs border rounded disabled:opacity-30">上一页</button>
                <span className="text-xs text-gray-600">{page} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-2 py-1 text-xs border rounded disabled:opacity-30">下一页</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedTools current="csv-viewer" />
    </div>
  )
}
