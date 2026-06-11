'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

function minifyJs(js: string): string {
  let result = js
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/([^:]|^)\/\/.*$/gm, '$1')
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove leading/trailing whitespace on each line
  result = result.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n')
  // Collapse multiple newlines
  result = result.replace(/\n{2,}/g, '\n')
  // Remove whitespace around operators (careful with strings)
  const lines = result.split('\n')
  const minified = lines.map(line => {
    // Simple: trim each line and collapse internal whitespace (outside strings)
    return line.replace(/\s+/g, ' ').trim()
  }).join(';')
  // Remove unnecessary semicolons
  return minified.replace(/;{2,}/g, ';').replace(/;}/g, '}').replace(/;;/g, ';')
}

export default function JsMinifierClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState<{ original: number; minified: number; saved: string } | null>(null)

  const minify = useCallback(() => {
    try {
      if (!input.trim()) {
        setError('请输入 JavaScript 代码')
        setOutput('')
        setStats(null)
        return
      }
      const originalSize = new Blob([input]).size
      const minified = minifyJs(input)
      const minifiedSize = new Blob([minified]).size
      const savedPercent = originalSize > 0 ? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1) : '0'
      setOutput(minified)
      setError('')
      setStats({ original: originalSize, minified: minifiedSize, saved: savedPercent })
    } catch (e: any) {
      setError(e.message)
      setOutput('')
      setStats(null)
    }
  }, [input])

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    return (bytes / 1024).toFixed(1) + ' KB'
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JS 压缩' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">JavaScript 在线压缩 / Minify</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">一键压缩 JavaScript 代码，去除注释和空白符，减小文件体积，提升网页加载速度。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">输入 JavaScript</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); setStats(null) }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`// 示例 JavaScript\nfunction greet(name) {\n  const message = "Hello, " + name + "!";\n  console.log(message);\n  return message;\n}`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">压缩结果</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-sm text-red-600 dark:text-red-400 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-auto whitespace-pre-wrap break-all text-gray-900 dark:text-gray-100">
              {output || '压缩结果将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button onClick={minify}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          压缩 JS
        </button>
        {stats && (
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>原始: {formatBytes(stats.original)}</span>
            <span>压缩后: {formatBytes(stats.minified)}</span>
            <span className="text-green-600 dark:text-green-400 font-medium">节省 {stats.saved}%</span>
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">JavaScript 压缩的好处</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>JavaScript 压缩（Minify）移除代码中不必要的字符（注释、空白、换行），在不改变功能的前提下大幅减小文件体积。</p>
        <p><strong>常见使用场景：</strong>生产环境部署、减少网络传输时间、提升页面加载速度、降低带宽成本。</p>
        <p><strong>配合使用：</strong>使用 <a href="/tools/js-formatter" className="text-primary-600 hover:underline">JS 格式化</a> 工具可以将压缩的 JavaScript 还原为易读格式。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="js-minifier" />
    </div>
  )
}
