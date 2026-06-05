'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function formatSql(sql: string, dialect: string, keywordCase: 'upper' | 'lower'): string {
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'FULL', 'CROSS', 'ON',
    'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'VIEW',
    'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'HAVING',
    'AS', 'DISTINCT', 'LIMIT', 'OFFSET', 'UNION', 'ALL',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    'NULL', 'IS', 'EXISTS', 'TRUE', 'FALSE',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'PRIMARY', 'KEY', 'FOREIGN',
    'REFERENCES', 'DEFAULT', 'CHECK', 'UNIQUE', 'CONSTRAINT',
    'IF', 'RETURN', 'DECLARE', 'EXEC', 'GO', 'WITH', 'RECURSIVE',
  ]

  // Normalize whitespace
  sql = sql.replace(/\s+/g, ' ').trim()

  // Split into tokens
  const tokens: string[] = []
  let i = 0
  let current = ''

  while (i < sql.length) {
    const ch = sql[i]

    if (ch === "'") {
      if (current) { tokens.push(current); current = '' }
      let str = "'"
      i++
      while (i < sql.length) {
        str += sql[i]
        if (sql[i] === "'" && sql[i + 1] === "'") { str += "'"; i++ }
        else if (sql[i] === "'") { i++; break }
        i++
      }
      tokens.push(str)
      continue
    }

    if (ch === '(' || ch === ')' || ch === ',' || ch === ';') {
      if (current.trim()) { tokens.push(current.trim()); current = '' }
      tokens.push(ch)
      i++
      continue
    }

    current += ch
    i++
  }
  if (current.trim()) tokens.push(current.trim())

  // Format
  let result = ''
  let indent = 0
  const tab = '  '
  let needNewline = true

  const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'HAVING', 'LIMIT',
    'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'SET', 'VALUES',
    'LEFT', 'RIGHT', 'INNER', 'FULL', 'CROSS', 'JOIN', 'ON', 'UNION', 'WITH']

  for (let t = 0; t < tokens.length; t++) {
    let token = tokens[t]
    const upper = token.toUpperCase()

    // Keyword casing
    if (keywords.includes(upper)) {
      token = keywordCase === 'upper' ? upper : upper.toLowerCase()
    }

    // Major keyword starts new line
    if (majorKeywords.includes(upper) && needNewline) {
      if (result && result[result.length - 1] !== '\n') result += '\n'
      result += tab.repeat(indent)
    }

    // Semicolon
    if (token === ';') {
      result += ';'
      if (t < tokens.length - 1) result += '\n\n'
      needNewline = true
      continue
    }

    // Open paren
    if (token === '(') {
      result += ' ('
      indent++
      needNewline = true
      continue
    }

    // Close paren
    if (token === ')') {
      indent = Math.max(0, indent - 1)
      if (result[result.length - 1] === '\n') result += tab.repeat(indent)
      result += ')'
      needNewline = true
      continue
    }

    // Comma
    if (token === ',') {
      result += ', '
      needNewline = false
      continue
    }

    if (needNewline && result && result[result.length - 1] !== '\n' && result[result.length - 1] !== ' ') {
      result += ' '
    }

    result += token
    needNewline = true

    // Add line break after major keywords
    if (upper === 'SELECT' || upper === 'FROM' || upper === 'WHERE') {
      result += '\n' + tab.repeat(indent)
    }
  }

  return result.trim()
}

export default function SqlFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [dialect, setDialect] = useState('standard')
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower'>('upper')

  const format = () => {
    setError('')
    try {
      setOutput(formatSql(input, dialect, keywordCase))
    } catch (e: any) {
      setError('格式化失败：' + e.message)
    }
  }

  const compress = () => {
    setError('')
    try {
      setOutput(input.replace(/\s+/g, ' ').trim())
    } catch (e: any) {
      setError('压缩失败：' + e.message)
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'SQL 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">SQL 在线格式化 / 美化</h1>
      <p className="text-sm text-gray-500 mb-6">
        在线 SQL 语句格式化与压缩，支持 MySQL、PostgreSQL、SQLite 等常见数据库方言，自定义关键字大小写。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 SQL</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="SELECT id, name, email FROM users WHERE status = 'active' ORDER BY created_at DESC"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输出结果</label>
            {output && <CopyButton text={output} />}
          </div>
          {error ? (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 rounded-lg p-3 text-sm text-red-600 overflow-auto">
              {error}
            </div>
          ) : (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 border-gray-300 overflow-auto whitespace-pre-wrap">
              {output || '格式化结果将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button onClick={format}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
          格式化
        </button>
        <button onClick={compress}
          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium min-h-[44px]">
          压缩
        </button>
        <label className="text-sm text-gray-600">
          关键字：
          <select value={keywordCase} onChange={e => setKeywordCase(e.target.value as 'upper' | 'lower')}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
            <option value="upper">大写</option>
            <option value="lower">小写</option>
          </select>
        </label>
      </div>

      <RelatedTools current="sql-formatter" />
    </div>
  )
}
