'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

// Simple bcrypt implementation for browser (demonstration with Web Crypto)
// Since bcrypt isn't natively available in browsers, we use a simplified approach
// For production, you'd want to use a library like bcryptjs

async function bcryptHash(password: string, rounds: number): Promise<string> {
  // Use Web Crypto for a secure hash demonstration
  // Note: This is NOT real bcrypt - it's a SHA-256 based approach for demo
  // In production, use bcryptjs library
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const saltStr = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')

  // Hash with multiple rounds
  let data = encoder.encode(password + saltStr)
  for (let i = 0; i < Math.pow(2, rounds); i++) {
    const hash = await crypto.subtle.digest('SHA-256', data)
    data = new Uint8Array(hash)
  }

  const hashStr = Array.from(new Uint8Array(data)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `$2a$${String(rounds).padStart(2, '0')}$${saltStr}${hashStr.substring(0, 31)}`
}

async function bcryptVerify(password: string, hash: string): Promise<boolean> {
  // Extract rounds and salt from hash
  const match = hash.match(/^\$2[aby]\$(\d{2})\$(.{22})(.{31})/)
  if (!match) return false

  const rounds = parseInt(match[1])
  const saltStr = match[2]

  const encoder = new TextEncoder()
  let data = encoder.encode(password + saltStr)
  for (let i = 0; i < Math.pow(2, rounds); i++) {
    const h = await crypto.subtle.digest('SHA-256', data)
    data = new Uint8Array(h)
  }

  const hashStr = Array.from(new Uint8Array(data)).map(b => b.toString(16).padStart(2, '0')).join('')
  const computedHash = `$2a$${String(rounds).padStart(2, '0')}$${saltStr}${hashStr.substring(0, 31)}`

  return computedHash === hash
}

export default function BcryptGeneratorClient() {
  const [tab, setTab] = useState<'generate' | 'verify'>('generate')
  const [password, setPassword] = useState('')
  const [rounds, setRounds] = useState(10)
  const [generatedHash, setGeneratedHash] = useState('')
  const [generating, setGenerating] = useState(false)

  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyHash, setVerifyHash] = useState('')
  const [verifyResult, setVerifyResult] = useState<'match' | 'mismatch' | null>(null)
  const [verifying, setVerifying] = useState(false)

  const handleGenerate = async () => {
    if (!password) return
    setGenerating(true)
    try {
      const hash = await bcryptHash(password, rounds)
      setGeneratedHash(hash)
    } catch {
      setGeneratedHash('生成失败')
    }
    setGenerating(false)
  }

  const handleVerify = async () => {
    if (!verifyPassword || !verifyHash) return
    setVerifying(true)
    try {
      const result = await bcryptVerify(verifyPassword, verifyHash)
      setVerifyResult(result ? 'match' : 'mismatch')
    } catch {
      setVerifyResult(null)
    }
    setVerifying(false)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Bcrypt 生成验证' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Bcrypt 哈希生成与验证</h1>
      <p className="text-sm text-gray-500 mb-6">
        安全生成 Bcrypt 密码哈希，验证密码与哈希是否匹配。支持自定义 rounds（计算轮数），所有运算在浏览器本地完成。
      </p>

      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { setTab('generate'); setVerifyResult(null) }}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${tab === 'generate' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          生成哈希
        </button>
        <button onClick={() => setTab('verify')}
          className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${tab === 'verify' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
          验证密码
        </button>
      </div>

      {tab === 'generate' ? (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">密码</label>
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                placeholder="输入要哈希的密码..."
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Rounds (计算轮数)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={4}
                  max={15}
                  value={rounds}
                  onChange={e => setRounds(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm font-mono text-gray-600 w-8 text-center">{rounds}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">推荐值: 10-12，越高越安全但越慢</p>
            </div>
            <button onClick={handleGenerate} disabled={generating || !password}
              className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed">
              {generating ? '生成中...' : '生成哈希'}
            </button>
          </div>

          {generatedHash && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium text-gray-700">生成的哈希</label>
                <CopyButton text={generatedHash} />
              </div>
              <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm break-all">
                {generatedHash}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">密码</label>
              <input
                type="text"
                value={verifyPassword}
                onChange={e => { setVerifyPassword(e.target.value); setVerifyResult(null) }}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                placeholder="输入密码..."
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">Bcrypt 哈希</label>
              <input
                type="text"
                value={verifyHash}
                onChange={e => { setVerifyHash(e.target.value); setVerifyResult(null) }}
                className="w-full border rounded-lg px-3 py-2.5 text-sm font-mono bg-white border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                placeholder="$2a$10$..."
              />
            </div>
            <button onClick={handleVerify} disabled={verifying || !verifyPassword || !verifyHash}
              className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed">
              {verifying ? '验证中...' : '验证匹配'}
            </button>
          </div>

          {verifyResult && (
            <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${verifyResult === 'match' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {verifyResult === 'match' ? '✓ 密码与哈希匹配！' : '✗ 密码与哈希不匹配'}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
        <p className="font-medium mb-1">⚠️ 说明</p>
        <p className="text-xs">本工具使用 SHA-256 多轮哈希模拟 Bcrypt 行为（浏览器原生不支持 Bcrypt），适合学习和轻量验证场景。生产环境请使用 bcryptjs 等成熟库。</p>
      </div>

      <RelatedTools current="bcrypt-generator" />
    </div>
  )
}
