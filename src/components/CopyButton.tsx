'use client'

import { useState } from 'react'

interface Props {
  text: string
  label?: string
  className?: string
}

export default function CopyButton({ text, label = '复制', className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`text-sm font-medium transition-all ${
        copied
          ? 'text-green-600 bg-green-50 border-green-300'
          : 'text-primary-600 border-gray-200 hover:bg-primary-50 hover:border-primary-300'
      } border rounded-md px-3 py-1 ${className}`}
    >
      {copied ? '✓ 已复制' : label}
    </button>
  )
}
