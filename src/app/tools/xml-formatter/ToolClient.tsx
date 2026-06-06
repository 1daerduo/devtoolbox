'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function formatXml(xml: string, indentSize: number): string {
  let formatted = ''
  let indent = 0
  const tab = ' '.repeat(indentSize)

  // Remove whitespace between tags
  xml = xml.replace(/>\s+</g, '><').trim()

  // Add newlines
  let i = 0
  while (i < xml.length) {
    if (xml[i] === '<') {
      // Closing tag
      if (xml[i + 1] === '/') {
        indent = Math.max(0, indent - 1)
        if (formatted && formatted[formatted.length - 1] !== '\n') formatted += '\n'
        formatted += tab.repeat(indent)
        const end = xml.indexOf('>', i)
        formatted += xml.substring(i, end + 1)
        i = end + 1
      }
      // Self-closing tag or declaration
      else if (xml[i + 1] === '?' || xml[i + 1] === '!') {
        if (formatted && formatted[formatted.length - 1] !== '\n') formatted += '\n'
        formatted += tab.repeat(indent)
        const end = xml.indexOf('>', i)
        formatted += xml.substring(i, end + 1)
        i = end + 1
      }
      // Opening tag
      else {
        const end = xml.indexOf('>', i)
        const tag = xml.substring(i, end + 1)
        const tagContent = xml.substring(i + 1, end)

        if (tagContent.includes('/')) {
          // Self-closing
          if (formatted && formatted[formatted.length - 1] !== '\n') formatted += '\n'
          formatted += tab.repeat(indent)
          formatted += tag
          i = end + 1
        } else {
          if (formatted && formatted[formatted.length - 1] !== '\n') formatted += '\n'
          formatted += tab.repeat(indent)
          formatted += tag
          indent++
          i = end + 1

          // Check if next char is text (not <)
          let nextTag = xml.indexOf('<', i)
          if (nextTag > i) {
            const text = xml.substring(i, nextTag).trim()
            if (text) {
              formatted += text
              i = nextTag
            }
          }

          // Check if next is closing tag
          if (xml[i] === '<' && xml[i + 1] === '/') {
            indent = Math.max(0, indent - 1)
            if (formatted[formatted.length - 1] !== '\n') formatted += '\n'
            formatted += tab.repeat(indent)
            const closeEnd = xml.indexOf('>', i)
            formatted += xml.substring(i, closeEnd + 1)
            i = closeEnd + 1
          }
        }
      }
    } else {
      i++
    }
  }

  return formatted
}

function compressXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim()
}

export default function XmlFormatterClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  const format = () => {
    setError('')
    try {
      setOutput(formatXml(input, indent))
    } catch (e: any) {
      setError('格式化失败：' + e.message)
      setOutput('')
    }
  }

  const compress = () => {
    setError('')
    try {
      setOutput(compressXml(input))
    } catch (e: any) {
      setError('压缩失败：' + e.message)
      setOutput('')
    }
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'XML 格式化' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">XML 格式化 / 压缩</h1>
      <p className="text-sm text-gray-500 mb-6">在线 XML 数据格式化、压缩，支持自定义缩进，开发者必备 XML 处理工具。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">输入 XML</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">清空</button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='粘贴 XML 数据，例如：&lt;root&gt;&lt;name&gt;MoreToolbox&lt;/name&gt;&lt;/root&gt;'
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
              {output || '结果将显示在这里...'}
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
          缩进：
          <select value={indent} onChange={e => setIndent(Number(e.target.value))}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
          </select>
        </label>
      </div>

      <RelatedTools current="xml-formatter" />
    </div>
  )
}
