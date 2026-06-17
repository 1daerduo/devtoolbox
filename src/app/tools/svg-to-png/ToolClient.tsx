'use client'

import { useState, useCallback, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

export default function SvgToPngClient() {
  const [svgCode, setSvgCode] = useState('')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [transparent, setTransparent] = useState(false)
  const [outputUrl, setOutputUrl] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.svg')) {
      setError('请选择 SVG 文件')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setSvgCode(e.target?.result as string)
      setError('')
    }
    reader.readAsText(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const convert = useCallback(() => {
    setError('')
    if (!svgCode.trim()) { setError('请输入或上传 SVG 代码'); return }

    // Auto-detect size from SVG viewBox
    const vbMatch = svgCode.match(/viewBox=["']([^"']*)["']/)
    let w = width, h = height
    if (vbMatch) {
      const parts = vbMatch[1].split(/\s+/)
      if (parts.length === 4) {
        w = parseInt(parts[2]) || width
        h = parseInt(parts[3]) || height
      }
    }

    const canvas = canvasRef.current!
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!

    if (!transparent) {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, w, h)
    }

    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h)
      setOutputUrl(canvas.toDataURL('image/png'))
    }
    img.onerror = () => {
      setError('SVG 解析失败，请检查 SVG 代码是否正确')
    }

    const blob = new Blob([svgCode], { type: 'image/svg+xml' })
    img.src = URL.createObjectURL(blob)
  }, [svgCode, width, height, bgColor, transparent])

  const download = useCallback(() => {
    if (!outputUrl) return
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = 'converted.png'
    a.click()
  }, [outputUrl])

  const sampleSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0ea5e9"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="40" font-weight="bold">SVG</text>
</svg>`

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'SVG 转 PNG' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">SVG 转 PNG | SVG to PNG Converter</h1>
      <p className="text-sm text-gray-500 mb-6">在线将 SVG 矢量图转换为 PNG 位图，支持自定义尺寸和背景色，纯浏览器端处理。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Upload */}
          <div
            className={`bg-white rounded-xl border-2 border-dashed p-6 text-center transition-colors mb-4 ${
              dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm text-gray-600 mb-2">拖拽 SVG 文件到此处</p>
            <p className="text-xs text-gray-400 mb-3">或粘贴 SVG 代码到下方</p>
            <input
              type="file"
              accept=".svg"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary-600 file:text-white hover:file:bg-primary-700 cursor-pointer"
            />
          </div>

          {/* SVG Input */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">SVG 代码</h3>
              <button onClick={() => setSvgCode(sampleSVG)}
                className="text-xs text-primary-600 hover:text-primary-700">
                加载示例
              </button>
            </div>
            <textarea
              value={svgCode}
              onChange={e => setSvgCode(e.target.value)}
              placeholder="粘贴 SVG 代码，或点击「加载示例」..."
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">输出设置</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">宽度 (px)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">高度 (px)</label>
                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={transparent} onChange={e => setTransparent(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-gray-700">透明背景</span>
              </label>
              {!transparent && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">背景色:</span>
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer" />
                </div>
              )}
            </div>
            <button onClick={convert}
              className="w-full mt-3 px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              🔄 转换为 PNG
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        </div>

        <div>
          {/* Live SVG Preview */}
          {svgCode.trim() && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">SVG 预览</h3>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center min-h-[200px] border border-gray-100"
                dangerouslySetInnerHTML={{ __html: svgCode }} />
            </div>
          )}

          {/* Output */}
          {outputUrl && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">PNG 输出</h3>
              <img src={outputUrl} alt="PNG输出" className="max-h-64 mx-auto rounded-lg border border-gray-100 mb-3" />
              <button onClick={download}
                className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                📥 下载 PNG
              </button>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <RelatedTools current="svg-to-png" />
    </div>
  )
}
