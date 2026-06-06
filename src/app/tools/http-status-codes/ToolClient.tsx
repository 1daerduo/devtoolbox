'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface StatusEntry {
  code: number
  name: string
  category: string
  description: string
  useCase: string
}

const statusData: StatusEntry[] = [
  // 1xx Informational
  { code: 100, name: 'Continue', category: '1xx', description: 'The server has received the request headers and the client should proceed to send the request body.', useCase: 'Large file uploads, expect-continue' },
  { code: 101, name: 'Switching Protocols', category: '1xx', description: 'The server is switching protocols as requested by the client via Upgrade header.', useCase: 'WebSocket upgrade, HTTP/2 upgrade' },
  { code: 102, name: 'Processing', category: '1xx', description: 'The server has received and is processing the request, but no response is available yet.', useCase: 'WebDAV long-running operations' },
  { code: 103, name: 'Early Hints', category: '1xx', description: 'Used to return some response headers before final HTTP message.', useCase: 'Preloading resources while server prepares response' },
  // 2xx Success
  { code: 200, name: 'OK', category: '2xx', description: 'The request has succeeded.', useCase: 'Standard successful GET/POST response' },
  { code: 201, name: 'Created', category: '2xx', description: 'The request has been fulfilled and a new resource has been created.', useCase: 'REST API POST creating a new resource' },
  { code: 202, name: 'Accepted', category: '2xx', description: 'The request has been accepted for processing, but the processing has not been completed.', useCase: 'Async operations, batch processing' },
  { code: 204, name: 'No Content', category: '2xx', description: 'The server has fulfilled the request but does not need to return an entity-body.', useCase: 'Successful DELETE, PUT without response body' },
  { code: 206, name: 'Partial Content', category: '2xx', description: 'The server has fulfilled the partial GET request for the resource.', useCase: 'Range requests, video streaming, download resume' },
  { code: 301, name: 'Moved Permanently', category: '3xx', description: 'The requested resource has been assigned a new permanent URI.', useCase: 'Domain migration, URL restructuring, HTTP to HTTPS' },
  { code: 302, name: 'Found', category: '3xx', description: 'The requested resource resides temporarily under a different URI.', useCase: 'Temporary redirects, login redirects' },
  { code: 304, name: 'Not Modified', category: '3xx', description: 'The resource has not been modified since the last request.', useCase: 'Browser cache validation, conditional GET' },
  { code: 307, name: 'Temporary Redirect', category: '3xx', description: 'The requested resource resides temporarily under a different URI, preserving the request method.', useCase: 'Temporary redirect preserving POST method' },
  { code: 308, name: 'Permanent Redirect', category: '3xx', description: 'The resource is now permanently located at a different URI, preserving the request method.', useCase: 'Permanent redirect preserving POST method' },
  // 4xx Client Error
  { code: 400, name: 'Bad Request', category: '4xx', description: 'The server could not understand the request due to malformed syntax.', useCase: 'Invalid JSON, missing required fields, bad query params' },
  { code: 401, name: 'Unauthorized', category: '4xx', description: 'The request requires user authentication.', useCase: 'Missing or invalid API key, expired token' },
  { code: 403, name: 'Forbidden', category: '4xx', description: 'The server understood the request but refuses to authorize it.', useCase: 'Insufficient permissions, IP blocked, rate limited' },
  { code: 404, name: 'Not Found', category: '4xx', description: 'The server has not found anything matching the Request-URI.', useCase: 'Invalid URL, deleted resource, typo in endpoint' },
  { code: 405, name: 'Method Not Allowed', category: '4xx', description: 'The method specified in the Request-Line is not allowed for the identified resource.', useCase: 'POST to a GET-only endpoint' },
  { code: 408, name: 'Request Timeout', category: '4xx', description: 'The client did not produce a request within the time the server was prepared to wait.', useCase: 'Slow client connection, upload timeout' },
  { code: 409, name: 'Conflict', category: '4xx', description: 'The request could not be completed due to a conflict with the current state of the resource.', useCase: 'Duplicate entry, version conflict, concurrent edit' },
  { code: 410, name: 'Gone', category: '4xx', description: 'The requested resource is no longer available and no forwarding address is known.', useCase: 'Permanently deleted resource' },
  { code: 413, name: 'Payload Too Large', category: '4xx', description: 'The request entity is larger than limits defined by server.', useCase: 'File upload exceeding size limit' },
  { code: 415, name: 'Unsupported Media Type', category: '4xx', description: 'The server refuses to accept the request because the payload format is unsupported.', useCase: 'Sending XML when API expects JSON' },
  { code: 422, name: 'Unprocessable Entity', category: '4xx', description: 'The server understands the content type and syntax but was unable to process the contained instructions.', useCase: 'Validation errors in REST API' },
  { code: 429, name: 'Too Many Requests', category: '4xx', description: 'The user has sent too many requests in a given amount of time.', useCase: 'Rate limiting, API throttling' },
  // 5xx Server Error
  { code: 500, name: 'Internal Server Error', category: '5xx', description: 'The server encountered an unexpected condition which prevented it from fulfilling the request.', useCase: 'Unhandled exception, server crash' },
  { code: 501, name: 'Not Implemented', category: '5xx', description: 'The server does not support the functionality required to fulfill the request.', useCase: 'Unsupported HTTP method on endpoint' },
  { code: 502, name: 'Bad Gateway', category: '5xx', description: 'The server received an invalid response from an upstream server.', useCase: 'Reverse proxy / load balancer, upstream server down' },
  { code: 503, name: 'Service Unavailable', category: '5xx', description: 'The server is currently unable to handle the request due to temporary overloading or maintenance.', useCase: 'Server maintenance, capacity overload' },
  { code: 504, name: 'Gateway Timeout', category: '5xx', description: 'The server did not receive a timely response from an upstream server.', useCase: 'Upstream server timeout, slow API response' },
  { code: 505, name: 'HTTP Version Not Supported', category: '5xx', description: 'The server does not support the HTTP protocol version used in the request.', useCase: 'HTTP/2 client talking to HTTP/1.1 only server' },
]

