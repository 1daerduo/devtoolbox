'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

// Common transliteration map for Chinese → Pinyin (simplified)
const PINYIN_MAP: Record<string, string> = {
  '的': 'de', '一': 'yi', '是': 'shi', '不': 'bu', '了': 'le', '在': 'zai', '人': 'ren', '我': 'wo',
  '有': 'you', '他': 'ta', '这': 'zhe', '中': 'zhong', '大': 'da', '来': 'lai', '上': 'shang', '国': 'guo',
  '个': 'ge', '到': 'dao', '说': 'shuo', '们': 'men', '为': 'wei', '子': 'zi', '和': 'he', '你': 'ni',
  '地': 'di', '出': 'chu', '道': 'dao', '也': 'ye', '时': 'shi', '年': 'nian', '发': 'fa', '要': 'yao',
  '对': 'dui', '生': 'sheng', '能': 'neng', '而': 'er', '那': 'na', '得': 'de', '于': 'yu', '着': 'zhe',
  '下': 'xia', '自': 'zi', '之': 'zhi', '过': 'guo', '用': 'yong', '后': 'hou', '行': 'xing',
  '多': 'duo', '然': 'ran', '做': 'zuo', '方': 'fang', '成': 'cheng', '所': 'suo', '好': 'hao', '小': 'xiao',
  '可': 'ke', '前': 'qian', '没': 'mei', '学': 'xue', '经': 'jing', '法': 'fa', '天': 'tian', '如': 'ru',
  '工': 'gong', '电': 'dian', '高': 'gao', '网': 'wang', '络': 'luo', '技': 'ji', '术': 'shu',
  '编': 'bian', '程': 'cheng', '具': 'ju', '线': 'xian',
}

// Latin character mapping for common accented chars
const LATIN_MAP: Record<string, string> = {
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ñ': 'n', 'ç': 'c', 'ß': 'ss', 'æ': 'ae', 'ø': 'o',
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A',
  'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
  'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
  'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
  'Ñ': 'N', 'Ç': 'C',
}

function slugify(input: string, separator: string, lowercase: boolean, maxLength: number, transliterateChinese: boolean): string {
  let text = input.trim()

  // Transliterate Chinese characters
  if (transliterateChinese) {
    text = text.split('').map(ch => PINYIN_MAP[ch] || ch).join(' ')
  }

  // Transliterate Latin accented chars
  text = text.split('').map(ch => LATIN_MAP[ch] || ch).join('')

  if (lowercase) text = text.toLowerCase()

  // Replace non-alphanumeric chars with separator
  text = text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]+/g, separator)

  // Remove leading/trailing separators
  text = text.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '')

  // Collapse multiple separators
  text = text.replace(new RegExp(`\\${separator}{2,}`, 'g'), separator)

  // Truncate to max length (don't cut in the middle of a word)
  if (maxLength > 0 && text.length > maxLength) {
    text = text.substring(0, maxLength)
    const lastSep = text.lastIndexOf(separator)
    if (lastSep > maxLength * 0.5) {
      text = text.substring(0, lastSep)
    }
  }

  return text
}

export default function SlugGeneratorClient() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [lowercase, setLowercase] = useState(true)
  const [maxLength, setMaxLength] = useState(0)
  const [transliterateChinese, setTransliterateChinese] = useState(true)

  const slug = useMemo(() => {
    if (!input.trim()) return ''
    return slugify(input, separator, lowercase, maxLength, transliterateChinese)
  }, [input, separator, lowercase, maxLength, transliterateChinese])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Slug 生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Slug 生成器 / URL Slug Generator</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">将标题一键转为 SEO 友好的 URL Slug，支持中文拼音转换、自定义分隔符和长度限制。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">输入标题</label>
            <button onClick={() => setInput('')}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[120px] border rounded-lg p-3 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="输入标题，如：如何使用 React Hooks 优化性能"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">生成 Slug</label>
            {slug && <CopyButton text={slug} />}
          </div>
          <div className="w-full min-h-[120px] border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 break-all text-gray-900 dark:text-gray-100">
            {slug || <span className="text-gray-400">Slug 将实时显示在这里...</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分隔符</label>
            <select value={separator} onChange={e => setSeparator(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <option value="-">短横线 (-)</option>
              <option value="_">下划线 (_)</option>
              <option value=".">点号 (.)</option>
              <option value="">无分隔</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">最大长度</label>
            <input type="number" min={0} max={500} value={maxLength}
              onChange={e => setMaxLength(Number(e.target.value))}
              placeholder="0 = 不限制"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={lowercase} onChange={e => setLowercase(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              小写
            </label>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              <input type="checkbox" checked={transliterateChinese} onChange={e => setTransliterateChinese(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              中文转拼音
            </label>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 Slug 生成器？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>输入文章标题或产品名称，工具自动生成 URL 友好的 Slug。支持中文自动转拼音，去除特殊字符。</p>
        <p><strong>示例：</strong>「如何使用 React Hooks」→ <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">ru-he-shi-yong-react-hooks</code></p>
        <p><strong>使用场景：</strong>博客文章 URL、电商产品链接、CMS 页面路径、文档站点 Slug 等。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="slug-generator" />
    </div>
  )
}
