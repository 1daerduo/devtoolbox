'use client'

import { useState, useCallback } from 'react'
import QRCode from 'qrcode.react'

export default function QrCodePage() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [showQr, setShowQr] = useState(false)

  const generate = useCallback(() => {
    if (!text.trim()) return
    setShowQr(true)
  }, [text])

  const download = useCallback(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.png'
    a.click()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">二维码生成器</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="bg-white border rounded-lg p-5 border-gray-200">
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">内容</label>
            <textarea
              className="w-full h-32 border rounded-lg p-3 text-sm bg-white border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              placeholder="输入文本或网址，如 https://example.com"
              value={text}
              onChange={e => { setText(e.target.value); setShowQr(false) }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">尺寸</label>
              <select value={size} onChange={e => setSize(Number(e.target.value))}
                className="w-full border rounded p-2 text-sm bg-white border-gray-300 text-gray-900">
                <option value={128}>128×128</option>
                <option value={256}>256×256</option>
                <option value={512}>512×512</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">前景色</label>
              <input type="color" value={fgColor}
                onChange={e => setFgColor(e.target.value)}
                className="w-full h-9 border rounded cursor-pointer bg-white border-gray-300" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">背景色</label>
              <input type="color" value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-full h-9 border rounded cursor-pointer bg-white border-gray-300" />
            </div>
          </div>

          <button onClick={generate}
            disabled={!text.trim()}
            className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 text-sm font-medium">
            生成二维码
          </button>
        </div>

        {/* Preview */}
        <div className="bg-white border rounded-lg p-5 flex flex-col items-center justify-center border-gray-200">
          {!showQr && (
            <div className="text-gray-400 text-sm text-center py-20">
              输入内容后点击「生成二维码」<br />预览将显示在这里
            </div>
          )}
          {showQr && (
            <>
              <QRCode value={text} size={size} fgColor={fgColor} bgColor={bgColor} />
              <button onClick={download}
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                下载 PNG
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 bg-gray-100 rounded-lg p-4 text-center text-gray-400 text-xs border-2 border-dashed border-gray-300">
        [ 广告位 - AdSense ]
      </div>
    </div>
  )
}
