'use client'

import { useState, useMemo, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface Color {
  hex: string
  locked: boolean
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

function randomColor(): string {
  const h = Math.random() * 360
  const s = 55 + Math.random() * 35
  const l = 45 + Math.random() * 20
  return hslToHex(h, s, l)
}

function generateHarmonious(base: string, scheme: string): string[] {
  const [h, s, l] = hexToHsl(base)
  const colors: string[] = []

  switch (scheme) {
    case 'analogous':
      colors.push(hslToHex((h - 30 + 360) % 360, s, l))
      colors.push(base)
      colors.push(hslToHex((h + 30) % 360, s, l))
      colors.push(hslToHex((h + 60) % 360, s, l))
      colors.push(hslToHex((h - 60 + 360) % 360, s, l))
      break
    case 'monochromatic':
      colors.push(hslToHex(h, s, Math.max(20, l - 20)))
      colors.push(hslToHex(h, s, Math.max(20, l - 10)))
      colors.push(base)
      colors.push(hslToHex(h, s, Math.min(80, l + 10)))
      colors.push(hslToHex(h, s, Math.min(80, l + 20)))
      break
    case 'triadic':
      colors.push(base)
      colors.push(hslToHex((h + 120) % 360, s, l))
      colors.push(hslToHex((h + 240) % 360, s, l))
      colors.push(hslToHex(h, Math.max(20, s - 20), Math.min(80, l + 15)))
      colors.push(hslToHex(h, Math.min(100, s + 15), Math.max(20, l - 15)))
      break
    case 'complementary':
      colors.push(base)
      colors.push(hslToHex((h + 180) % 360, s, l))
      colors.push(hslToHex(h, Math.max(20, s - 20), Math.min(80, l + 15)))
      colors.push(hslToHex((h + 180) % 360, Math.max(20, s - 20), Math.min(80, l + 15)))
      colors.push(hslToHex(h, s, 70))
      break
    case 'split':
      colors.push(base)
      colors.push(hslToHex((h + 150) % 360, s, l))
      colors.push(hslToHex((h + 210) % 360, s, l))
      colors.push(hslToHex(h, Math.max(20, s - 15), Math.min(80, l + 10)))
      colors.push(hslToHex((h + 180) % 360, Math.max(20, s - 15), Math.min(80, l + 10)))
      break
    default: // random
      for (let i = 0; i < 5; i++) colors.push(randomColor())
  }
  return colors
}

type Scheme = 'analogous' | 'monochromatic' | 'triadic' | 'complementary' | 'split' | 'random'

const schemes: { value: Scheme; label: string; desc: string }[] = [
  { value: 'random', label: 'Random', desc: 'Random colors' },
  { value: 'analogous', label: 'Analogous', desc: 'Similar hues' },
  { value: 'monochromatic', label: 'Mono', desc: 'Same hue' },
  { value: 'triadic', label: 'Triadic', desc: '3 equidistant' },
  { value: 'complementary', label: 'Complement', desc: 'Opposite hues' },
  { value: 'split', label: 'Split', desc: 'Split complement' },
]

export default function ColorPaletteClient() {
  const [colors, setColors] = useState<Color[]>([
    { hex: '#3b82f6', locked: false },
    { hex: '#10b981', locked: false },
    { hex: '#f59e0b', locked: false },
    { hex: '#ef4444', locked: false },
    { hex: '#8b5cf6', locked: false },
  ])
  const [scheme, setScheme] = useState<Scheme>('random')
  const [baseColor, setBaseColor] = useState('#3b82f6')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = useCallback(() => {
    if (scheme === 'random') {
      setColors(prev => prev.map(c => c.locked ? c : { hex: randomColor(), locked: false }))
    } else {
      const newColors = generateHarmonious(baseColor, scheme)
      setColors(prev => newColors.map((hex, i) => prev[i]?.locked ? prev[i] : { hex, locked: false }))
    }
  }, [scheme, baseColor])

  const toggleLock = (index: number) => {
    setColors(colors.map((c, i) => i === index ? { ...c, locked: !c.locked } : c))
  }

  const copyColor = async (hex: string, index: number) => {
    await navigator.clipboard.writeText(hex)
    setCopiedIdx(index)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const exportAll = () => {
    const text = colors.map(c => c.hex).join(', ')
    navigator.clipboard.writeText(text)
  }

  const textColor = (hex: string) => {
    const [, , l] = hexToHsl(hex)
    return l > 60 ? '#000000' : '#ffffff'
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Color Palette Generator' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">配色方案生成器 | Color Palette Generator</h1>
      <p className="text-sm text-gray-500 mb-6">Generate beautiful color palettes instantly. Choose a harmony scheme, lock favorites, and export.</p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {schemes.map(s => (
          <button key={s.value} onClick={() => setScheme(s.value)}
            className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
              scheme === s.value
                ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`} title={s.desc}>
            {s.label}
          </button>
        ))}
        {scheme !== 'random' && (
          <div className="flex items-center gap-2 ml-2">
            <label className="text-xs text-gray-500">Base:</label>
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="w-8 h-8 rounded border" />
            <span className="text-xs font-mono text-gray-600">{baseColor}</span>
          </div>
        )}
        <button onClick={generate}
          className="ml-auto px-4 py-2 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors">
          Generate
        </button>
      </div>

      {/* Palette Display */}
      <div className="grid grid-cols-5 gap-2 mb-6 rounded-xl overflow-hidden h-48">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => copyColor(color.hex, i)}
            className="relative group flex flex-col items-center justify-end pb-4 transition-all hover:flex-[1.5]"
            style={{ backgroundColor: color.hex, color: textColor(color.hex) }}
          >
            <span className="text-sm font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedIdx === i ? 'Copied!' : color.hex}
            </span>
            <button
              onClick={e => { e.stopPropagation(); toggleLock(i) }}
              className="absolute top-3 right-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              style={{ color: textColor(color.hex) }}
            >
              {color.locked ? '🔒' : '🔓'}
            </button>
          </button>
        ))}
      </div>

      {/* Color Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800">Color Details</h3>
          <button onClick={exportAll}
            className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            Copy All HEX
          </button>
        </div>
        <div className="space-y-2">
          {colors.map((color, i) => {
            const [h, s, l] = hexToHsl(color.hex)
            return (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 rounded-lg shrink-0 border border-gray-200" style={{ backgroundColor: color.hex }} />
                <div className="flex-1 grid grid-cols-4 gap-2 text-xs font-mono text-gray-600">
                  <div><span className="text-gray-400">HEX</span> {color.hex}</div>
                  <div><span className="text-gray-400">RGB</span> {hexToRgb(color.hex)}</div>
                  <div><span className="text-gray-400">HSL</span> {h} {s}% {l}%</div>
                  <div className="flex items-center gap-2">
                    <CopyButton text={color.hex} />
                    {color.locked && <span className="text-primary-500">Locked</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <RelatedTools current="color-palette" />
    </div>
  )
}
