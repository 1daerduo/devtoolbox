'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'
import AdBanner from '@/components/AdBanner'

interface ParsedCurl {
  method: string
  url: string
  headers: Record<string, string>
  data: string
  rawData: string
  form: Record<string, string>
  auth: string | null
  insecure: boolean
  compressed: boolean
}

function parseCurl(cmd: string): ParsedCurl {
  const result: ParsedCurl = {
    method: 'GET',
    url: '',
    headers: {},
    data: '',
    rawData: '',
    form: {},
    auth: null,
    insecure: false,
    compressed: false,
  }

  // Normalize: remove line continuations
  let normalized = cmd.replace(/\\\s*\n/g, ' ').replace(/\s+/g, ' ').trim()

  // Remove leading 'curl'
  if (normalized.startsWith('curl')) {
    normalized = normalized.substring(4).trim()
  }

  // Tokenize respecting quotes
  const tokens: string[] = []
  let current = ''
  let inSingle = false
  let inDouble = false
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i]
    if (ch === "'" && !inDouble) { inSingle = !inSingle; continue }
    if (ch === '"' && !inSingle) { inDouble = !inDouble; continue }
    if (ch === ' ' && !inSingle && !inDouble) {
      if (current) { tokens.push(current); current = '' }
      continue
    }
    current += ch
  }
  if (current) tokens.push(current)

  let i = 0
  while (i < tokens.length) {
    const token = tokens[i]
    switch (token) {
      case '-X':
      case '--request':
        i++
        if (i < tokens.length) result.method = tokens[i].toUpperCase()
        break
      case '-H':
      case '--header':
        i++
        if (i < tokens.length) {
          const colonIdx = tokens[i].indexOf(':')
          if (colonIdx > 0) {
            const key = tokens[i].substring(0, colonIdx).trim()
            const val = tokens[i].substring(colonIdx + 1).trim()
            result.headers[key] = val
          }
        }
        break
      case '-d':
      case '--data':
      case '--data-raw':
      case '--data-binary':
        i++
        if (i < tokens.length) {
          result.data = tokens[i]
          if (result.method === 'GET') result.method = 'POST'
        }
        break
      case '-F':
      case '--form':
        i++
        if (i < tokens.length) {
          const eqIdx = tokens[i].indexOf('=')
          if (eqIdx > 0) {
            result.form[tokens[i].substring(0, eqIdx)] = tokens[i].substring(eqIdx + 1)
          }
          if (result.method === 'GET') result.method = 'POST'
        }
        break
      case '-u':
      case '--user':
        i++
        if (i < tokens.length) result.auth = tokens[i]
        break
      case '-k':
      case '--insecure':
        result.insecure = true
        break
      case '--compressed':
        result.compressed = true
        break
      default:
        // URL token (doesn't start with -)
        if (!token.startsWith('-') && !result.url) {
          result.url = token
        }
        break
    }
    i++
  }

  // If data looks like JSON, set content-type
  if (result.data && !result.headers['Content-Type'] && !result.headers['content-type']) {
    try {
      JSON.parse(result.data)
      result.headers['Content-Type'] = 'application/json'
    } catch {}
  }

  // If form data, set content-type
  if (Object.keys(result.form).length > 0 && !result.headers['Content-Type'] && !result.headers['content-type']) {
    result.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  return result
}

function toPython(curl: ParsedCurl): string {
  const lines: string[] = ['import requests', '']
  const hasHeaders = Object.keys(curl.headers).length > 0
  const hasData = curl.data || Object.keys(curl.form).length > 0
  const hasAuth = curl.auth

  lines.push(`url = "${curl.url}"`)
  if (hasHeaders) {
    lines.push('')
    lines.push('headers = {')
    Object.entries(curl.headers).forEach(([k, v], idx, arr) => {
      lines.push(`    "${k}": "${v}"${idx < arr.length - 1 ? ',' : ''}`)
    })
    lines.push('}')
  }
  if (hasData) {
    lines.push('')
    if (curl.data) {
      lines.push(`data = ${curl.data}`)
    } else if (Object.keys(curl.form).length > 0) {
      lines.push('data = {')
      Object.entries(curl.form).forEach(([k, v], idx, arr) => {
        lines.push(`    "${k}": "${v}"${idx < arr.length - 1 ? ',' : ''}`)
      })
      lines.push('}')
    }
  }

  lines.push('')
  const params: string[] = []
  params.push(`"${curl.method}", url`)
  if (hasHeaders) params.push('headers=headers')
  if (hasData) params.push('data=data')
  if (hasAuth) {
    const [user, pass] = (curl.auth || '').split(':')
    params.push(`auth=("${user}", "${pass || ''}")`)
  }
  lines.push(`response = requests.request(${params.join(', ')})`)
  lines.push('')
  lines.push('print(response.status_code)')
  lines.push('print(response.text)')

  return lines.join('\n')
}

