'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant'

const CASE_LABELS: Record<CaseType, { name: string; example: string }> = {
  upper: { name: '大写', example: 'HELLO WORLD' },
  lower: { name: '小写', example: 'hello world' },
  title: { name: '首字母大写', example: 'Hello World' },
  sentence: { name: '句首大写', example: 'Hello world' },
  camel: { name: '驼峰 camelCase', example: 'helloWorld' },
  pascal: { name: '帕斯卡 PascalCase', example: 'HelloWorld' },
  snake: { name: '蛇形 snake_case', example: 'hello_world' },
  kebab: { name: '短横 kebab-case', example: 'hello-world' },
  constant: { name: '常量 CONSTANT_CASE', example: 'HELLO_WORLD' },
}

const CASE_ORDER: CaseType[] = ['upper', 'lower', 'title', 'sentence', 'camel', 'pascal', 'snake', 'kebab', 'constant']

function convert(text: string, type: CaseType): string {
  const words = text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return ''

  switch (type) {
    case 'upper': return words.join(' ').toUpperCase()
    case 'lower': return words.join(' ').toLowerCase()
    case 'title': return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    case 'sentence': return words[0].charAt(0).toUpperCase() + words[0].slice(1) + (words.length > 1 ? ' ' + words.slice(1).join(' ') : '')
    case 'camel': return words[0].toLowerCase() + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    case 'pascal': return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    case 'snake': return words.join('_')
    case 'kebab': return words.join('-')
    case 'constant': return words.join('_').toUpperCase()
  }
}

export default function CaseConverterClient() {
  const [input, setInput] = useState('')

  const results = useMemo(() => {
    if (!input.trim()) return {} as Record<CaseType, string>
    const r = {} as Record<CaseType, string>
    CASE_ORDER.forEach((t) => { r[t] = convert(input, t) })
    return r
  }, [input])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '大小写转换' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          在线文本大小写转换工具 | Case Converter
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持大写、小写、首字母大写、驼峰、蛇形、短横等 9 种格式转换，输入即出结果
        </p>

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">输入文本</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入需要转换的文本，例如：hello world 或 hello_world..."
          className="w-full min-h-[100px] sm:min-h-[140px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 space-y-3">
            {CASE_ORDER.map((type) => {
              const info = CASE_LABELS[type]
              return (
                <div key={type} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 mb-1">{info.name} · {info.example}</div>
                    <code className="font-mono text-sm text-gray-900 break-all">{results[type]}</code>
                  </div>
                  <CopyButton text={results[type]} />
                </div>
              )
            })}
          </div>
        )}

        <RelatedTools current="case-converter" />
      </div>
    </div>
  )
}
