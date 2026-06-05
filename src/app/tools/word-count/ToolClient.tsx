'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface Stats {
  chars: number
  charsNoSpaces: number
  words: number
  lines: number
  paragraphs: number
  sentences: number
  chineseChars: number
  englishWords: number
  numbers: number
  punctuation: number
}

function countStats(text: string): Stats {
  const lines = text === '' ? 0 : text.split('\n').length
  const paragraphs = text === '' ? 0 : text.split('\n').filter((l) => l.trim() !== '').length
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length
  const numbers = (text.match(/\d+/g) || []).length
  const punctuation = (text.match(/[，。！？、；：""''（）【】《》\.,!?;:'"()\[\]{}]/g) || []).length

  const words = text === '' ? 0 : text.trim().split(/\s+/).length
  const sentences = text === '' ? 0 : (text.match(/[。！？!?.]+/g) || []).length || (text.trim() === '' ? 0 : 1)

  return { chars, charsNoSpaces, words, lines, paragraphs, sentences, chineseChars, englishWords, numbers, punctuation }
}

export default function WordCountClient() {
  const [text, setText] = useState('')

  const stats = useMemo(() => countStats(text), [text])

  const statItems = [
    { label: '总字符数', value: stats.chars },
    { label: '字符数（不含空格）', value: stats.charsNoSpaces },
    { label: '中文字符', value: stats.chineseChars },
    { label: '英文单词', value: stats.englishWords },
    { label: '单词数', value: stats.words },
    { label: '行数', value: stats.lines },
    { label: '段落数', value: stats.paragraphs },
    { label: '句子数', value: stats.sentences },
    { label: '数字个数', value: stats.numbers },
    { label: '标点符号', value: stats.punctuation },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '字数统计' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          在线字数统计工具
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          实时统计文本的字符数、中文字符、英文单词、段落数、句子数等多项指标
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {statItems.map((item) => (
            <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-3 text-center">
              <div className="text-2xl font-bold text-primary-600">{item.value.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Text input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          输入文本
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此粘贴或输入文本内容..."
          className="w-full min-h-[200px] sm:min-h-[300px] border rounded-lg p-3 text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none resize-y"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setText('')}
            className="text-gray-500 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium min-h-[44px]"
          >
            清空
          </button>
          <CopyButton text={text} />
        </div>

        <RelatedTools current="word-count" />
      </div>
    </div>
  )
}
