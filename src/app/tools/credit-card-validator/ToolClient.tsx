'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, '')
  if (digits.length < 2) return false
  let sum = 0
  let isDouble = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10)
    if (isDouble) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    isDouble = !isDouble
  }
  return sum % 10 === 0
}

interface CardType {
  name: string
  icon: string
  color: string
  patterns: RegExp[]
}

const cardTypes: CardType[] = [
  { name: 'Visa', icon: '💳', color: 'bg-blue-100 text-blue-700', patterns: [/^4/] },
  { name: 'MasterCard', icon: '💳', color: 'bg-orange-100 text-orange-700', patterns: [/^5[1-5]/, /^2[2-7]/] },
  { name: 'American Express', icon: '💳', color: 'bg-green-100 text-green-700', patterns: [/^3[47]/] },
  { name: 'Discover', icon: '💳', color: 'bg-purple-100 text-purple-700', patterns: [/^6(?:011|5)/] },
  { name: 'Diners Club', icon: '💳', color: 'bg-teal-100 text-teal-700', patterns: [/^3(?:0[0-5]|[68])/] },
  { name: 'JCB', icon: '💳', color: 'bg-red-100 text-red-700', patterns: [/^35/] },
  { name: 'UnionPay', icon: '💳', color: 'bg-rose-100 text-rose-700', patterns: [/^62/] },
]

function identifyCard(num: string): CardType | null {
  const digits = num.replace(/\D/g, '')
  for (const ct of cardTypes) {
    if (ct.patterns.some(p => p.test(digits))) return ct
  }
  return null
}

export default function CreditCardValidatorClient() {
  const [input, setInput] = useState('')
  const [batchMode, setBatchMode] = useState(false)
  const [batchInput, setBatchInput] = useState('')

  const singleResult = useMemo(() => {
    if (!input.trim()) return null
    const digits = input.replace(/\D/g, '')
    if (digits.length === 0) return null
    const isValid = luhnCheck(digits)
    const cardType = identifyCard(digits)
    const lengthValid = digits.length >= 13 && digits.length <= 19
    return { digits, isValid, cardType, lengthValid, length: digits.length }
  }, [input])

  const batchResults = useMemo(() => {
    if (!batchInput.trim()) return []
    return batchInput
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const digits = line.replace(/\D/g, '')
        if (digits.length === 0) return null
        const isValid = luhnCheck(digits)
        const cardType = identifyCard(digits)
        return { original: line.trim(), digits, isValid, cardType, length: digits.length }
      })
      .filter(Boolean)
  }, [batchInput])

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Credit Card Validator' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">信用卡验证器 | Credit Card Validator</h1>
      <p className="text-sm text-gray-500 mb-6">Validate credit card numbers using the Luhn algorithm. Identify card type instantly. All processing happens locally in your browser.</p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setBatchMode(false)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!batchMode ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Single Check
        </button>
        <button
          onClick={() => setBatchMode(true)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${batchMode ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Batch Check
        </button>
      </div>

      {!batchMode ? (
        /* Single Mode */
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter card number (e.g. 4111 1111 1111 1111)"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500 tracking-wider"
              maxLength={23}
            />
          </div>

          {singleResult && singleResult.digits.length > 0 && (
            <div className={`rounded-xl border p-5 mb-6 ${singleResult.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{singleResult.isValid ? '✅' : '❌'}</span>
                <div>
                  <div className={`text-lg font-bold ${singleResult.isValid ? 'text-green-700' : 'text-red-700'}`}>
                    {singleResult.isValid ? 'Valid Card Number' : 'Invalid Card Number'}
                  </div>
                  <div className="text-xs text-gray-500">Luhn check {singleResult.isValid ? 'passed' : 'failed'}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Card Type</div>
                  {singleResult.cardType ? (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${singleResult.cardType.color}`}>
                      {singleResult.cardType.icon} {singleResult.cardType.name}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Unknown</span>
                  )}
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Length</div>
                  <div className="text-sm font-mono">{singleResult.length} digits {singleResult.lengthValid ? '✓' : '(unusual)'}</div>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Formatted</div>
                  <div className="text-sm font-mono tracking-wider">{singleResult.digits.replace(/(.{4})/g, '$1 ').trim()}</div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Batch Mode */
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <label className="text-xs text-gray-500 mb-1 block">Card Numbers (one per line)</label>
            <textarea
              value={batchInput}
              onChange={e => setBatchInput(e.target.value)}
              placeholder="4111111111111111&#10;5500000000000004&#10;340000000000009"
              rows={6}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
            />
          </div>

          {batchResults.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Results ({batchResults.length} cards)</h3>
                <CopyButton text={batchResults.map((r: any) => `${r.digits} | ${r.isValid ? 'VALID' : 'INVALID'} | ${r.cardType?.name || 'Unknown'}`).join('\n')} />
              </div>
              <div className="space-y-1.5">
                {batchResults.map((r: any, i: number) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-lg text-xs font-mono ${r.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                    <span>{r.isValid ? '✅' : '❌'}</span>
                    <span className="flex-1 tracking-wider">{r.digits.replace(/(.{4})/g, '$1 ').trim()}</span>
                    <span className={`px-2 py-0.5 rounded ${r.cardType?.color || 'bg-gray-100 text-gray-500'}`}>{r.cardType?.name || 'Unknown'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lg">🔒</span>
          <div>
            <div className="text-sm font-semibold text-yellow-800">Security Notice</div>
            <div className="text-xs text-yellow-700 mt-1">All validation runs entirely in your browser. No data is sent to any server. For security, only use test card numbers — never enter real credit card information.</div>
          </div>
        </div>
      </div>

      <RelatedTools current="credit-card-validator" />
    </div>
  )
}
