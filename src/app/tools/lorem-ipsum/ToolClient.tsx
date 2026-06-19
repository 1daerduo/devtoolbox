'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ')

const ZH_WORDS = '在 现代 化 建设 中 我们 必须 坚持 以 人民 为 中心 的 发展 思想 不断 提高 人民 群众 的 获得 感 幸福 感 安全 感 要 全面 贯彻 新 时代 的 各项 方针 政策 推动 经济 社会 高 质量 发展 加强 创新 驱动 深化 改革 开放 促进 社会 公平 正义 维护 国家 安全 稳定 实现 中华 民族 伟大 复兴 的 中国 梦 这是 全体 人民 的 共同 期望 也 是 历史 赋予 我们 的 光荣 使命'.split(' ')

function generateLorem(paragraphs: number, type: 'en' | 'zh', startWithLorem: boolean): string {
  const words = type === 'en' ? LOREM_WORDS : ZH_WORDS
  const result: string[] = []

  for (let p = 0; p < paragraphs; p++) {
    const wordCount = 30 + Math.floor(Math.random() * 40)
    const para: string[] = []

    for (let w = 0; w < wordCount; w++) {
      if (type === 'en') {
        const idx = Math.floor(Math.random() * words.length)
        para.push(words[idx])
      } else {
        const idx = Math.floor(Math.random() * words.length)
        para.push(words[idx])
      }
    }

    let text = type === 'en' ? para.join(' ') : para.join('')
    if (p === 0 && startWithLorem && type === 'en') {
      text = 'Lorem ipsum ' + text
    }
    result.push(text.charAt(0).toUpperCase() + text.slice(1) + (type === 'zh' ? '。' : '.'))
  }

  return result.join('\n\n')
}

export default function LoremIpsumClient() {
  const [paragraphs, setParagraphs] = useState(3)
  const [type, setType] = useState<'en' | 'zh'>('en')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')

  const generate = () => {
    setOutput(generateLorem(paragraphs, type, startWithLorem))
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Lorem Ipsum 生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Lorem Ipsum 占位文本生成器 | Lorem Ipsum Generator</h1>
      <p className="text-sm text-gray-500 mb-6">
        生成 Lorem Ipsum 或中文占位文本，适用于网页设计、排版测试、原型设计等场景。
      </p>

      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">语言</label>
          <div className="flex gap-2">
            <button onClick={() => setType('en')}
              className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${type === 'en' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              English
            </button>
            <button onClick={() => setType('zh')}
              className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${type === 'zh' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              中文
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">段落数</label>
          <input type="number" min={1} max={20} value={paragraphs}
            onChange={e => setParagraphs(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            className="w-20 border rounded-lg px-3 py-2 text-sm bg-white border-gray-300 focus:border-primary-500 outline-none"
          />
        </div>
        {type === 'en' && (
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={startWithLorem}
              onChange={e => setStartWithLorem(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            以 &quot;Lorem ipsum...&quot; 开头
          </label>
        )}
        <button onClick={generate}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]">
          生成文本
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">生成结果</label>
            <CopyButton text={output} />
          </div>
          <pre className="w-full min-h-[200px] border rounded-lg p-4 font-sans text-sm bg-gray-50 border-gray-300 overflow-auto whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
      )}

      <RelatedTools current="lorem-ipsum" />
    </div>
  )
}