function toJavaScript(curl: ParsedCurl): string {
  const lines: string[] = []
  const hasHeaders = Object.keys(curl.headers).length > 0
  const hasData = curl.data || Object.keys(curl.form).length > 0

  const fetchOptions: string[] = []
  fetchOptions.push(`  method: "${curl.method}"`)
  if (hasHeaders) {
    fetchOptions.push('  headers: {')
    Object.entries(curl.headers).forEach(([k, v], idx, arr) => {
      fetchOptions.push(`    "${k}": "${v}"${idx < arr.length - 1 ? ',' : ''}`)
    })
    fetchOptions.push('  }')
  }
  if (hasData) {
    let bodyStr: string
    if (curl.data) {
      bodyStr = curl.data
    } else {
      const params = Object.entries(curl.form).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
      bodyStr = `"${params}"`
    }
    fetchOptions.push(`  body: ${bodyStr}`)
  }

  lines.push(`fetch("${curl.url}", {`)
  lines.push(fetchOptions.join(',\n'))
  lines.push('})')
  lines.push('  .then(response => response.json())')
  lines.push('  .then(data => console.log(data))')
  lines.push('  .catch(error => console.error("Error:", error));')

  return lines.join('\n')
}

function toPhp(curl: ParsedCurl): string {
  const lines: string[] = ['<?php', '']
  const hasHeaders = Object.keys(curl.headers).length > 0
  const hasData = curl.data || Object.keys(curl.form).length > 0
  const hasAuth = curl.auth

  lines.push('$url = "' + curl.url + '";')
  lines.push('')
  lines.push('$ch = curl_init($url);')
  lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);')
  lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${curl.method}");`)

  if (hasHeaders) {
    const headerArr = Object.entries(curl.headers).map(([k, v]) => `"${k}: ${v}"`).join(', ')
    lines.push(`curl_setopt($ch, CURLOPT_HTTPHEADER, [${headerArr}]);`)
  }
  if (hasData) {
    if (curl.data) {
      lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, ${curl.data});`)
    } else {
      const params = Object.entries(curl.form).map(([k, v]) => `"${k}" => "${v}"`).join(', ')
      lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, [${params}]);`)
    }
  }
  if (hasAuth) {
    lines.push(`curl_setopt($ch, CURLOPT_USERPWD, "${curl.auth}");`)
  }
  if (curl.insecure) {
    lines.push('curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);')
  }

  lines.push('')
  lines.push('$response = curl_exec($ch);')
  lines.push('curl_close($ch);')
  lines.push('')
  lines.push('echo $response;')

  return lines.join('\n')
}

