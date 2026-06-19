'use client'

import { useState, useCallback, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

type Format = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp'

const FORMATS: { value: Format; label: string; ext: string }[] = [
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
  { value: 'image/bmp', label: 'BMP', ext: 'bmp' },
]

export default function ImageConverterClient() {
  const [sourceFile, setSourceFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState('')
  const [targetFormat, setTargetFormat] = useState<Format>('image/png')
  const [quality, setQuality] = useState(0.9)
  const [outputUrl, setOutputUrl] = useState('')
  const [outputName, setOutputName] = useState('')
  const [dragging, setDragging] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setSourceFile(file)
    setSourceUrl(URL.createObjectURL(file))
    setOutputUrl('')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const convert = useCallback(() => {
    if (!sourceUrl) return
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      
      // Draw white background for formats that don't support transparency
      if (targetFormat === 'image/jpeg' || targetFormat === 'image/bmp') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL(targetFormat, quality)
      setOutputUrl(dataUrl)
      
      const fmt = FORMATS.find(f => f.value === targetFormat)!
      const baseName = sourceFile?.name.replace(/\.[^.]+$/, '') || 'converted'
      setOutputName(`${baseName}.${fmt.ext}`)
    }
    img.src = sourceUrl
  }, [sourceUrl, targetFormat, quality, sourceFile])

  const download = useCallback(() => {
    if (!outputUrl || !outputName) return
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = outputName
    a.click()
  }, [outputUrl, outputName])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '图片格式转换' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">图片格式转换 | Image Converter</h1>
      <p className="text-sm text-gray-500 mb-6">在线转换图片格式，支持 PNG、JPEG、WebP、BMP 互转，纯浏览器端处理，无需上传。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {/* Upload */}
          <div
            className={`bg-white rounded-xl border-2 border-dashed p-8 text-center transition-colors mb-4 ${
              dragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
            }`}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-sm text-gray-600 mb-2">拖拽图片到此处，或点击选择</p>
            <p className="text-xs text-gray-400">支持 JPG、PNG、WebP、BMP、GIF、SVG</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="mt-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary-600 file:text-white hover:file:bg-primary-700 cursor-pointer"
            />
          </div>

          {sourceUrl && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <img src={sourceUrl} alt="原始图片" className="max-h-48 mx-auto rounded-lg object-contain" />
              <p className="text-xs text-gray-400 mt-2 text-center truncate">{sourceFile?.name}</p>
            </div>
          )}
        </div>

        <div>
          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">转换设置</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">目标格式</label>
                <select value={targetFormat} onChange={e => setTargetFormat(e.target.value as Format)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                  {FORMATS.map(f => (
                    <option key={f.value} value={f.value}>{f.label} (.{f.ext})</option>
                  ))}
                </select>
              </div>
              
              {targetFormat !== 'image/png' && targetFormat !== 'image/bmp' && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">图片质量: {Math.round(quality * 100)}%</label>
                  <input type="range" min={0.1} max={1} step={0.05} value={quality}
                    onChange={e => setQuality(Number(e.target.value))}
                    className="w-full accent-primary-600" />
                </div>
              )}

              <button onClick={convert} disabled={!sourceUrl}
                className="w-full px-4 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                🔄 开始转换
              </button>
            </div>
          </div>

          {/* Output */}
          {outputUrl && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">转换结果</h3>
              <img src={outputUrl} alt="转换后" className="max-h-48 mx-auto rounded-lg object-contain mb-3" />
              <p className="text-xs text-gray-400 mb-3 text-center">{outputName}</p>
              <button onClick={download}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                📥 下载 {FORMATS.find(f => f.value === targetFormat)?.label}
              </button>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <RelatedTools current="image-converter" />
    </div>
  )
}
