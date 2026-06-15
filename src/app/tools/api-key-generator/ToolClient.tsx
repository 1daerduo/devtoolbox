'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

type KeyFormat = 'hex' | 'base64' | 'alphanumeric' | 'custom'

const CHARSETS: Record<string, string> = {
  hex: '0123456789abcdef',
  'HEX': '0123456789ABCDEF',
  base64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  'alpha-upper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  'alpha-lower': 'abcdefghijklmnopqrstuvwxyz0123456789',
  numeric: '0123456789',
}

function generateKey(length: number, charset: string, prefix: string): string {
  const chars = CHARSETS[charset] || charset
  let result = prefix
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }
  return result
}

function generateBatch(count: number, length: number, charset: string, prefix: string, separator: string): string {
  return Array.from({ length: count }, () => generateKey(length, charset, prefix)).join('\n')
}

export default function ApiKeyGeneratorClient() {
  const [keyLength, setKeyLength] = useState(32)
  const [charset, setCharset] = useState<string>('hex')
  const [prefix, setPrefix] = useState('')
  const [separator, setSeparator] = useState('-')
  const [groupSize, setGroupSize] = useState(0)
  const [count, setCount] = useState(1)
  const [output, setOutput] = useState('')

  const generate = useCallback(() => {
    let generated = generateBatch(count, keyLength, charset, prefix, separator)
    if (groupSize > 0) {
      const lines = generated.split('\n')
      generated = lines.map(line => {
        const raw = line.startsWith(prefix) ? line.slice(prefix.length) : line
        const groups = []
        for (let i = 0; i < raw.length; i += groupSize) {
          groups.push(raw.slice(i, i + groupSize))
        }
        return prefix + groups.join(separator)
      }).join('\n')
    }
    setOutput(generated)
  }, [keyLength, charset, prefix, separator, groupSize, count])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'API Key 生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">API Key 生成器 / API Key Generator</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">生成随机 API 密钥、Access Token、Secret Key，支持自定义长度、前缀、字符集和分组格式。</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">密钥长度</label>
            <input type="number" min={8} max={256} value={keyLength}
              onChange={e => setKeyLength(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">字符集</label>
            <select value={charset} onChange={e => setCharset(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
              <option value="hex">十六进制 (0-9a-f)</option>
              <option value="HEX">十六进制大写 (0-9A-F)</option>
              <option value="base64">Base64 (A-Za-z0-9+/)</option>
              <option value="alphanumeric">字母数字 (A-Za-z0-9)</option>
              <option value="alpha-upper">大写+数字 (A-Z0-9)</option>
              <option value="alpha-lower">小写+数字 (a-z0-9)</option>
              <option value="numeric">纯数字 (0-9)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">前缀</label>
            <input type="text" value={prefix} onChange={e => setPrefix(e.target.value)}
              placeholder="如 sk_live_"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分组大小</label>
            <input type="number" min={0} max={32} value={groupSize}
              onChange={e => setGroupSize(Number(e.target.value))}
              placeholder="0 = 不分组"
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分组分隔符</label>
            <input type="text" value={separator} onChange={e => setSeparator(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">生成数量</label>
            <input type="number" min={1} max={100} value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={generate}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
            生成密钥
          </button>
          {output && <CopyButton text={output} />}
        </div>
      </div>

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">生成结果</label>
            <span className="text-xs text-gray-400">{output.split('\n').length} 条密钥</span>
          </div>
          <pre className="w-full border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100 max-h-80">
            {output}
          </pre>
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 API Key 生成器？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>选择字符集和长度，可选添加前缀（如 <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">sk_live_</code>），点击「生成密钥」即可获得随机 API Key。</p>
        <p><strong>使用场景：</strong>开发测试时模拟第三方 API 密钥格式、生成临时 Access Token、创建 Secret Key 等。</p>
        <p><strong>安全提示：</strong>使用 <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">crypto.getRandomValues()</code> 生成密码学安全随机数，所有数据在浏览器本地处理，不上传服务器。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="api-key-generator" />
    </div>
  )
}