function toGo(curl: ParsedCurl): string {
  const lines: string[] = ['package main', '', 'import (']
  const imports = ['"fmt"', '"io"', '"net/http"', '"strings"']
  const hasData = curl.data || Object.keys(curl.form).length > 0
  if (hasData) imports.push('"bytes"')
  lines.push('  ' + imports.join('\n  '))
  lines.push(')', '')

  lines.push('func main() {')
  if (hasData) {
    let bodyStr: string
    if (curl.data) {
      bodyStr = curl.data
    } else {
      const params = Object.entries(curl.form).map(([k, v]) => `${k}=${v}`).join('&')
      bodyStr = `"${params}"`
    }
    lines.push(`  body := strings.NewReader(${bodyStr})`)
    lines.push(`  req, err := http.NewRequest("${curl.method}", "${curl.url}", body)`)
  } else {
    lines.push(`  req, err := http.NewRequest("${curl.method}", "${curl.url}", nil)`)
  }
  lines.push('  if err != nil {')
  lines.push('    panic(err)')
  lines.push('  }')
  lines.push('')

  Object.entries(curl.headers).forEach(([k, v]) => {
    lines.push(`  req.Header.Set("${k}", "${v}")`)
  })

  if (curl.auth) {
    const [user, pass] = (curl.auth || '').split(':')
    lines.push(`  req.SetBasicAuth("${user}", "${pass || ''}")`)
  }

  lines.push('')
  lines.push('  resp, err := http.DefaultClient.Do(req)')
  lines.push('  if err != nil {')
  lines.push('    panic(err)')
  lines.push('  }')
  lines.push('  defer resp.Body.Close()')
  lines.push('')
  lines.push('  bodyBytes, _ := io.ReadAll(resp.Body)')
  lines.push('  fmt.Println(resp.StatusCode)')
  lines.push('  fmt.Println(string(bodyBytes))')
  lines.push('}')

  return lines.join('\n')
}

type Language = 'python' | 'javascript' | 'php' | 'go'

const langLabels: Record<Language, string> = {
  python: 'Python (requests)',
  javascript: 'JavaScript (fetch)',
  php: 'PHP (cURL)',
  go: 'Go (net/http)',
}

export default function CurlToCodeClient() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [language, setLanguage] = useState<Language>('python')

  const convert = useCallback(() => {
    try {
      if (!input.trim()) {
        setError('请输入 cURL 命令')
        setOutput('')
        return
      }
      const parsed = parseCurl(input)
      if (!parsed.url) {
        setError('无法解析 cURL 命令中的 URL，请检查格式')
        setOutput('')
        return
      }
      let code = ''
      switch (language) {
        case 'python': code = toPython(parsed); break
        case 'javascript': code = toJavaScript(parsed); break
        case 'php': code = toPhp(parsed); break
        case 'go': code = toGo(parsed); break
      }
      setOutput(code)
      setError('')
    } catch (e: any) {
      setError('解析失败: ' + e.message)
      setOutput('')
    }
  }, [input, language])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'cURL 转代码' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">cURL 转代码 / cURL to Code</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">将 cURL 命令一键转换为 Python、JavaScript、PHP、Go 代码，支持自动解析请求头和请求体。</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">输入 cURL 命令</label>
            <button onClick={() => { setInput(''); setOutput(''); setError('') }}
              className="text-sm text-gray-500 hover:text-red-500">
              清空
            </button>
          </div>
          <textarea
            className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-gray-900 dark:text-gray-100"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`curl 'https://api.example.com/data' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"test","value":42}'`}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">生成代码</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && (
            <div className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border border-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-sm text-red-600 dark:text-red-400 overflow-auto">
              {error}
            </div>
          )}
          {!error && (
            <pre className="w-full min-h-[180px] sm:min-h-[250px] lg:h-80 border rounded-lg p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100">
              {output || '生成的代码将显示在这里...'}
            </pre>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          目标语言：
          <select value={language} onChange={e => setLanguage(e.target.value as Language)}
            className="ml-1 border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            {Object.entries(langLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </label>
        <button onClick={convert}
          className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 text-sm font-medium">
          转换代码
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">如何使用 cURL 转代码工具？</h2>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>从浏览器开发者工具（F12 → Network → 右键请求 → Copy as cURL）复制 cURL 命令，粘贴到左侧输入框，选择目标语言即可生成代码。</p>
        <p><strong>支持的功能：</strong>GET/POST/PUT/DELETE 请求、自定义请求头、JSON/表单数据、Basic 认证、--insecure 选项。</p>
        <p><strong>支持的语言：</strong>Python (requests)、JavaScript (fetch API)、PHP (cURL)、Go (net/http)。</p>
      </div>

      <AdBanner dataAdFormat="horizontal" />
      <RelatedTools current="curl-to-code" />
    </div>
  )
}