const categories = [
  { id: 'all', label: 'All', color: 'gray' },
  { id: '1xx', label: '1xx Informational', color: 'blue' },
  { id: '2xx', label: '2xx Success', color: 'green' },
  { id: '3xx', label: '3xx Redirection', color: 'yellow' },
  { id: '4xx', label: '4xx Client Error', color: 'red' },
  { id: '5xx', label: '5xx Server Error', color: 'purple' },
]

const catColors: Record<string, string> = {
  '1xx': 'bg-blue-100 text-blue-800 border-blue-200',
  '2xx': 'bg-green-100 text-green-800 border-green-200',
  '3xx': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  '4xx': 'bg-red-100 text-red-800 border-red-200',
  '5xx': 'bg-purple-100 text-purple-800 border-purple-200',
}

export default function HttpStatusCodesClient() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')

  const filtered = useMemo(() => {
    return statusData.filter(s => {
      const matchCat = selectedCat === 'all' || s.category === selectedCat
      const matchSearch = !search ||
        s.code.toString().includes(search) ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, selectedCat])

  const selectedEntry = useMemo(() => {
    if (filtered.length === 1 && search.match(/^\d{3}$/)) return filtered[0]
    return null
  }, [filtered, search])

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'HTTP Status Code Reference' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">HTTP Status Code Reference</h1>
      <p className="text-sm text-gray-500 mb-6">Quick reference for all standard HTTP response codes. Search by code number or name.</p>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by code (e.g. 404) or name..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="flex gap-1">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                selectedCat === cat.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Code Cards */}
      <div className="space-y-2">
        {filtered.map(entry => (
          <div key={entry.code}
            className={`bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-300 transition-colors ${selectedEntry?.code === entry.code ? 'ring-2 ring-primary-500' : ''}`}>
            <div className="flex items-start gap-3">
              <span className={`inline-flex items-center justify-center w-16 h-10 rounded-lg text-sm font-mono font-bold border ${catColors[entry.category]}`}>
                {entry.code}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{entry.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${catColors[entry.category]}`}>{entry.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{entry.description}</p>
                <p className="text-xs text-gray-400">
                  <span className="font-medium">Use case:</span> {entry.useCase}
                </p>
              </div>
              <CopyButton text={entry.code.toString()} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No status codes found matching your search.
        </div>
      )}

      <div className="mt-6 text-xs text-gray-400">
        Showing {filtered.length} of {statusData.length} status codes.
      </div>

      <RelatedTools current="http-status-codes" />
    </div>
  )
}
