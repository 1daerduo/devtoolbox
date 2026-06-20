'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface UrlParts {
  protocol: string
  hostname: string
  port: string
  pathname: string
  search: string
  hash: string
  origin: string
}

interface QueryParam {
  key: string
  value: string
}

function parseUrl(input: string): UrlParts & { queryParams: QueryParam[]; valid: boolean; error?: string } {
  if (!input.trim()) {
    return { protocol: '', hostname: '', port: '', pathname: '', search: '', hash: '', origin: '', queryParams: [], valid: false }
  }

  let url: URL
  try {
    // If input doesn't have a protocol, prepend one for parsing
    const hasProtocol = /^[a-zA-Z]+:\/\//.test(input)
    url = new URL(hasProtocol ? input : `https://${input}`)
  } catch {
    return { protocol: '', hostname: '', port: '', pathname: '', search: '', hash: '', origin: '', queryParams: [], valid: false, error: 'Invalid URL format' }
  }

  const params: QueryParam[] = []
  url.searchParams.forEach((value, key) => {
    params.push({ key, value })
  })

  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? '443' : url.protocol === 'http:' ? '80' : ''),
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    origin: url.origin,
    queryParams: params,
    valid: true,
  }
}

export default function UrlParserClient() {
  const [urlInput, setUrlInput] = useState('https://example.com:8080/path/to/page?name=John&age=30&lang=en#section-2')

  const parsed = useMemo(() => parseUrl(urlInput), [urlInput])

  const parts = [
    { label: 'Protocol', value: parsed.protocol, icon: '🔒', color: 'blue' },
    { label: 'Hostname', value: parsed.hostname, icon: '🌐', color: 'green' },
    { label: 'Port', value: parsed.port, icon: '🔌', color: 'purple' },
    { label: 'Pathname', value: parsed.pathname, icon: '📁', color: 'yellow' },
    { label: 'Search', value: parsed.search, icon: '🔍', color: 'red' },
    { label: 'Hash', value: parsed.hash, icon: '#️⃣', color: 'indigo' },
    { label: 'Origin', value: parsed.origin, icon: '🏠', color: 'teal' },
  ]

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'URL Parser' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">URL 解析器 | URL Parser</h1>
      <p className="text-sm text-gray-500 mb-6">Parse any URL into its components: protocol, hostname, port, path, query parameters, and hash fragment. All processing runs in your browser.</p>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-2 block">Enter URL</label>
        <input
          type="text"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          placeholder="https://example.com/path?key=value#hash"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          autoFocus
        />
        {parsed.error && (
          <p className="mt-2 text-sm text-red-500">{parsed.error}</p>
        )}
      </div>

      {parsed.valid && (
        <>
          {/* URL Components */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">URL Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {parts.map(part => (
                <div key={part.label} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <span className="text-lg shrink-0">{part.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 mb-1">{part.label}</div>
                    <div className="text-sm font-mono text-gray-800 break-all">
                      {part.value || <span className="text-gray-300 italic">(empty)</span>}
                    </div>
                  </div>
                  {part.value && <CopyButton text={part.value} />}
                </div>
              ))}
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Visual Breakdown</h3>
            <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm leading-relaxed break-all">
              {parsed.protocol && (
                <span className="bg-blue-100 text-blue-800 px-1 rounded">{parsed.protocol}://</span>
              )}
              {parsed.hostname && (
                <span className="bg-green-100 text-green-800 px-1 rounded">{parsed.hostname}</span>
              )}
              {parsed.port && parsed.port !== '80' && parsed.port !== '443' && (
                <span className="bg-purple-100 text-purple-800 px-1 rounded">:{parsed.port}</span>
              )}
              {parsed.pathname && (
                <span className="bg-yellow-100 text-yellow-800 px-1 rounded">{parsed.pathname}</span>
              )}
              {parsed.search && (
                <span className="bg-red-100 text-red-800 px-1 rounded">{parsed.search}</span>
              )}
              {parsed.hash && (
                <span className="bg-indigo-100 text-indigo-800 px-1 rounded">{parsed.hash}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-100 inline-block" /> Protocol</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 inline-block" /> Hostname</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-100 inline-block" /> Port</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-100 inline-block" /> Path</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 inline-block" /> Query</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-100 inline-block" /> Hash</span>
            </div>
          </div>

          {/* Query Parameters */}
          {parsed.queryParams.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Query Parameters ({parsed.queryParams.length})</h3>
                <CopyButton text={parsed.search} />
              </div>
              <div className="space-y-2">
                {parsed.queryParams.map((param, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <span className="text-xs text-gray-400 w-5 text-right">{i + 1}</span>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400">Key</span>
                        <div className="text-sm font-mono text-gray-800">{decodeURIComponent(param.key)}</div>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400">Value</span>
                        <div className="text-sm font-mono text-gray-800">{decodeURIComponent(param.value)}</div>
                      </div>
                    </div>
                    <CopyButton text={`${param.key}=${param.value}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Encoded / Decoded */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Encoding Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="text-[10px] text-gray-400 mb-1">Full URL (encoded)</div>
                <div className="text-xs font-mono text-gray-700 break-all">{urlInput}</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="text-[10px] text-gray-400 mb-1">Full URL (decoded)</div>
                <div className="text-xs font-mono text-gray-700 break-all">{decodeURIComponent(urlInput)}</div>
              </div>
            </div>
          </div>
        </>
      )}

      <RelatedTools current="url-parser" />
    </div>
  )
}
