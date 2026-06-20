'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

const DEFAULT_HTML = `<div class="container">
  <h1>Hello World!</h1>
  <p>Edit this code and see live preview.</p>
  <button onclick="document.querySelector('.container').style.background='linear-gradient(135deg,#667eea,#764ba2)'">
    Click Me
  </button>
</div>

<style>
  .container {
    font-family: system-ui, sans-serif;
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    text-align: center;
    background: #f8fafc;
  }
  h1 { color: #1e293b; margin-bottom: 8px; }
  p { color: #64748b; margin-bottom: 16px; }
  button {
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    cursor: pointer;
    font-size: 14px;
  }
  button:hover { background: #2563eb; }
</style>`

export default function HtmlPlaygroundClient() {
  const [html, setHtml] = useState(DEFAULT_HTML)
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [mode, setMode] = useState<'combined' | 'split'>('combined')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const updatePreview = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const doc = iframe.contentDocument || iframe.contentWindow?.document
    if (!doc) return

    let fullHtml: string
    if (mode === 'split') {
      fullHtml = `<!DOCTYPE html>
<html>
<head><style>${css}</style></head>
<body>${html}
<script>${js}<\/script>
</body></html>`
    } else {
      fullHtml = `<!DOCTYPE html><html><head></head><body>${html}</body></html>`
    }

    doc.open()
    doc.write(fullHtml)
    doc.close()
  }, [html, css, js, mode])

  useEffect(() => {
    const timer = setTimeout(updatePreview, 300)
    return () => clearTimeout(timer)
  }, [updatePreview])

  const handleKeyDown = (e: React.KeyboardEvent, setter: (val: string) => void, value: string) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newVal = value.substring(0, start) + '  ' + value.substring(end)
      setter(newVal)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2
      }, 0)
    }
  }

  const clearAll = () => {
    setHtml('')
    setCss('')
    setJs('')
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'HTML/CSS/JS Playground' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">HTML/CSS/JS 在线 Playground | HTML/CSS/JS Playground</h1>
      <p className="text-sm text-gray-500 mb-4">Write HTML, CSS, and JavaScript code with instant live preview. No setup needed.</p>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl border border-gray-200 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button onClick={() => setMode('combined')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === 'combined' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Combined
          </button>
          <button onClick={() => setMode('split')}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${mode === 'split' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            Split (HTML/CSS/JS)
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
            {theme === 'light' ? 'Dark BG' : 'Light BG'}
          </button>
          <button onClick={clearAll}
            className="px-3 py-1.5 text-xs text-red-600 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors">
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-3">
          {mode === 'split' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">HTML</label>
                <textarea
                  value={html}
                  onChange={e => setHtml(e.target.value)}
                  onKeyDown={e => handleKeyDown(e, setHtml, html)}
                  className="w-full h-32 bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono border border-gray-700 focus:ring-2 focus:ring-primary-500 resize-y"
                  placeholder="Enter HTML..."
                  spellCheck={false}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">CSS</label>
                <textarea
                  value={css}
                  onChange={e => setCss(e.target.value)}
                  onKeyDown={e => handleKeyDown(e, setCss, css)}
                  className="w-full h-32 bg-gray-900 text-blue-400 p-4 rounded-lg text-sm font-mono border border-gray-700 focus:ring-2 focus:ring-primary-500 resize-y"
                  placeholder="Enter CSS..."
                  spellCheck={false}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">JavaScript</label>
                <textarea
                  value={js}
                  onChange={e => setJs(e.target.value)}
                  onKeyDown={e => handleKeyDown(e, setJs, js)}
                  className="w-full h-32 bg-gray-900 text-yellow-400 p-4 rounded-lg text-sm font-mono border border-gray-700 focus:ring-2 focus:ring-primary-500 resize-y"
                  placeholder="Enter JavaScript..."
                  spellCheck={false}
                />
              </div>
            </>
          ) : (
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">HTML + CSS + JS (Combined)</label>
              <textarea
                value={html}
                onChange={e => setHtml(e.target.value)}
                onKeyDown={e => handleKeyDown(e, setHtml, html)}
                className="w-full h-[500px] bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono border border-gray-700 focus:ring-2 focus:ring-primary-500 resize-y"
                placeholder="Enter HTML, CSS, and JS..."
                spellCheck={false}
              />
            </div>
          )}
        </div>

        {/* Preview */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Live Preview</label>
          <div className="rounded-lg border border-gray-200 overflow-hidden" style={{ height: mode === 'split' ? '500px' : '516px' }}>
            <iframe
              ref={iframeRef}
              title="Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-modals"
              style={{ backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff' }}
            />
          </div>
        </div>
      </div>

      <RelatedTools current="html-playground" />
    </div>
  )
}
