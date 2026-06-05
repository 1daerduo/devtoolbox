'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function decodeBase64(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(base64)
    return decodeURIComponent(
      decoded.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    )
  } catch {
    return atob(str)
  }
}

export default function JwtDecoderClient() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [issueTime, setIssueTime] = useState('')
  const [expireTime, setExpireTime] = useState('')
  const [expired, setExpired] = useState(false)

  const decode = () => {
    setError('')
    setHeader('')
    setPayload('')
    setSignature('')
    setIssueTime('')
    setExpireTime('')
    setExpired(false)

    const parts = token.trim().split('.')
    if (parts.length !== 3) {
      setError('无效的 JWT Token：需要包含 Header.Payload.Signature 三部分')
      return
    }

    try {
      const headerStr = decodeBase64(parts[0])
      const headerObj = JSON.parse(headerStr)
      setHeader(JSON.stringify(headerObj, null, 2))
    } catch {
      setError('无法解析 JWT Header')
      return
    }

    try {
      const payloadStr = decodeBase64(parts[1])
      const payloadObj = JSON.parse(payloadStr)
      setPayload(JSON.stringify(payloadObj, null, 2))

      if (payloadObj.iat) {
        setIssueTime(new Date(payloadObj.iat * 1000).toLocaleString('zh-CN'))
      }
      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000)
        setExpireTime(expDate.toLocaleString('zh-CN'))
        setExpired(expDate.getTime() < Date.now())
      }
    } catch {
      setError('无法解析 JWT Payload')
      return
    }

    setSignature(parts[2])
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'JWT 解码器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JWT 在线解码工具</h1>
      <p className="text-sm text-gray-500 mb-6">
        解析 JWT (JSON Web Token) 的 Header、Payload 和 Signature，支持 iat/exp 时间戳转换。
        所有解析完全在浏览器本地完成，Token 不会上传到服务器。
      </p>

      <div className="mb-4">
        <label className="font-medium text-gray-700 mb-2 block">JWT Token</label>
        <textarea
          className="w-full min-h-[100px] border rounded-lg p-3 font-mono text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="粘贴 JWT Token，例如：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgN..."
        />
        <button
          onClick={decode}
          className="mt-3 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px]"
        >
          解码
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {header && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">Header（算法与类型）</label>
            <CopyButton text={header} />
          </div>
          <pre className="w-full border rounded-lg p-3 font-mono text-xs bg-blue-50 border-blue-200 overflow-auto whitespace-pre-wrap max-h-60">
            {header}
          </pre>
        </div>
      )}

      {payload && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">Payload（数据载荷）</label>
            <CopyButton text={payload} />
          </div>
          <pre className="w-full border rounded-lg p-3 font-mono text-xs bg-green-50 border-green-200 overflow-auto whitespace-pre-wrap max-h-60">
            {payload}
          </pre>
          <div className="mt-2 flex gap-4 text-xs text-gray-500 flex-wrap">
            {issueTime && <span>签发时间: {issueTime}</span>}
            {expireTime && (
              <span>
                过期时间: {expireTime}
                {expired && <span className="text-red-500 ml-1">（已过期）</span>}
                {!expired && <span className="text-green-600 ml-1">（有效）</span>}
              </span>
            )}
          </div>
        </div>
      )}

      {signature && (
        <div className="mb-4">
          <label className="font-medium text-gray-700 mb-2 block">Signature（签名）</label>
          <pre className="w-full border rounded-lg p-3 font-mono text-xs bg-gray-50 border-gray-200 overflow-auto break-all">
            {signature}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
        <p className="font-medium mb-1">安全提示</p>
        <p>JWT Token 仅做 Base64 编码，并非加密。请勿在公开环境中分享您的 Token。本站所有解析均在浏览器本地完成，数据不会发送到任何服务器。</p>
      </div>

      <RelatedTools current="jwt-decoder" />
    </div>
  )
}
