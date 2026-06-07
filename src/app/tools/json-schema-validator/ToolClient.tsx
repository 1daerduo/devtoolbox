'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

const EXAMPLE_SCHEMA = `{
  "type": "object",
  "required": ["name", "age"],
  "properties": {
    "name": { "type": "string", "minLength": 2 },
    "age": { "type": "number", "minimum": 0, "maximum": 150 },
    "email": { "type": "string", "format": "email" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}`

const EXAMPLE_DATA = `{
  "name": "Alice",
  "age": 28,
  "email": "alice@example.com",
  "tags": ["developer", "designer"]
}`

interface ValidationError {
  path: string
  message: string
}

function validateJsonSchema(schema: Record<string, unknown>, data: unknown, path = '$'): ValidationError[] {
  const errors: ValidationError[] = []

  if (!schema || typeof schema !== 'object') return errors

  const s = schema as Record<string, unknown>

  // type check
  if (s.type) {
    const types = Array.isArray(s.type) ? s.type : [s.type]
    const dataType = Array.isArray(data) ? 'array' : data === null ? 'null' : typeof data
    if (!types.includes(dataType)) {
      errors.push({ path, message: `期望类型 ${types.join('|')}，实际为 ${dataType}` })
      return errors
    }
  }

  if (s.type === 'object' && data && typeof data === 'object' && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>
    // required
    if (Array.isArray(s.required)) {
      for (const key of s.required as string[]) {
        if (!(key in obj)) {
          errors.push({ path: `${path}.${key}`, message: `缺少必需字段 "${key}"` })
        }
      }
    }
    // properties
    if (s.properties && typeof s.properties === 'object') {
      for (const [key, propSchema] of Object.entries(s.properties as Record<string, Record<string, unknown>>)) {
        if (key in obj) {
          errors.push(...validateJsonSchema(propSchema, obj[key], `${path}.${key}`))
        }
      }
    }
    // additionalProperties
    if (s.additionalProperties === false && s.properties) {
      const allowed = Object.keys(s.properties as object)
      for (const key of Object.keys(obj)) {
        if (!allowed.includes(key)) {
          errors.push({ path: `${path}.${key}`, message: `不允许的额外字段 "${key}"` })
        }
      }
    }
  }

  if (s.type === 'array' && Array.isArray(data)) {
    const arr = data as unknown[]
    // items
    if (s.items && typeof s.items === 'object') {
      for (let i = 0; i < arr.length; i++) {
        errors.push(...validateJsonSchema(s.items as Record<string, unknown>, arr[i], `${path}[${i}]`))
      }
    }
    // minItems / maxItems
    if (typeof s.minItems === 'number' && arr.length < s.minItems) {
      errors.push({ path, message: `数组长度 ${arr.length} < 最小值 ${s.minItems}` })
    }
    if (typeof s.maxItems === 'number' && arr.length > s.maxItems) {
      errors.push({ path, message: `数组长度 ${arr.length} > 最大值 ${s.maxItems}` })
    }
  }

  if (s.type === 'string' && typeof data === 'string') {
    if (typeof s.minLength === 'number' && data.length < s.minLength) {
      errors.push({ path, message: `字符串长度 ${data.length} < 最小值 ${s.minLength}` })
    }
    if (typeof s.maxLength === 'number' && data.length > s.maxLength) {
      errors.push({ path, message: `字符串长度 ${data.length} > 最大值 ${s.maxLength}` })
    }
    if (s.pattern && typeof s.pattern === 'string') {
      try {
        if (!new RegExp(s.pattern).test(data)) {
          errors.push({ path, message: `不匹配模式 /${s.pattern}/` })
        }
      } catch { /* ignore invalid regex in schema */ }
    }
    if (s.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
      errors.push({ path, message: '格式不符合 email' })
    }
    if (s.enum && Array.isArray(s.enum) && !s.enum.includes(data)) {
      errors.push({ path, message: `值不在枚举范围 [${s.enum.join(', ')}]` })
    }
  }

  if ((s.type === 'number' || s.type === 'integer') && typeof data === 'number') {
    if (typeof s.minimum === 'number' && data < s.minimum) {
      errors.push({ path, message: `值 ${data} < 最小值 ${s.minimum}` })
    }
    if (typeof s.maximum === 'number' && data > s.maximum) {
      errors.push({ path, message: `值 ${data} > 最大值 ${s.maximum}` })
    }
  }

  return errors
}

export default function ToolClient() {
  const [schemaText, setSchemaText] = useState(EXAMPLE_SCHEMA)
  const [dataText, setDataText] = useState(EXAMPLE_DATA)
  const [result, setResult] = useState<{ valid: boolean; errors: ValidationError[]; message: string } | null>(null)

  const validate = useCallback(() => {
    try {
      const schema = JSON.parse(schemaText)
      const data = JSON.parse(dataText)
      const errors = validateJsonSchema(schema, data)
      if (errors.length === 0) {
        setResult({ valid: true, errors: [], message: '✅ JSON 数据符合 Schema 定义' })
      } else {
        setResult({ valid: false, errors, message: `❌ 发现 ${errors.length} 个验证错误` })
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setResult({ valid: false, errors: [], message: `JSON 解析错误: ${msg}` })
    }
  }, [schemaText, dataText])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JSON Schema 验证器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">JSON Schema 验证器</h1>
      <p className="text-gray-600 mb-6">通过 JSON Schema 定义校验 JSON 数据结构的正确性</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">JSON Schema 定义</label>
          <textarea value={schemaText} onChange={(e) => setSchemaText(e.target.value)}
            className="w-full border rounded-lg p-3 font-mono text-sm h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="粘贴 JSON Schema..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">待验证 JSON 数据</label>
          <textarea value={dataText} onChange={(e) => setDataText(e.target.value)}
            className="w-full border rounded-lg p-3 font-mono text-sm h-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="粘贴 JSON 数据..." />
        </div>
      </div>

      <button onClick={validate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4">
        验证 JSON
      </button>

      {result && (
        <div className={`border rounded-lg p-4 mb-4 ${result.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`font-medium mb-2 ${result.valid ? 'text-green-700' : 'text-red-700'}`}>{result.message}</p>
          {result.errors.length > 0 && (
            <ul className="space-y-1">
              {result.errors.map((err, i) => (
                <li key={i} className="text-sm text-red-600 font-mono">
                  <span className="font-semibold">{err.path}</span>: {err.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">支持的 Schema 关键字：</p>
        <p>type, required, properties, additionalProperties, items, minItems, maxItems, minLength, maxLength, pattern, format(email), enum, minimum, maximum</p>
      </div>

      <RelatedTools current="json-schema-validator" />
    </div>
  )
}
