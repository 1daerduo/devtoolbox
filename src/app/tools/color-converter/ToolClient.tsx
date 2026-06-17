'use client'

import { useState, useCallback, useEffect } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// Color conversion utilities
function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
  if (!m) return null
  let r: number, g: number, b: number
  if (m[1].length === 3) {
    r = parseInt(m[1][0] + m[1][0], 16)
    g = parseInt(m[1][1] + m[1][1], 16)
    b = parseInt(m[1][2] + m[1][2], 16)
  } else {
    r = parseInt(m[1].substring(0, 2), 16)
    g = parseInt(m[1].substring(2, 4), 16)
    b = parseInt(m[1].substring(4, 6), 16)
  }
  return [r, g, b]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
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

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function parseRgb(input: string): [number, number, number] | null {
  const m = input.match(/rgb\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)\s*\)/i)
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])]
  const nums = input.split(/[, ]+/).map(Number)
  if (nums.length === 3 && nums.every((n) => !isNaN(n) && n >= 0 && n <= 255)) return nums as [number, number, number]
  return null
}

function parseHsl(input: string): [number, number, number] | null {
  const m = input.match(/hsl\(\s*(\d+)\s*[, ]\s*(\d+)%?\s*[, ]\s*(\d+)%?\s*\)/i)
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])]
  return null
}

export default function ColorConverterClient() {
  const [value, setValue] = useState('#3B82F6')
  const [results, setResults] = useState<{ hex: string; rgb: string; hsl: string; rgbArr: [number, number, number] } | null>(null)

  const convert = useCallback((input: string) => {
    const v = input.trim()
    let r: number, g: number, b: number

    if (v.startsWith('#')) {
      const rgb = hexToRgb(v)
      if (!rgb) { setResults(null); return }
      [r, g, b] = rgb
    } else if (v.toLowerCase().startsWith('hsl')) {
      const hsl = parseHsl(v)
      if (!hsl) { setResults(null); return }
      [r, g, b] = hslToRgb(hsl[0], hsl[1], hsl[2])
    } else {
      const rgb = parseRgb(v)
      if (!rgb) { setResults(null); return }
      [r, g, b] = rgb
    }

    const [h, s, l] = rgbToHsl(r, g, b)
    setResults({
      hex: rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      rgbArr: [r, g, b],
    })
  }, [])

  // Auto convert on mount
  useEffect(() => { convert(value) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '颜色转换' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          颜色转换工具 | Color Converter
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持 HEX（十六进制）、RGB、HSL 三种颜色格式互相转换，实时预览颜色效果
        </p>

        {/* Color preview */}
        {results && (
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 border-gray-300 shadow-sm flex-shrink-0"
              style={{ backgroundColor: results.hex }}
            />
            <div>
              <div className="text-sm text-gray-500">颜色预览</div>
              <div className="font-mono text-gray-900">{results.hex}</div>
            </div>
          </div>
        )}

        {/* Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          输入颜色值
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); convert(e.target.value) }}
            placeholder="#3B82F6 或 rgb(59, 130, 246) 或 hsl(217, 91%, 61%)"
            className="flex-1 min-h-[44px] border rounded-lg px-3 py-2 text-sm font-mono bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
          />
          <button
            onClick={() => convert(value)}
            className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
          >
            转换
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mt-3 mb-6">
          {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#000000', '#FFFFFF'].map((c) => (
            <button
              key={c}
              onClick={() => { setValue(c); convert(c) }}
              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-3">
            {[
              { label: 'HEX', value: results.hex },
              { label: 'RGB', value: results.rgb },
              { label: 'HSL', value: results.hsl },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 w-12">{item.label}</span>
                <code className="flex-1 font-mono text-sm text-gray-900 ml-3">{item.value}</code>
                <CopyButton text={item.value} />
              </div>
            ))}
          </div>
        )}

        <RelatedTools current="color-converter" />
      </div>
    </div>
  )
}
