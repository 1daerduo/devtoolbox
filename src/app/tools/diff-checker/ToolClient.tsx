'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  lineNumA?: number
  lineNumB?: number
}

function computeDiff(textA: string, textB: string): DiffLine[] {
  const linesA = textA.split('\n')
  const linesB = textB.split('\n')

  // LCS-based diff
  const m = linesA.length
  const n = linesB.length

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  // Backtrack to produce diff
  const result: DiffLine[] = []
  const temp: { type: 'added' | 'removed' | 'unchanged'; lineA?: number; lineB?: number }[] = []

  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      temp.unshift({ type: 'unchanged', lineA: i - 1, lineB: j - 1 })
      i--; j--
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.unshift({ type: 'added', lineB: j - 1 })
      j--
    } else {
      temp.unshift({ type: 'removed', lineA: i - 1 })
      i--
    }
  }

  let numA = 0, numB = 0
  for (const item of temp) {
    if (item.type === 'unchanged') {
      result.push({
        type: 'unchanged',
        content: linesA[item.lineA!],
        lineNumA: ++numA,
        lineNumB: ++numB,
      })
    } else if (item.type === 'removed') {
      result.push({
        type: 'removed',
        content: linesA[item.lineA!],
        lineNumA: ++numA,
      })
    } else {
      result.push({
        type: 'added',
        content: linesB[item.lineB!],
        lineNumB: ++numB,
      })
    }
  }

  return result
}

export default function DiffCheckerClient() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [showUnchanged, setShowUnchanged] = useState(true)

  const diff = useMemo(() => {
    if (!textA && !textB) return []
    return computeDiff(textA, textB)
  }, [textA, textB])

  const filtered = showUnchanged ? diff : diff.filter(l => l.type !== 'unchanged')

  const stats = useMemo(() => {
    const added = diff.filter(l => l.type === 'added').length
    const removed = diff.filter(l => l.type === 'removed').length
    return { added, removed }
  }, [diff])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '文本差异对比' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">文本差异对比 | Diff Checker</h1>
      <p className="text-sm text-gray-500 mb-6">
        在线文本差异对比，左右并排显示两个文本的差异，高亮标记新增、删除、修改的行。
        支持代码 diff、文档版本对比等场景。
      </p>

      {/* Input area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">原始文本</label>
            <button onClick={() => setTextA('')}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[200px] lg:h-64 border rounded-lg p-3 font-mono text-xs bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={textA}
            onChange={e => setTextA(e.target.value)}
            placeholder="粘贴原始文本..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">修改后文本</label>
            <button onClick={() => setTextB('')}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[200px] lg:h-64 border rounded-lg p-3 font-mono text-xs bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={textB}
            onChange={e => setTextB(e.target.value)}
            placeholder="粘贴修改后文本..."
          />
        </div>
      </div>

      {/* Stats */}
      {diff.length > 0 && (
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="text-green-600 font-medium">+{stats.added} 行新增</span>
          <span className="text-red-600 font-medium">-{stats.removed} 行删除</span>
          <label className="flex items-center gap-1 text-gray-500 cursor-pointer">
            <input type="checkbox" checked={showUnchanged} onChange={e => setShowUnchanged(e.target.checked)} />
            显示未更改
          </label>
        </div>
      )}

      {/* Diff output */}
      {filtered.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden font-mono text-xs">
          <div className="grid grid-cols-[20px_1fr] lg:grid-cols-[30px_30px_1fr] bg-gray-50">
            <div className="hidden lg:block border-r border-gray-200 px-1 text-gray-400 text-center">A</div>
            <div className="hidden lg:block border-r border-gray-200 px-1 text-gray-400 text-center">B</div>
            <div className="px-3 py-1 text-gray-400">Diff</div>
          </div>
          <div className="max-h-[500px] overflow-auto">
            {filtered.map((line, idx) => {
              let bgColor = ''
              let prefix = ' '
              if (line.type === 'added') { bgColor = 'bg-green-50'; prefix = '+' }
              else if (line.type === 'removed') { bgColor = 'bg-red-50'; prefix = '-' }

              return (
                <div key={idx} className={`grid grid-cols-[20px_1fr] lg:grid-cols-[30px_30px_1fr] ${bgColor} hover:bg-opacity-80`}>
                  <div className="hidden lg:block border-r border-gray-200 px-1 text-gray-400 text-right">
                    {line.lineNumA || ''}
                  </div>
                  <div className="hidden lg:block border-r border-gray-200 px-1 text-gray-400 text-right">
                    {line.lineNumB || ''}
                  </div>
                  <div className={`px-3 py-0.5 whitespace-pre ${line.type === 'added' ? 'text-green-800' : line.type === 'removed' ? 'text-red-800' : 'text-gray-800'}`}>
                    <span className={`${line.type === 'added' ? 'text-green-600' : line.type === 'removed' ? 'text-red-600' : 'text-gray-300'} mr-2 select-none`}>
                      {prefix}
                    </span>
                    {line.content}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {textA && textB && diff.length === 0 && (
        <div className="p-4 bg-gray-50 rounded-lg text-gray-500 text-center">输入两个文本后点击对比</div>
      )}

      <RelatedTools current="diff-checker" />
    </div>
  )
}
