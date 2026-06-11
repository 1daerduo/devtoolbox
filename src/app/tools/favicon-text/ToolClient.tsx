'use client'

import { useState, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const SIZES = [16, 32, 48, 64, 128, 256] as const
const FONTS = ['Arial', 'Georgia', 'Courier New', 'Times New Roman', 'Verdana']
const BG_STYLES = ['solid', 'circle', 'rounded'] as const

export default function FaviconTextClient() {
  const [text, setText] = useState('AB')
  const [font, setFont] = useState('Arial')
  const [bgColor, setBgColor] = useState('#4F46E5')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [style, setStyle] = useState<'solid' | 'circle' | 'rounded'>('solid')
  const [results, setResults] = useState<{ size: number; dataUrl: string }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    const canvas = canvasRef.current!
    const newResults: { size: number; dataUrl: string }[] = []
    const displayChar = text.length > 2 ? text.slice(0, 2) : text

    SIZES.forEach(size => {
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!

      // Background
      if (style === 'solid' || style === 'rounded') {
        ctx.fillStyle = bgColor
        if (style === 'rounded') {
          const r = size * 0.15
          ctx.beginPath()
          ctx.roundRect(0, 0, size, size, r)
          ctx.fill()
        } else {
          ctx.fillRect(0, 0, size, size)
        }
      } else if (style === 'circle') {
        ctx.fillStyle = bgColor
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Text
      const fontSize = Math.floor(size * 0.5)
      ctx.font = `bold ${fontSize}px ${font}`
      ctx.fillStyle = textColor
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(displayChar, size / 2, size / 2)

      newResults.push({ size, dataUrl: canvas.toDataURL('image/png') })
    })

    setResults(newResults)
  }

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    results.forEach(({ size, dataUrl }) => {
      zip.file(`favicon-${size}x${size}.png`, dataUrl.replace(/^data:image\/png;base64,/, ''), { base64: true })
    })
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicon-text.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '文字 Favicon 生成器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">文字 Favicon 生成器</h1>
      <p className="text-sm text-gray-500 mb-6">输入文字（建议1-2个字符），自定义字体/颜色/背景形状，生成字母 Favicon。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700 block mb-2">文字内容</label>
            <input
              value={text}
              onChange={e => setText(e.target.value.slice(0, 4))}
              className="w-full border rounded-lg p-3 text-lg font-bold text-center bg-white border-gray-300 text-gray-900"
              maxLength={4}
              placeholder="AB"
            />
            <p className="text-xs text-gray-500 mt-1">建议1-2个字符，最多4个</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">字体</label>
              <select value={font} onChange={e => setFont(e.target.value)} className="w-full border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">背景样式</label>
              <select value={style} onChange={e => setStyle(e.target.value as any)} className="w-full border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
                <option value="solid">方形</option>
                <option value="circle">圆形</option>
                <option value="rounded">圆角</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">背景色</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-8 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">文字色</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-full h-8 border rounded" />
            </div>
          </div>

          <button onClick={generate} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
            生成 Favicon
          </button>

          {results.length > 0 && (
            <button onClick={downloadZip} className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium">
              下载全部 ZIP
            </button>
          )}
        </div>

        <div>
          {results.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">生成结果（点击下载）</p>
              <div className="grid grid-cols-3 gap-3">
                {results.map(({ size, dataUrl }) => (
                  <div key={size} className="text-center">
                    <img src={dataUrl} alt={`${size}x${size}`} className="border rounded cursor-pointer hover:shadow-md" style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} onClick={() => { const a = document.createElement('a'); a.href = dataUrl; a.download = `favicon-${size}x${size}.png`; a.click() }} />
                    <p className="text-xs text-gray-500 mt-1">{size}×{size}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="favicon-text" />
    </div>
  )
}
