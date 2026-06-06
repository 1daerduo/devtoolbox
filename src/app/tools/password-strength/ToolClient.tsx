'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

interface AnalysisResult {
  score: number
  level: string
  color: string
  entropy: number
  crackTime: string
  details: {
    length: number
    hasLower: boolean
    hasUpper: boolean
    hasDigit: boolean
    hasSpecial: boolean
    hasSpace: boolean
    uniqueChars: number
    charTypes: number
    commonPatterns: string[]
    suggestions: string[]
  }
}

function analyzePassword(password: string): AnalysisResult {
  if (!password) {
    return {
      score: 0, level: '', color: '#e5e7eb', entropy: 0, crackTime: '',
      details: { length: 0, hasLower: false, hasUpper: false, hasDigit: false, hasSpecial: false, hasSpace: false, uniqueChars: 0, charTypes: 0, commonPatterns: [], suggestions: ['Enter a password to analyze'] }
    }
  }

  const details = {
    length: password.length,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasDigit: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9\s]/.test(password),
    hasSpace: /\s/.test(password),
    uniqueChars: new Set(password).size,
    charTypes: 0,
    commonPatterns: [] as string[],
    suggestions: [] as string[],
  }

  details.charTypes = [details.hasLower, details.hasUpper, details.hasDigit, details.hasSpecial].filter(Boolean).length

  // Common pattern detection
  const commonPasswords = ['password', '123456', '12345678', 'qwerty', 'abc123', 'password1', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'login', '111111', 'sunshine', 'princess', 'trustno1', 'iloveyou', 'shadow', 'superman']
  const lower = password.toLowerCase()
  if (commonPasswords.includes(lower)) details.commonPatterns.push('Common password')
  if (/^[0-9]+$/.test(password)) details.commonPatterns.push('Numbers only')
  if (/^[a-zA-Z]+$/.test(password)) details.commonPatterns.push('Letters only')
  if (/(.)\1{2,}/.test(password)) details.commonPatterns.push('Repeated chars')
  if (/^(012|123|234|345|456|567|678|789|abc|bcd|cde|def|efg)/.test(lower)) details.commonPatterns.push('Sequence')
  if (/^(qwerty|asdf|zxcv|qazwsx)/.test(lower)) details.commonPatterns.push('Keyboard pattern')
  if (/^(\d{1,2}\/){2}\d{4}$/.test(password)) details.commonPatterns.push('Date format')

  // Suggestions
  if (details.length < 12) details.suggestions.push('Use at least 12 characters')
  if (details.length < 16) details.suggestions.push('16+ characters is recommended')
  if (!details.hasUpper) details.suggestions.push('Add uppercase letters')
  if (!details.hasLower) details.suggestions.push('Add lowercase letters')
  if (!details.hasDigit) details.suggestions.push('Add numbers')
  if (!details.hasSpecial) details.suggestions.push('Add special characters (!@#$%...)')
  if (details.commonPatterns.length > 0) details.suggestions.push('Avoid common patterns')
  if (details.uniqueChars < details.length / 2) details.suggestions.push('Use more unique characters')
  if (details.suggestions.length === 0) details.suggestions.push('Strong password!')

  // Entropy calculation
  let charsetSize = 0
  if (details.hasLower) charsetSize += 26
  if (details.hasUpper) charsetSize += 26
  if (details.hasDigit) charsetSize += 10
  if (details.hasSpecial) charsetSize += 33
  if (details.hasSpace) charsetSize += 1
  if (charsetSize === 0) charsetSize = 1

  const entropy = Math.round(password.length * Math.log2(charsetSize))

  // Crack time (brute force at 10 billion guesses/sec)
  const combinations = Math.pow(charsetSize, password.length)
  const secondsToCrack = combinations / (10e9 * 3600) // hours
  let crackTime: string
  if (secondsToCrack < 1 / 3600) crackTime = 'Instant'
  else if (secondsToCrack < 1) crackTime = '< 1 hour'
  else if (secondsToCrack < 24) crackTime = `${Math.round(secondsToCrack)} hours`
  else if (secondsToCrack < 365) crackTime = `${Math.round(secondsToCrack / 24)} days`
  else if (secondsToCrack < 365 * 1000) crackTime = `${Math.round(secondsToCrack / 365)} years`
  else if (secondsToCrack < 365 * 1e6) crackTime = `${(secondsToCrack / 365).toExponential(1)} years`
  else if (secondsToCrack < 365 * 1e9) crackTime = `${(secondsToCrack / 365).toExponential(1)} years`
  else crackTime = 'Centuries+'

  // Score (0-100)
  let score = 0
  score += Math.min(30, details.length * 2.5) // Length up to 30
  score += details.charTypes * 12 // Char types up to 48
  score += Math.min(10, details.uniqueChars / 2) // Unique chars
  if (details.commonPatterns.length > 0) score -= details.commonPatterns.length * 15
  score = Math.max(0, Math.min(100, Math.round(score)))

  let level: string, color: string
  if (score < 20) { level = 'Very Weak'; color = '#ef4444' }
  else if (score < 40) { level = 'Weak'; color = '#f97316' }
  else if (score < 60) { level = 'Fair'; color = '#eab308' }
  else if (score < 80) { level = 'Strong'; color = '#22c55e' }
  else { level = 'Very Strong'; color = '#06b6d4' }

  return { score, level, color, entropy, crackTime, details }
}

export default function PasswordStrengthClient() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const result = useMemo(() => analyzePassword(password), [password])

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (result.score / 100) * circumference

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Password Strength Checker' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Password Strength Checker</h1>
      <p className="text-sm text-gray-500 mb-6">Test your password strength. All analysis runs 100% locally in your browser — nothing is sent to any server.</p>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Input */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter a password to test..."
              className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg text-lg font-mono focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Score Display */}
        {password && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-8">
              {/* Circular Score */}
              <div className="relative w-32 h-32 shrink-0">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle cx="60" cy="60" r="54" stroke={result.color} strokeWidth="8" fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: result.color }}>{result.score}</span>
                  <span className="text-[10px] text-gray-400">/ 100</span>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-2">
                <div className="text-lg font-semibold" style={{ color: result.color }}>{result.level}</div>
                <div className="text-sm text-gray-600">
                  <span className="text-gray-400">Entropy:</span> {result.entropy} bits
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-gray-400">Crack time:</span> {result.crackTime}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="text-gray-400">Length:</span> {result.details.length} chars
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Character Analysis */}
        {password && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Character Analysis</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Lowercase', active: result.details.hasLower },
                { label: 'Uppercase', active: result.details.hasUpper },
                { label: 'Numbers', active: result.details.hasDigit },
                { label: 'Symbols', active: result.details.hasSpecial },
              ].map(item => (
                <span key={item.label}
                  className={`px-3 py-1.5 text-xs rounded-lg border ${
                    item.active
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-400'
                  }`}>
                  {item.active ? '✓' : '○'} {item.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Warnings & Suggestions */}
        {password && result.details.commonPatterns.length > 0 && (
          <div className="bg-red-50 rounded-xl border border-red-200 p-5">
            <h3 className="text-sm font-semibold text-red-700 mb-2">Warnings</h3>
            <ul className="space-y-1">
              {result.details.commonPatterns.map((p, i) => (
                <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                  <span>⚠️</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {password && result.details.suggestions.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Suggestions</h3>
            <ul className="space-y-1">
              {result.details.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-primary-500">→</span> {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8">
        <RelatedTools current="password-strength" />
      </div>
    </div>
  )
}
