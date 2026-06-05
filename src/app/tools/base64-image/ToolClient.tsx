'use client'

import { useState, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function Base64ImageClient() {
  const [mode, setMode] = useState<'img2b64' | 'b642img'>('img2b64')
  const [base64Text, setBase64Text] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageInfo, setImageInfo] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setBase64Text(result)
      setPreviewUrl(result)
      const sizeKB = (file.size / 1024).toFixed(1)
      setImageInfo(`${file.name} | ${file.type} | ${sizeKB} KB`)
    }
    reader.onerror = () => setError('文件读取失败')
    reader.readAsDataURL(file)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault()
        const file = item.getAsFile()
        if (!file) continue
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          setBase64Text(result)
          setPreviewUrl(result)
          const sizeKB = (file.size / 1024).toFixed(1)
          setImageInfo(`粘贴的图片 | ${file.type} | ${sizeKB} KB`)
        }
        reader.readAsDataURL(file)
        break
      }
    }
  }

  const handleBase64Input = (val: string) => {
    setBase64Text(val)
    setError('')
    if (mode === 'b642img') {
      if (!val.trim()) {
        setPreviewUrl('')
        return
      }
      try {
        let dataUrl = val.trim()
        if (!dataUrl.startsWith('data:')) {
          // Try to detect type from base64 header
          dataUrl = 'data:image/png;base64,' + dataUrl
        }
        setPreviewUrl(dataUrl)
        setError('')
      } catch {
        setError('无效的 Base64 图片数据')
        setPreviewUrl('')
      }
    }
  }

  const downloadImage = () => {
    if (!previewUrl) return
    const a = document.createElement('a')
    a.href = previewUrl
    a.download = 'converted-image.png'
    a.click()
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Base64 图片互转' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Base64 图片互转</h1>
      <p className="text-sm text-gray-500 mb-6">
        图片与 Base64 编码互转，支持拖拽上传或粘贴图片，支持 PNG/JPG/WebP/SVG 格式。所有处理在浏览器本地完成。
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => { setMode('img2b64'); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'img2b64' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          图片 → Base64
        </button>
        <button onClick={() => { setMode('b642img'); setError('') }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${mode === 'b642img' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          Base64 → 图片
        </button>
      </div>

      {mode === 'img2b64' ? (
        <div>
          <div className="mb-4">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onPaste={handlePaste}
              tabIndex={0}
            >
              <div className="text-4xl mb-2">📁</div>
              <p className="text-gray-600 text-sm">点击选择图片或粘贴截图</p>
              <p className="text-gray-400 text-xs mt-1">支持 PNG, JPG, WebP, SVG, GIF</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {imageInfo && (
            <div className="mb-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{imageInfo}</div>
          )}

          {previewUrl && (
            <div className="mb-4">
              <label className="font-medium text-gray-700 mb-2 block">图片预览</label>
              <img src={previewUrl} alt="Preview" className="max-w-xs max-h-48 border rounded-lg" />
            </div>
          )}

          {base64Text && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">Base64 编码</label>
                <CopyButton text={base64Text} />
              </div>
              <textarea
                className="w-full h-40 border rounded-lg p-3 font-mono text-xs bg-gray-50 border-gray-300 overflow-auto"
                value={base64Text}
                readOnly
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium text-gray-700">输入 Base64 编码</label>
              <button onClick={() => { setBase64Text(''); setPreviewUrl(''); setError('') }}
                className="text-sm text-gray-500 hover:text-red-500">清空</button>
            </div>
            <textarea
              className="w-full h-40 border rounded-lg p-3 font-mono text-xs bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              value={base64Text}
              onChange={e => handleBase64Input(e.target.value)}
              placeholder="粘贴 Base64 编码（data:image/png;base64,... 或纯 Base64 字符串）..."
            />
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

          {previewUrl && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">图片预览</label>
                <button onClick={downloadImage}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium">下载图片</button>
              </div>
              <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-center">
                <img src={previewUrl} alt="Decoded" className="max-w-full max-h-80" />
              </div>
            </div>
          )}
        </div>
      )}

      <RelatedTools current="base64-image" />
    </div>
  )
}
