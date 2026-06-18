'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

type Direction = 'json2xml' | 'xml2json'

// JSON → XML
function jsonToXml(json: string, rootName = 'root'): string {
  const data = JSON.parse(json)
  const buildXml = (obj: unknown, nodeName: string, indent: string): string => {
    if (obj === null || obj === undefined) {
      return `${indent}<${nodeName}/>`
    }
    if (typeof obj !== 'object') {
      return `${indent}<${nodeName}>${escapeXml(String(obj))}</${nodeName}>`
    }
    if (Array.isArray(obj)) {
      return obj
        .map(item => `${indent}<${nodeName}>${buildXml(item, 'item', indent).replace(/^\s+/, '').replace(/^<item>|<\/item>$/g, '')}</${nodeName}>`)
        .join('\n')
    }
    const objDict = obj as Record<string, unknown>
    const attrs: string[] = []
    const childs: string[] = []
    Object.keys(objDict).forEach(key => {
      const val = objDict[key]
      if (val === null || val === undefined) {
        childs.push(`${indent}  <${key}/>`)
      } else if (typeof val === 'object') {
        childs.push(buildXml(val, key, indent + '  '))
      } else if (key.startsWith('@')) {
        attrs.push(`${key.slice(1)}="${escapeXml(String(val))}"`)
      } else if (key === '#text') {
        childs.push(escapeXml(String(val)))
      } else {
        childs.push(`${indent}  <${key}>${escapeXml(String(val))}</${key}>`)
      }
    })
    if (childs.length === 0) {
      return `${indent}<${nodeName}${attrs.length ? ' ' + attrs.join(' ') : ''}/>`
    }
    return `${indent}<${nodeName}${attrs.length ? ' ' + attrs.join(' ') : ''}>\n${childs.join('\n')}\n${indent}</${nodeName}>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${buildXml(data, rootName, '')}`
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// XML → JSON (简化版)
function xmlToJson(xml: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')
  const errorNode = doc.querySelector('parsererror')
  if (errorNode) {
    throw new Error('XML 解析失败，请检查格式')
  }
  const convert = (node: Element): unknown => {
    const children = Array.from(node.children)
    if (children.length === 0) {
      const text = node.textContent?.trim() || ''
      // 尝试解析为数字/布尔
      if (text === '') return ''
      if (text === 'true') return true
      if (text === 'false') return false
      if (text === 'null') return null
      const num = Number(text)
      if (!isNaN(num) && /^-?\d+(\.\d+)?$/.test(text)) return num
      return text
    }
    // 分组：同名元素合并为数组
    const grouped: Record<string, Element[]> = {}
    children.forEach(c => {
      const tag = c.tagName
      if (!grouped[tag]) grouped[tag] = []
      grouped[tag].push(c)
    })
    const result: Record<string, unknown> = {}
    Object.keys(grouped).forEach(tag => {
      const arr = grouped[tag]
      if (arr.length === 1) {
        result[tag] = convert(arr[0])
      } else {
        result[tag] = arr.map(c => convert(c))
      }
    })
    // 如果只有单个子元素且 key 是 'item'，可能是数组
    if (Object.keys(result).length === 1 && result['item'] !== undefined) {
      const v = result['item']
      if (Array.isArray(v)) return v
      return [v]
    }
    return result
  }
  const root = doc.documentElement
  return JSON.stringify(convert(root), null, 2)
}

export default function JsonXmlConverterClient() {
  const [direction, setDirection] = useState<Direction>('json2xml')
  const [input, setInput] = useState('{\n  "name": "MoreToolbox",\n  "tools": 70,\n  "category": {\n    "type": "developer",\n    "free": true\n  },\n  "tags": ["JSON", "格式化", "在线工具"]\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [rootName, setRootName] = useState('root')

  const handleConvert = () => {
    setError('')
    setOutput('')
    try {
      if (direction === 'json2xml') {
        const result = jsonToXml(input, rootName)
        setOutput(result)
      } else {
        const result = xmlToJson(input)
        setOutput(result)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '转换失败')
    }
  }

  const handleSwap = () => {
    if (direction === 'json2xml') {
      setDirection('xml2json')
      if (output) {
        setInput(output)
        try {
          setOutput(xmlToJson(output))
        } catch {}
      }
    } else {
      setDirection('json2xml')
      if (output) {
        setInput(output)
        try {
          setOutput(jsonToXml(output, rootName))
        } catch {}
      }
    }
  }

  const loadSampleJson = () => {
    setDirection('json2xml')
    setInput('{\n  "user": {\n    "id": 1001,\n    "name": "张三",\n    "email": "zhangsan@example.com",\n    "active": true\n  },\n  "scores": [85, 92, 78]\n}')
    setOutput('')
  }

  const loadSampleXml = () => {
    setDirection('xml2json')
    setInput('<?xml version="1.0" encoding="UTF-8"?>\n<order>\n  <id>2024001</id>\n  <customer>李四</customer>\n  <items>\n    <item>商品A</item>\n    <item>商品B</item>\n  </items>\n  <total>299.00</total>\n</order>')
    setOutput('')
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JSON ↔ XML 转换器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JSON ↔ XML 在线转换器 | JSON XML Converter</h1>
      <p className="text-sm text-gray-500 mb-6">在线 JSON 和 XML 数据格式互转，支持嵌套对象、数组、自动格式化、一键复制。无需上传，本地浏览器处理。</p>

      {/* 方向切换 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          <button onClick={() => setDirection('json2xml')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              direction === 'json2xml' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
            JSON → XML
          </button>
          <button onClick={() => setDirection('xml2json')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              direction === 'xml2json' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
            XML → JSON
          </button>
        </div>
        <button onClick={handleSwap}
          className="text-sm text-gray-500 hover:text-primary-600">
          ⇄ 交换
        </button>
        {direction === 'json2xml' && (
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs text-gray-500">根节点:</label>
            <input value={rootName} onChange={e => setRootName(e.target.value)} placeholder="root"
              className="px-2 py-1 border border-gray-300 rounded text-sm w-24" />
          </div>
        )}
        <button onClick={direction === 'json2xml' ? loadSampleJson : loadSampleXml}
          className="text-xs text-primary-600 hover:text-primary-700">
          加载示例
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 输入 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-800">
              {direction === 'json2xml' ? '📥 JSON 输入' : '📥 XML 输入'}
            </h3>
            <button onClick={() => setInput('')} className="text-xs text-gray-400 hover:text-red-600">清空</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={16}
            placeholder={direction === 'json2xml' ? '粘贴 JSON 数据...' : '粘贴 XML 数据...'}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500" />
        </div>

        {/* 输出 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-800">
              {direction === 'json2xml' ? '📤 XML 输出' : '📤 JSON 输出'}
            </h3>
            {output && <CopyButton text={output} />}
          </div>
          <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-auto whitespace-pre-wrap break-all h-[480px] overflow-y-auto">
            {output || (error ? `❌ ${error}` : '点击"转换"按钮开始...')}
          </pre>
        </div>
      </div>

      <button onClick={handleConvert}
        className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
        🔄 转换
      </button>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          ⚠️ {error}
        </div>
      )}

      <RelatedTools current="json-xml-converter" />
    </div>
  )
}
