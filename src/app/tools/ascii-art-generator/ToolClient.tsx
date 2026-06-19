'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// FIGlet-inspired font definitions
type FontChar = string[]

interface Font {
  name: string
  height: number
  chars: Record<string, string[]>
}

function buildFont(name: string, height: number, map: [string, string[]][]): Font {
  const chars: Record<string, string[]> = {}
  for (const [ch, lines] of map) {
    while (lines.length < height) lines.push('')
    chars[ch] = lines.map(l => l.padEnd(lines.reduce((m, x) => Math.max(m, x.length), 0)))
  }
  // fallback for missing chars
  const fallback = Array(height).fill('?'.repeat(5))
  return { name, height, chars: new Proxy(chars, { get: (t, k) => (t as Record<string, string[]>)[k as string] || fallback }) }
}

const FONTS: Font[] = [
  buildFont('Standard', 5, [
    ['A', [' ██╗ ', '██╔╝ ', '████╗', '██╔═╝', '██║  ']],
    ['B', ['████╗', '██╔══╝', '████╗', '██╔══╝', '████╗']],
    ['C', ['████╗', '██╔═╝', '██║  ', '██║  ', '████╗']],
    ['D', ['████╗', '██╔═╝', '██║  ', '██║  ', '████╗']],
    ['E', ['████╗', '██╔═╝', '████╗', '██╔═╝', '████╗']],
    ['F', ['████╗', '██╔═╝', '████╗', '██╔═╝', '██║  ']],
    ['G', ['████╗', '██╔═╝', '██║██', '██║██', '████╗']],
    ['H', ['██╗██', '██║██', '█████', '██║██', '██║██']],
    ['I', ['████╗', ' ██╔╝', ' ██║ ', ' ██║ ', '████╗']],
    ['J', ['████╗', '  ██║', '  ██║', '██╔╝ ', '████╗']],
    ['K', ['██║██', '██╔╝ ', '████╗', '██║██', '██║██']],
    ['L', ['██║  ', '██║  ', '██║  ', '██║  ', '████╗']],
    ['M', ['██╗ ██', '███╗██', '██║███', '██║██║', '██║ ██']],
    ['N', ['██╗██', '█████', '██║██', '██║██', '██║██']],
    ['O', ['████╗', '██║██', '██║██', '██║██', '████╗']],
    ['P', ['████╗', '██║██', '████╗', '██╔═╝', '██║  ']],
    ['Q', ['████╗', '██║██', '██║██', '████╗', ' ███╗']],
    ['R', ['████╗', '██║██', '████╗', '██║██', '██║██']],
    ['S', ['████╗', '██╔═╝', '████╗', '  ██║', '████╗']],
    ['T', ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ']],
    ['U', ['██╗██', '██║██', '██║██', '██║██', '████╗']],
    ['V', ['██╗ ██', '██║ ██', '╚██╔██', ' ███╔╝', '  ██║ ']],
    ['W', ['██╗ ██╗██', '██║ ██║██', '██║ ██║██', '╚████╔═╝ ', '  ╚═╝    ']],
    ['X', ['██╗ ██', '╚██╔╝ ', ' ██║  ', '██╔╝  ', '██║   ']],
    ['Y', ['██╗ ██', '╚██╔╝ ', ' ██║  ', ' ██║  ', ' ██║  ']],
    ['Z', ['████╗', '  ██╔╝', ' ██║ ', '██╔╝ ', '████╗']],
    [' ', ['     ', '     ', '     ', '     ', '     ']],
    ['.', ['   ', '   ', '   ', '   ', '██╗']],
    ['!', ['██', '██', '██', '  ', '██']],
  ]),
  buildFont('Blocks', 5, [
    ['A', ['██████╗', '██╔══██╗', '███████║', '██╔══██║', '██║  ██║']],
    ['B', ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔══██╗', '██████╔╝']],
    ['C', [' █████╗', '██╔═══╝', '██║    ', '██║    ', ' █████╗']],
    ['D', ['██████╗ ', '██╔══██╗', '██║  ██║', '██║  ███', '██████╔╝']],
    ['E', ['███████╗', '██╔════╝', '███████╗', '██╔════╝', '███████╗']],
    ['F', ['███████╗', '██╔════╝', '███████╗', '██╔════╝', '██║     ']],
    ['G', [' ██████╗', '██╔════╝', '██║  ██╗', '██║  ██║', ' ██████╝']],
    ['H', ['██╗  ██╗', '██║  ██║', '███████║', '██╔══██║', '██║  ██║']],
    ['I', ['██████╗', '  ██║  ', '  ██║  ', '  ██║  ', '██████╗']],
    ['J', ['███████╗', '   ██╔╝', '   ██╔╝', '██╗██╔╝', ' ████╔╝']],
    ['K', ['██║ ██╗', '██╔╝██║', '█████╔╝', '██║ ██╗', '██║  ██']],
    ['L', ['██╗     ', '██║     ', '██║     ', '██║     ', '███████╗']],
    ['M', ['███╗  ██╗', '████╗ ██║', '██╔██╗██║', '██║╚████║', '██║ ╚███║']],
    ['N', ['███╗  ██╗', '████╗ ██║', '██╔██╗██║', '██║╚████║', '██║ ╚███║']],
    ['O', ['██████╗ ', '██╔══██╗', '██║  ██║', '██║  ██║', '██████╔╝']],
    ['P', ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔═══╝ ', '██║     ']],
    ['Q', ['██████╗ ', '██╔══██╗', '██║  ██║', '██████╔╝', ' ╚════██╗']],
    ['R', ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔═██╗ ', '██║  ██╗']],
    ['S', ['██████╗ ', '██╔════╝', '███████╗', ' ╚════██║', '██████╔╝']],
    ['T', ['████████╗', '  ██╔╝  ', '  ██║   ', '  ██║   ', '  ╚═╝   ']],
    ['U', ['██╗  ██╗', '██║  ██║', '██║  ██║', '██║  ██║', '██████╔╝']],
    ['V', ['██╗   ██╗', '██║   ██║', '██║   ██║', '╚██╗ ██╔╝', ' ╚████╔╝ ']],
    ['W', ['██╗    ██╗', '██║    ██║', '██║ █╗ ██║', '██║███╗██║', '╚███╔███╔╝']],
    ['X', ['██╗  ██╗', '╚██╗██╔╝', ' ╚███╔╝ ', ' ██╔██╗ ', '██╔╝ ██╗']],
    ['Y', ['██╗   ██╗', '╚██╗ ██╔╝', ' ╚████╔╝ ', '  ╚██╔╝  ', '   ╚═╝   ']],
    ['Z', ['███████╗', '   ██╔╝ ', '  ██╔╝  ', ' ██╔╝   ', '███████╗']],
    [' ', ['      ', '      ', '      ', '      ', '      ']],
    ['.', ['  ', '  ', '  ', '  ', '██']],
    ['!', ['██╗', '██║', '██║', '╚═╝', '██╗']],
  ]),
  buildFont('Simple', 5, [
    ['A', ['  ██  ', ' ██ ██ ', '██████', '██  ██', '██  ██']],
    ['B', ['█████ ', '██  ██', '█████ ', '██  ██', '█████ ']],
    ['C', [' █████', '██    ', '██    ', '██    ', ' █████']],
    ['D', ['████  ', '██ ██ ', '██  ██', '██ ██ ', '████  ']],
    ['E', ['██████', '██    ', '█████ ', '██    ', '██████']],
    ['F', ['██████', '██    ', '█████ ', '██    ', '██    ']],
    ['G', [' █████', '██    ', '██ ███', '██  ██', ' █████']],
    ['H', ['██  ██', '██  ██', '██████', '██  ██', '██  ██']],
    ['I', ['██████', '  ██  ', '  ██  ', '  ██  ', '██████']],
    ['J', ['██████', '   ██ ', '   ██ ', '██ ██ ', ' ███  ']],
    ['K', ['██  ██', '██ ██ ', '████  ', '██ ██ ', '██  ██']],
    ['L', ['██    ', '██    ', '██    ', '██    ', '██████']],
    ['M', ['██   ██', '███ ███', '██ █ ██', '██   ██', '██   ██']],
    ['N', ['██   ██', '███  ██', '██ █ ██', '██  ███', '██   ██']],
    ['O', [' ████ ', '██  ██', '██  ██', '██  ██', ' ████ ']],
    ['P', ['█████ ', '██  ██', '█████ ', '██    ', '██    ']],
    ['Q', [' ████ ', '██  ██', '██  ██', ' ████ ', '    ██']],
    ['R', ['█████ ', '██  ██', '█████ ', '██ ██ ', '██  ██']],
    ['S', [' █████', '██    ', ' ████ ', '    ██', '█████ ']],
    ['T', ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ']],
    ['U', ['██  ██', '██  ██', '██  ██', '██  ██', ' ████ ']],
    ['V', ['██  ██', '██  ██', '██  ██', ' ████ ', '  ██  ']],
    ['W', ['██   ██', '██   ██', '██ █ ██', '███████', ' ██ ██ ']],
    ['X', ['██  ██', ' ████ ', '  ██  ', ' ████ ', '██  ██']],
    ['Y', '██  ██\n ████ \n  ██  \n  ██  \n  ██  '.split('\n')],
    ['Z', '██████\n   ██ \n  ██  \n ██   \n██████'.split('\n')],
    [' ', '      \n      \n      \n      \n      '.split('\n')],
    ['.', '  \n  \n  \n  \n██'.split('\n')],
    ['!', '██\n██\n██\n  \n██'.split('\n')],
  ]),
]

// Map lowercase to uppercase (already handled when we uppercase input)
const LOWERCASE_OFFSET = 'a'.charCodeAt(0) - 'A'.charCodeAt(0)

export default function ToolClient() {
  const [text, setText] = useState('HELLO')
  const [fontIndex, setFontIndex] = useState(0)
  const [spacing, setSpacing] = useState(1)

  const font = FONTS[fontIndex]

  const ascii = useMemo(() => {
    const lines: string[] = Array(font.height).fill('')
    for (const ch of text.toUpperCase()) {
      const glyph = font.chars[ch]
      if (glyph) {
        const maxW = Math.max(...glyph.map(l => l.length))
        for (let i = 0; i < font.height; i++) {
          const line = (glyph[i] || '').padEnd(maxW)
          lines[i] += line + ' '.repeat(spacing)
        }
      }
    }
    return lines.join('\n')
  }, [text, font, fontIndex, spacing])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'ASCII 艺术字生成器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">ASCII 艺术字生成器 | ASCII Art Generator</h1>
      <p className="text-gray-600 mb-6">将文字转换为 ASCII 字符画，支持多种字体风格</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">字体风格</h2>
      <p className="text-gray-600 mb-4 text-sm">支持 Standard（标准）、Blocks（方块）、Simple（简约）三种 FIGlet 字体风格，可调节字符间距，生成不同视觉效果的艺术字。适合代码注释、README 文档、社交媒体配文等场景。</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">输入文字</label>
          <input value={text} onChange={(e) => setText(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入英文/数字..." maxLength={30} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">字体风格</label>
          <select value={fontIndex} onChange={(e) => setFontIndex(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {FONTS.map((f, i) => (
              <option key={i} value={i}>{f.name}</option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">字符间距</label>
          <input type="range" min={0} max={5} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))}
            className="w-full" />
          <span className="text-xs text-gray-500">{spacing} 空格</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">预览</span>
        <div className="flex gap-2">
          <CopyButton text={ascii} />
          <button onClick={() => {
            const blob = new Blob([ascii], { type: 'text/plain' })
            const link = document.createElement('a')
            link.download = 'ascii-art.txt'
            link.href = URL.createObjectURL(blob)
            link.click()
          }} className="px-3 py-1 text-xs bg-gray-100 border rounded hover:bg-gray-200">
            下载 TXT
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-900 text-green-400 overflow-auto max-h-[500px] mb-4">
        <pre className="font-mono text-xs leading-tight whitespace-pre">{ascii}</pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-4">
        <p className="font-medium mb-1">使用提示：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>支持 A-Z、0-9 和常见标点</li>
          <li>复制后可直接粘贴到代码注释、README、社交媒体</li>
          <li>选择等宽字体（如 Consolas、Monaco）查看效果最佳</li>
        </ul>
      </div>

      <RelatedTools current="ascii-art-generator" />
    </div>
  )
}
