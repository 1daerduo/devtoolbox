'use client'
import { useState, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

const SIZES = [16, 32, 48, 64, 128, 256] as const
const EMOJIS = ['😀','😂','🎉','🔥','❤️','⭐','🚀','💡','✅','📚','🎨','🔧','💻','🌐','📱','🛠️']

export default function FaviconEmojiClient() {
  const [emoji, setEmoji] = useState('😀')
  const [results, setResults] = useState<{ size: number; dataUrl: string }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    const canvas = canvasRef.current!
    const newResults: { size: number; dataUrl: string }[] = []
    SIZES.forEach(size => {
      canvas.width = size; canvas.height = size
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, size, size)
      ctx.font = `${Math.floor(size * 0.8)}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(emoji, size / 2, size / 2)
      newResults.push({ size, dataUrl: canvas.toDataURL('image/png') })
    })
    setResults(newResults)
  }

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    results.forEach(({ size, dataUrl }) => zip.file(`favicon-${size}x${size}.png`, dataUrl.replace(/^data:image\/png;base64,/, ''), { base64: true }))
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'favicon-emoji.zip'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Emoji Favicon 生成器' }]} />
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Emoji Favicon 生成器</h1>
      <p className="text-sm text-gray-500 mb-6">选择 Emoji，生成透明背景 Favicon，适合个人博客和小型项目。</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="font-medium text-gray-700 block mb-2">选择 Emoji</label>
          <div className="grid grid-cols-8 gap-2 mb-4">
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)} className={`text-2xl p-2 rounded-lg border-2 transition-all ${emoji === e ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>{e}</button>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-500 block mb-1">自定义 Emoji</label>
            <input value={emoji} onChange={e => setEmoji(e.target.value)} className="w-20 text-2xl text-center border rounded p-2 bg-white border-gray-300" maxLength={2} />
          </div>
          <button onClick={generate} className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">生成 Favicon</button>
          {results.length > 0 && <button onClick={downloadZip} className="ml-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm font-medium">下载全部 ZIP</button>}
        </div>
        <div>
          {results.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">生成结果（点击下载）</p>
              <div className="grid grid-cols-3 gap-3">{results.map(({ size, dataUrl }) => (
                <div key={size} className="text-center"><img src={dataUrl} alt={`${size}x${size}`} className="border rounded cursor-pointer hover:shadow-md" style={{ width: Math.min(size, 64), height: Math.min(size, 64) }} onClick={() => { const a = document.createElement('a'); a.href = dataUrl; a.download = `favicon-${size}x${size}.png`; a.click() }} /><p className="text-xs text-gray-500 mt-1">{size}×{size}</p></div>
              ))}</div>
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="favicon-emoji" />
    </div>
  )
}
