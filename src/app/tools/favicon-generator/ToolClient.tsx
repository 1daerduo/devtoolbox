'use client'

import { useState, useCallback, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const SIZES = [16, 32, 48, 64, 128, 256] as const

export default function FaviconGeneratorClient() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<{ size: number; dataUrl: string }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = useCallback((f: File) => {
    setFile(f)
    setResults([])
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(f)
  }, [])

  const generate = useCallback(async () => {
    if (!file) return
    setGenerating(true)
    setResults([])

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      const results: { size: number; dataUrl: string }[] = []

      SIZES.forEach(size => {
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, size, size)
        results.push({ size, dataUrl: canvas.toDataURL('image/png') })
      })

      setResults(results)
      setGenerating(false)
    }
    img.src = preview
  }, [file, preview])

  const downloadSize = (size: number, dataUrl: string) => {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    results.forEach(({ size, dataUrl }) => {
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '')
      zip.file(`favicon-${size}x${size}.png`, base64, { base64: true })
    })
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favicons.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Favicon 生成器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Favicon 生成器 | Favicon Generator</h1>
      <p className="text-sm text-gray-500 mb-6">上传图片（PNG/JPG/SVG），自动生成 16/32/48/64/128/256px 全尺寸 Favicon，一键下载 ZIP 打包。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="font-medium text-gray-700 block mb-2">上传图片</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
          {file && <p className="text-xs text-gray-500 mt-2">已选择：{file.name}（{(file.size / 1024).toFixed(1)} KB）</p>}

          <button
            onClick={generate}
            disabled={!file || generating}
            className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50"
          >
            {generating ? '生成中...' : '生成 Favicon'}
          </button>

          {results.length > 0 && (
            <div className="mt-4 flex gap-2">
              <button onClick={downloadZip} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium">
                下载全部 ZIP
              </button>
            </div>
          )}
        </div>

        <div>
          {preview && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">原图预览</p>
              <img src={preview} alt="原图" className="w-32 h-32 object-contain border rounded-lg" />
            </div>
          )}
          {results.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">生成结果（点击下载）</p>
              <div className="grid grid-cols-3 gap-3">
                {results.map(({ size, dataUrl }) => (
                  <div key={size} className="text-center">
                    <img
                      src={dataUrl}
                      alt={`${size}x${size}`}
                      className="border rounded cursor-pointer hover:shadow-md"
                      style={{ width: Math.min(size, 64), height: Math.min(size, 64) }}
                      onClick={() => downloadSize(size, dataUrl)}
                    />
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
      <RelatedTools current="favicon-generator" />
    </div>
  )
}
