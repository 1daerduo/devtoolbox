'use client'

import { useState, useEffect, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

interface UAInfo {
  browser: string
  browserVersion: string
  os: string
  osVersion: string
  device: string
  engine: string
  isMobile: boolean
  isBot: boolean
}

function parseUA(ua: string): UAInfo {
  const info: UAInfo = {
    browser: '未知',
    browserVersion: '',
    os: '未知',
    osVersion: '',
    device: '桌面端',
    engine: '未知',
    isMobile: false,
    isBot: false,
  }

  if (/bot|crawler|spider|scraper/i.test(ua)) {
    info.isBot = true
    info.browser = '爬虫/Bot'
  }

  // Browser detection
  if (/Edg\/([\d.]+)/.test(ua)) {
    info.browser = 'Microsoft Edge'
    info.browserVersion = RegExp.$1
  } else if (/Chrome\/([\d.]+)/.test(ua) && !/Edg/.test(ua)) {
    info.browser = 'Chrome'
    info.browserVersion = RegExp.$1
  } else if (/Firefox\/([\d.]+)/.test(ua)) {
    info.browser = 'Firefox'
    info.browserVersion = RegExp.$1
  } else if (/Safari\/([\d.]+)/.test(ua) && !/Chrome/.test(ua)) {
    info.browser = 'Safari'
    info.browserVersion = RegExp.$1
  } else if (/OPR\/([\d.]+)/.test(ua)) {
    info.browser = 'Opera'
    info.browserVersion = RegExp.$1
  }

  // OS detection
  if (/Windows NT ([\d.]+)/.test(ua)) {
    info.os = 'Windows'
    info.osVersion = RegExp.$1
  } else if (/Mac OS X ([\d_]+)/.test(ua)) {
    info.os = 'macOS'
    info.osVersion = RegExp.$1.replace(/_/g, '.')
  } else if (/Android ([\d.]+)/.test(ua)) {
    info.os = 'Android'
    info.osVersion = RegExp.$1
    info.device = '移动端'
    info.isMobile = true
  } else if (/iPhone OS ([\d_]+)/.test(ua)) {
    info.os = 'iOS'
    info.osVersion = RegExp.$1.replace(/_/g, '.')
    info.device = '移动端'
    info.isMobile = true
  } else if (/Linux/.test(ua) && !/Android/.test(ua)) {
    info.os = 'Linux'
  }

  // Engine detection
  if (/AppleWebKit\/([\d.]+)/.test(ua)) info.engine = `WebKit ${RegExp.$1}`
  if (/Gecko\//.test(ua)) info.engine = 'Gecko'

  return info
}

export default function UserAgentClient() {
  const [customUA, setCustomUA] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  const currentUA = typeof window !== 'undefined' ? navigator.userAgent : ''
  const uaToParse = useCustom && customUA.trim() ? customUA.trim() : currentUA
  const info = useMemo(() => parseUA(uaToParse), [uaToParse])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'User Agent 解析器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">User Agent 解析器</h1>
      <p className="text-sm text-gray-500 mb-6">解析浏览器 UA 字符串，识别浏览器、操作系统、设备类型等信息。</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={e => setUseCustom(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">手动输入 UA 字符串</span>
          </label>
        </div>

        {useCustom && (
          <textarea
            value={customUA}
            onChange={e => setCustomUA(e.target.value)}
            placeholder="粘贴 User Agent 字符串..."
            className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        )}

        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs font-mono text-gray-600 break-all">
          {uaToParse || '无法获取 UA（服务端渲染中）'}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: '浏览器', value: info.browser + (info.browserVersion ? ` ${info.browserVersion}` : '') },
          { label: '操作系统', value: info.os + (info.osVersion ? ` ${info.osVersion}` : '') },
          { label: '设备类型', value: info.device },
          { label: '渲染引擎', value: info.engine },
          { label: '是否移动端', value: info.isMobile ? '是 📱' : '否 🖥️' },
          { label: '是否爬虫', value: info.isBot ? '是 🤖' : '否' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-xs text-gray-400 mb-1">{item.label}</div>
            <div className="text-sm font-medium text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      <RelatedTools current="user-agent" />
    </div>
  )
}
