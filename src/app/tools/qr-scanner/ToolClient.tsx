'use client'

import { useState, useRef, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// Lightweight QR code decoder using image analysis
// Falls back to jsQR if loaded externally
async function decodeQRFromImage(imageSrc: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(null); return }
      ctx.drawImage(img, 0, 0)

      // Try to load jsQR dynamically
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js'
      script.onload = () => {
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const code = (window as any).jsQR(imageData.data, canvas.width, canvas.height)
          resolve(code ? code.data : null)
        } catch {
          resolve(null)
        }
      }
      script.onerror = () => resolve(null)
      document.head.appendChild(script)
    }
    img.onerror = () => resolve(null)
    img.src = imageSrc
  })
}

export default function ToolClient() {
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件 (PNG/JPEG/WebP)')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const src = e.target?.result as string
      setPreview(src)
      const decoded = await decodeQRFromImage(src)
      setLoading(false)
      if (decoded) {
        setResult(decoded)
      } else {
        setError('未识别到二维码，请确认图片包含清晰的 QR Code')
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        handleFile(items[i].getAsFile()!)
        return
      }
    }
    setError('剪贴板中没有图片，请复制截图后再粘贴')
  }, [handleFile])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" onPaste={handlePaste} tabIndex={0}>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '二维码扫描器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">二维码扫描器 | QR Code Scanner</h1>
      <p className="text-gray-600 mb-6">上传二维码图片或粘贴截图，在线识别解码 QR Code 内容</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">支持的二维码类型</h2>
      <p className="text-gray-600 mb-4 text-sm">支持解码 URL 链接、纯文本、名片 vCard、WiFi 密码、邮箱地址等多种 QR Code 格式。无需安装 App，电脑端手机端均可使用，图片不上传服务器。</p>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors cursor-pointer
          ${dragOver ? 'border-blue-500 bg-blue-50' : preview ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
        {preview ? (
          <div className="flex flex-col items-center gap-2">
            <img src={preview} alt="Preview" className="max-w-[300px] max-h-[200px] rounded shadow-sm" />
            <p className="text-sm text-gray-500">点击重新选择图片</p>
          </div>
        ) : (
          <div>
            <p className="text-4xl mb-3">📷</p>
            <p className="text-gray-600 mb-1">拖拽二维码图片到此处</p>
            <p className="text-sm text-gray-400">或点击选择 / 直接 Ctrl+V 粘贴截图</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mr-2" />
          <span className="text-gray-600">正在识别二维码...</span>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800 mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">识别结果</span>
            <CopyButton text={result} />
          </div>
          <div className="bg-white border rounded p-3 font-mono text-sm break-all">
            {result}
          </div>
          {result.startsWith('http') && (
            <a href={result} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-blue-600 hover:underline">
              在浏览器中打开 →
            </a>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 mb-4">
        <p className="font-medium mb-1 text-gray-700">使用提示：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>支持 PNG/JPEG/WebP 格式的二维码图片</li>
          <li>可直接从聊天软件截图后 Ctrl+V 粘贴</li>
          <li>支持 URL、文本、WiFi、名片等多种二维码格式</li>
          <li>图片在浏览器本地处理，不会上传到服务器</li>
        </ul>
      </div>

      <RelatedTools current="qr-scanner" />
    </div>
  )
}
