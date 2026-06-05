'use client'

import { useState, useCallback, useRef } from 'react'
import QRCode from 'qrcode'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

export default function QrcodeClient() {
  const [text, setText] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [size, setSize] = useState(256)
  const [colorDark, setColorDark] = useState('#000000')
  const [colorLight, setColorLight] = useState('#ffffff')
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = useCallback(async () => {
    if (!text.trim()) {
      setError('请输入文本或网址')
      return
    }
    setError('')
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: colorDark, light: colorLight },
      })
      setQrDataUrl(url)
    } catch (e: any) {
      setError('生成失败：' + e.message)
    }
  }, [text, size, colorDark, colorLight])

  const download = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '二维码生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">二维码生成器</h1>
      <p className="text-sm text-gray-500 mb-6">输入文本或网址，实时生成高清二维码，支持自定义颜色和尺寸，一键下载 PNG。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="font-medium text-gray-700 block mb-2">输入内容</label>
          <textarea
            className="w-full min-h-[100px] border rounded-lg p-3 text-sm bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none mb-3"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="输入文本或网址（URL）..."
          />
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">尺寸</label>
              <select value={size} onChange={e => setSize(Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-sm bg-white border-gray-300 text-gray-900">
                <option value={128}>128px</option>
                <option value={256}>256px</option>
                <option value={512}>512px</option>
                <option value={1024}>1024px</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">前景色</label>
              <input type="color" value={colorDark} onChange={e => setColorDark(e.target.value)}
                className="w-full h-8 border rounded" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">背景色</label>
              <input type="color" value={colorLight} onChange={e => setColorLight(e.target.value)}
                className="w-full h-8 border rounded" />
            </div>
          </div>
          <button onClick={generate}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
            生成二维码
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {qrDataUrl ? (
            <div className="text-center">
              <img src={qrDataUrl} alt="生成的二维码" className="border rounded-lg max-w-full" />
              <div className="mt-3 flex gap-2 justify-center">
                <button onClick={download}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium min-h-[44px]">
                  下载 PNG
                </button>
              </div>
            </div>
          ) : (
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              二维码预览
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      <RelatedTools current="qrcode" />
    </div>
  )
}
