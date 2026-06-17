'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function ImageCompressorClient() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [compressing, setCompressing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg')

  const processFile = useCallback((f: File) => {
    setFile(f)
    setOriginalSize(f.size)
    setCompressedUrl(null)
    setCompressedSize(0)
    // Preview original
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target?.result as string)
    reader.readAsDataURL(f)
    // Auto-detect format
    if (f.type === 'image/png') setFormat('image/png')
    else if (f.type === 'image/webp') setFormat('image/webp')
    else setFormat('image/jpeg')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) processFile(f)
  }, [processFile])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) processFile(f)
  }

  const compress = () => {
    if (!file || !previewUrl) return
    setCompressing(true)
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size)
            setCompressedUrl(URL.createObjectURL(blob))
          }
          setCompressing(false)
        },
        format,
        quality
      )
    }
    img.src = previewUrl
  }

  const download = () => {
    if (!compressedUrl) return
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg'
    const a = document.createElement('a')
    a.href = compressedUrl
    a.download = `compressed_${file?.name || 'image'}.${ext}`
    a.click()
  }

  const clear = () => {
    setFile(null)
    setPreviewUrl(null)
    setCompressedUrl(null)
    setOriginalSize(0)
    setCompressedSize(0)
  }

  const savedPercent = compressedSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '图片压缩' }]} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          图片压缩工具 | Image Compressor
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          支持 JPG、PNG、WebP 格式，调节压缩质量，完全在浏览器本地处理，不上传服务器
        </p>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('img-input')?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white hover:border-primary-400'
          }`}
        >
          <input id="img-input" type="file" accept="image/*" onChange={handleInput} className="hidden" />
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="max-h-48 mx-auto rounded-lg shadow-sm" />
          ) : (
            <div>
              <div className="text-4xl mb-2">📁</div>
              <p className="text-gray-600 text-sm">拖拽图片到此处，或<em className="text-primary-600">点击选择文件</em></p>
              <p className="text-xs text-gray-400 mt-1">支持 PNG、JPG、WebP</p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-6 space-y-4">
            {/* File info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm">
              <span className="text-gray-500">文件：</span>
              <span className="font-medium text-gray-800">{file.name}</span>
              <span className="ml-4 text-gray-500">原始大小：</span>
              <span className="font-medium text-gray-800">{(originalSize / 1024).toFixed(1)} KB</span>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">输出格式</label>
                <div className="flex gap-2">
                  {(['image/jpeg', 'image/png', 'image/webp'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`px-3 py-1.5 rounded-lg text-sm min-h-[44px] ${
                        format === f ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {f.split('/')[1].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  压缩质量：{Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>低质量 / 小体积</span>
                  <span>高质量 / 大体积</span>
                </div>
              </div>
            </div>

            {/* Compress button */}
            <button
              onClick={compress}
              disabled={compressing}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 min-h-[44px] disabled:opacity-50"
            >
              {compressing ? '压缩中...' : '开始压缩'}
            </button>

            {/* Result */}
            {compressedUrl && (
              <div className="bg-white rounded-lg border border-green-200 p-4 space-y-3">
                <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                  <span>✅ 压缩完成</span>
                  {savedPercent && Number(savedPercent) > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                      节省 {savedPercent}%
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">原始大小</div>
                    <div className="font-semibold">{(originalSize / 1024).toFixed(1)} KB</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">压缩后大小</div>
                    <div className="font-semibold text-green-700">{(compressedSize / 1024).toFixed(1)} KB</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={download} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 min-h-[44px]">
                    下载压缩图片
                  </button>
                  <button onClick={clear} className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50 min-h-[44px]">
                    重新选择
                  </button>
                </div>
                {/* Preview compressed */}
                <div>
                  <div className="text-sm text-gray-500 mb-1">压缩后预览</div>
                  <img src={compressedUrl} alt="compressed" className="max-h-48 rounded-lg border border-gray-200" />
                </div>
              </div>
            )}
          </div>
        )}

        <RelatedTools current="image-compressor" />
      </div>
    </div>
  )
}
