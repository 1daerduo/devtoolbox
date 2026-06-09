'use client'

import { useState, useMemo, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface Shadow {
  id: number
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

const defaultShadow: Shadow = {
  id: 1,
  x: 5,
  y: 5,
  blur: 15,
  spread: 0,
  color: '#000000',
  opacity: 30,
  inset: false,
}

export default function BoxShadowClient() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...defaultShadow }])
  const [bgColor, setBgColor] = useState('#ffffff')
  const [boxColor, setBoxColor] = useState('#ffffff')
  const [borderRadius, setBorderRadius] = useState(12)
  const [boxWidth, setBoxWidth] = useState(200)
  const [boxHeight, setBoxHeight] = useState(200)
  const nextId = useRef(2)

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const cssValue = useMemo(() => {
    if (shadows.length === 0) return 'none'
    return shadows.map(s => {
      const rgba = hexToRgba(s.color, s.opacity / 100)
      return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`
    }).join(', ')
  }, [shadows])

  const updateShadow = (id: number, field: keyof Shadow, value: number | string | boolean) => {
    setShadows(shadows.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const addShadow = () => {
    setShadows([...shadows, { ...defaultShadow, id: nextId.current++, y: 10, blur: 25 }])
  }

  const removeShadow = (id: number) => {
    if (shadows.length <= 1) return
    setShadows(shadows.filter(s => s.id !== id))
  }

  const resetAll = () => {
    setShadows([{ ...defaultShadow }])
    setBgColor('#ffffff')
    setBoxColor('#ffffff')
    setBorderRadius(12)
    nextId.current = 2
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'CSS Box Shadow Generator' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">CSS Box Shadow 阴影生成器</h1>
      <p className="text-sm text-gray-500 mb-6">Visual builder for CSS box-shadow. Add multiple layers, adjust parameters, and copy the CSS code instantly.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview Area */}
        <div className="space-y-4">
          <div
            className="flex items-center justify-center rounded-xl border border-gray-200 p-8 min-h-[350px]"
            style={{ backgroundColor: bgColor }}
          >
            <div
              style={{
                width: `${boxWidth}px`,
                height: `${boxHeight}px`,
                backgroundColor: boxColor,
                borderRadius: `${borderRadius}px`,
                boxShadow: cssValue,
                transition: 'all 0.2s ease',
              }}
            />
          </div>

          {/* CSS Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">CSS Code</h3>
              <CopyButton text={`box-shadow: ${cssValue};`} />
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              box-shadow: {cssValue};
            </pre>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Box Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Box Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Background</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <span className="text-xs font-mono text-gray-600">{bgColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Box Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={boxColor} onChange={e => setBoxColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <span className="text-xs font-mono text-gray-600">{boxColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Width: {boxWidth}px</label>
                <input type="range" min={60} max={350} value={boxWidth} onChange={e => setBoxWidth(Number(e.target.value))} className="w-full accent-primary-600" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Border Radius: {borderRadius}px</label>
                <input type="range" min={0} max={100} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full accent-primary-600" />
              </div>
            </div>
          </div>

          {/* Shadow Layers */}
          {shadows.map((shadow, index) => (
            <div key={shadow.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Shadow {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1 text-xs text-gray-600">
                    <input type="checkbox" checked={shadow.inset} onChange={e => updateShadow(shadow.id, 'inset', e.target.checked)} className="rounded" />
                    Inset
                  </label>
                  <button onClick={() => removeShadow(shadow.id)} disabled={shadows.length <= 1}
                    className="text-red-400 hover:text-red-600 disabled:opacity-30 text-sm">x</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">X Offset: {shadow.x}px</label>
                  <input type="range" min={-50} max={50} value={shadow.x} onChange={e => updateShadow(shadow.id, 'x', Number(e.target.value))} className="w-full accent-primary-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Y Offset: {shadow.y}px</label>
                  <input type="range" min={-50} max={50} value={shadow.y} onChange={e => updateShadow(shadow.id, 'y', Number(e.target.value))} className="w-full accent-primary-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Blur: {shadow.blur}px</label>
                  <input type="range" min={0} max={100} value={shadow.blur} onChange={e => updateShadow(shadow.id, 'blur', Number(e.target.value))} className="w-full accent-primary-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Spread: {shadow.spread}px</label>
                  <input type="range" min={-50} max={50} value={shadow.spread} onChange={e => updateShadow(shadow.id, 'spread', Number(e.target.value))} className="w-full accent-primary-600" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Color</label>
                  <div className="flex items-center gap-2">
                    <input type="color" value={shadow.color} onChange={e => updateShadow(shadow.id, 'color', e.target.value)} className="w-8 h-8 rounded border" />
                    <span className="text-xs font-mono text-gray-600">{shadow.color}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Opacity: {shadow.opacity}%</label>
                  <input type="range" min={0} max={100} value={shadow.opacity} onChange={e => updateShadow(shadow.id, 'opacity', Number(e.target.value))} className="w-full accent-primary-600" />
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <button onClick={addShadow}
              className="flex-1 py-2.5 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
              + Add Shadow Layer
            </button>
            <button onClick={resetAll}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>

      <RelatedTools current="box-shadow-generator" />
    </div>
  )
}
