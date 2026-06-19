'use client'

import { useState, useRef, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

export default function ToolClient() {
  const [image, setImage] = useState<{ src: string; w: number; h: number } | null>(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
  const [quality, setQuality] = useState(92)
  const [scaleMode, setScaleMode] = useState<'px' | 'percent'>('px')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target?.result as string
      const img = new window.Image()
      img.onload = () => {
        setImage({ src, w: img.naturalWidth, h: img.naturalHeight })
        setWidth(String(img.naturalWidth))
        setHeight(String(img.naturalHeight))
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onWidthChange = useCallback((val: string) => {
    setWidth(val)
    if (lockAspect && image) {
      const w = parseInt(val) || 0
      if (w > 0) setHeight(String(Math.round(w * image.h / image.w)))
    }
  }, [lockAspect, image])

  const onHeightChange = useCallback((val: string) => {
    setHeight(val)
    if (lockAspect && image) {
      const h = parseInt(val) || 0
      if (h > 0) setWidth(String(Math.round(h * image.w / image.h)))
    }
  }, [lockAspect, image])

  const getTargetSize = useCallback(() => {
    if (!image) return { w: 0, h: 0 }
    let w = parseInt(width) || image.w
    let h = parseInt(height) || image.h
    if (scaleMode === 'percent') {
      const pct = parseInt(width) || 100
      w = Math.round(image.w * pct / 100)
      h = Math.round(image.h * pct / 100)
    }
    return { w, h }
  }, [image, width, height, scaleMode])

  const preview = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return
    const { w, h } = getTargetSize()
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new window.Image()
    img.onload = () => { ctx.drawImage(img, 0, 0, w, h) }
    img.src = image.src
  }, [image, getTargetSize])

  const download = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { w, h } = getTargetSize()
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new window.Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, w, h)
      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png'
      const link = document.createElement('a')
      link.download = `resized.${ext}`
      link.href = canvas.toDataURL(format, quality / 100)
      link.click()
    }
    img.src = image!.src
  }, [image, getTargetSize, format, quality])

  if (image) preview()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '图片尺寸调整' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">图片尺寸调整 | Image Resizer</h1>
      <p className="text-gray-600 mb-6">在线调整图片尺寸，支持像素/百分比缩放，纯浏览器端处理</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">缩放方式</h2>
      <p className="text-gray-600 mb-4 text-sm">支持按像素精确指定宽高或按百分比等比例缩放，可锁定宽高比防止图片变形。适合社交媒体配图、网页素材、电商产品图等场景。输出支持 PNG/JPEG/WebP 格式。</p>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors cursor-pointer
          ${dragOver ? 'border-blue-500 bg-blue-50' : image ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        {image ? (
          <div>
            <p className="text-green-700 mb-2">图片已加载</p>
            <p className="text-sm text-gray-500">原始尺寸: {image.w} x {image.h} px | 点击重新选择</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 mb-1">拖拽图片到此处</p>
            <p className="text-sm text-gray-400">或点击选择图片 (PNG/JPEG/WebP/GIF)</p>
          </div>
        )}
      </div>

      {image && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <button onClick={() => setScaleMode('px')}
                  className={`px-3 py-1 text-sm rounded ${scaleMode === 'px' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>像素</button>
                <button onClick={() => setScaleMode('percent')}
                  className={`px-3 py-1 text-sm rounded ${scaleMode === 'percent' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>百分比</button>
                <label className="flex items-center gap-1 text-sm ml-auto">
                  <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
                  <span>锁定宽高比</span>
                </label>
              </div>
              {scaleMode === 'px' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">宽度 (px)</label>
                    <input value={width} onChange={(e) => onWidthChange(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">高度 (px)</label>
                    <input value={height} onChange={(e) => onHeightChange(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">缩放比例 (%)</label>
                  <input value={width} onChange={(e) => { setWidth(e.target.value); setHeight(e.target.value) }}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <div className="flex gap-2 mt-2">
                    {[25, 50, 75, 150, 200].map((p) => (
                      <button key={p} onClick={() => { setWidth(String(p)); setHeight(String(p)) }}
                        className="px-2 py-1 text-xs bg-white border rounded hover:bg-blue-50">{p}%</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-xs text-gray-500 mb-1">输出格式</label>
              <div className="flex gap-2 mb-3">
                {(['image/png', 'image/jpeg', 'image/webp'] as const).map((f) => (
                  <button key={f} onClick={() => setFormat(f)}
                    className={`px-3 py-1 text-sm rounded ${format === f ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {f === 'image/png' ? 'PNG' : f === 'image/jpeg' ? 'JPEG' : 'WebP'}
                  </button>
                ))}
              </div>
              {format !== 'image/png' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">质量: {quality}%</label>
                  <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full" />
                </div>
              )}
              <button onClick={download}
                className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                下载调整后的图片
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-2 bg-gray-100 flex items-center justify-center min-h-[100px]">
            <div className="bg-white rounded shadow">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
          </div>
        </>
      )}

      <RelatedTools current="image-resizer" />
    </div>
  )
}
