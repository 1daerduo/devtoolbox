'use client'

import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface ColorStop {
  id: number
  color: string
  position: number
}

export default function CssGradientClient() {
  const [type, setType] = useState<'linear' | 'radial' | 'conic'>('linear')
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: '#0ea5e9', position: 0 },
    { id: 2, color: '#8b5cf6', position: 100 },
  ])
  const [copied, setCopied] = useState(false)
  const nextId = useRef(3)

  const cssValue = useMemo(() => {
    const sorted = [...stops].sort((a, b) => a.position - b.position)
    const stopStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ')
    
    switch (type) {
      case 'linear': return `linear-gradient(${angle}deg, ${stopStr})`
      case 'radial': return `radial-gradient(circle, ${stopStr})`
      case 'conic': return `conic-gradient(from ${angle}deg, ${stopStr})`
    }
  }, [type, angle, stops])

  const addStop = () => {
    if (stops.length >= 6) return
    setStops([...stops, { id: nextId.current++, color: '#f59e0b', position: 50 }])
  }

  const removeStop = (id: number) => {
    if (stops.length <= 2) return
    setStops(stops.filter(s => s.id !== id))
  }

  const updateStop = (id: number, field: 'color' | 'position', value: string | number) => {
    setStops(stops.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const randomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    const types: Array<'linear' | 'radial' | 'conic'> = ['linear', 'radial', 'conic']
    setType(types[Math.floor(Math.random() * 3)])
    setAngle(Math.floor(Math.random() * 360))
    const count = 2 + Math.floor(Math.random() * 3)
    const newStops: ColorStop[] = []
    for (let i = 0; i < count; i++) {
      newStops.push({
        id: i + 1,
        color: randomColor(),
        position: Math.round((i / (count - 1)) * 100),
      })
    }
    setStops(newStops)
    nextId.current = count + 1
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`background: ${cssValue};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'CSS 渐变生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">CSS 渐变生成器</h1>
      <p className="text-sm text-gray-500 mb-6">可视化生成 CSS 渐变效果，支持线性、径向、圆锥渐变，自由调节颜色和位置。</p>

      {/* Preview */}
      <div className="rounded-xl h-48 mb-6 border border-gray-200 shadow-inner" style={{ background: cssValue }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">渐变类型</h3>
            <div className="flex gap-2">
              {[
                { value: 'linear' as const, label: '线性', icon: '↗' },
                { value: 'radial' as const, label: '径向', icon: '◎' },
                { value: 'conic' as const, label: '圆锥', icon: '◎' },
              ].map(item => (
                <button key={item.value} onClick={() => setType(item.value)}
                  className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                    type === item.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">角度: {angle}°</h3>
            <input type="range" min={0} max={360} value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="w-full accent-primary-600" />
          </div>

          <button onClick={randomGradient}
            className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            🎲 随机渐变
          </button>
        </div>

        <div className="lg:col-span-2">
          {/* Color Stops */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">色标 ({stops.length}/6)</h3>
              <button onClick={addStop} disabled={stops.length >= 6}
                className="px-3 py-1 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                + 添加色标
              </button>
            </div>
            <div className="space-y-3">
              {stops.sort((a, b) => a.position - b.position).map(stop => (
                <div key={stop.id} className="flex items-center gap-3">
                  <input type="color" value={stop.color}
                    onChange={e => updateStop(stop.id, 'color', e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                  <input type="text" value={stop.color}
                    onChange={e => updateStop(stop.id, 'color', e.target.value)}
                    className="w-24 px-2 py-1.5 border border-gray-300 rounded text-xs font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                  <div className="flex-1">
                    <input type="range" min={0} max={100} value={stop.position}
                      onChange={e => updateStop(stop.id, 'position', Number(e.target.value))}
                      className="w-full accent-primary-600" />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-10 text-right">{stop.position}%</span>
                  <button onClick={() => removeStop(stop.id)} disabled={stops.length <= 2}
                    className="text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CSS Code */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">📋 CSS 代码</h3>
              <button onClick={handleCopy}
                className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
                {copied ? '✓ 已复制' : '复制 CSS'}
              </button>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap">
              background: {cssValue};
            </pre>
          </div>
        </div>
      </div>

      <RelatedTools current="css-gradient" />
    </div>
  )
}
