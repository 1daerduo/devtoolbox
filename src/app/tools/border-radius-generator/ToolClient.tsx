'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function BorderRadiusClient() {
  const [topLeft, setTopLeft] = useState(20)
  const [topRight, setTopRight] = useState(20)
  const [bottomRight, setBottomRight] = useState(20)
  const [bottomLeft, setBottomLeft] = useState(20)
  const [linkCorners, setLinkCorners] = useState(true)
  const [bgColor, setBgColor] = useState('#4F46E5')
  const [boxSize, setBoxSize] = useState(200)

  const handleCornerChange = (corner: string, value: number) => {
    if (linkCorners) {
      setTopLeft(value)
      setTopRight(value)
      setBottomRight(value)
      setBottomLeft(value)
    } else {
      switch (corner) {
        case 'topLeft': setTopLeft(value); break
        case 'topRight': setTopRight(value); break
        case 'bottomRight': setBottomRight(value); break
        case 'bottomLeft': setBottomLeft(value); break
      }
    }
  }

  const radiusValue = useMemo(() => {
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `${topLeft}px`
    }
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
  }, [topLeft, topRight, bottomRight, bottomLeft])

  const cssCode = `border-radius: ${radiusValue};`

  const webkitCss = `-webkit-border-radius: ${radiusValue};`
  const mozCss = `-moz-border-radius: ${radiusValue};`

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'CSS Border Radius Generator' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">CSS Border Radius 生成器 | Border Radius Generator</h1>
      <p className="text-sm text-gray-500 mb-6">Visual CSS border-radius builder. Adjust each corner independently, preview in real-time, and copy the CSS code.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="space-y-4">
          <div
            className="flex items-center justify-center rounded-xl border border-gray-200 p-8 min-h-[350px]"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
                backgroundColor: bgColor,
                borderRadius: radiusValue,
                transition: 'all 0.2s ease',
              }}
            />
          </div>

          {/* CSS Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">CSS Code</h3>
              <CopyButton text={`${webkitCss}\n${mozCss}\n${cssCode}`} />
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <span className="text-gray-500">{webkitCss}</span>{'\n'}
              <span className="text-gray-500">{mozCss}</span>{'\n'}
              <span className="text-green-400">{cssCode}</span>
            </pre>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Link toggle */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Corner Radius</h3>
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" checked={linkCorners} onChange={e => setLinkCorners(e.target.checked)} className="rounded accent-primary-600" />
                Link corners
              </label>
            </div>

            {linkCorners ? (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">All Corners: {topLeft}px</label>
                <input type="range" min={0} max={150} value={topLeft} onChange={e => handleCornerChange('topLeft', Number(e.target.value))} className="w-full accent-primary-600" />
              </div>
            ) : (
              <div className="space-y-3">
                {/* Visual corner layout */}
                <div className="relative bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Top Left: {topLeft}px</label>
                      <input type="range" min={0} max={150} value={topLeft} onChange={e => handleCornerChange('topLeft', Number(e.target.value))} className="w-full accent-primary-600" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Top Right: {topRight}px</label>
                      <input type="range" min={0} max={150} value={topRight} onChange={e => handleCornerChange('topRight', Number(e.target.value))} className="w-full accent-primary-600" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Bottom Left: {bottomLeft}px</label>
                      <input type="range" min={0} max={150} value={bottomLeft} onChange={e => handleCornerChange('bottomLeft', Number(e.target.value))} className="w-full accent-primary-600" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Bottom Right: {bottomRight}px</label>
                      <input type="range" min={0} max={150} value={bottomRight} onChange={e => handleCornerChange('bottomRight', Number(e.target.value))} className="w-full accent-primary-600" />
                    </div>
                  </div>
                </div>

                {/* Quick presets */}
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Quick Presets</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Rounded', tl: 12, tr: 12, br: 12, bl: 12 },
                      { label: 'Pill', tl: 999, tr: 999, br: 999, bl: 999 },
                      { label: 'Blob', tl: 60, tr: 30, br: 50, bl: 40 },
                      { label: 'Leaf', tl: 50, tr: 0, br: 50, bl: 0 },
                      { label: 'Asymmetric', tl: 30, tr: 60, br: 10, bl: 40 },
                    ].map(p => (
                      <button
                        key={p.label}
                        onClick={() => { setTopLeft(p.tl); setTopRight(p.tr); setBottomRight(p.br); setBottomLeft(p.bl) }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Box Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Box Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Background Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded border" />
                  <span className="text-xs font-mono text-gray-600">{bgColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Size: {boxSize}px</label>
                <input type="range" min={60} max={300} value={boxSize} onChange={e => setBoxSize(Number(e.target.value))} className="w-full accent-primary-600" />
              </div>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setTopLeft(20); setTopRight(20); setBottomRight(20); setBottomLeft(20); setLinkCorners(true); setBgColor('#4F46E5'); setBoxSize(200) }}
            className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </div>

      <RelatedTools current="border-radius-generator" />
    </div>
  )
}
