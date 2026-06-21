'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

interface DiffEntry {
  path: string
  type: 'added' | 'removed' | 'changed'
  leftValue?: unknown
  rightValue?: unknown
}

function deepDiff(left: unknown, right: unknown, path: string = ''): DiffEntry[] {
  const results: DiffEntry[] = []

  if (left === right) return results
  if (left === undefined) return [{ path, type: 'added', rightValue: right }]
  if (right === undefined) return [{ path, type: 'removed', leftValue: left }]

  if (typeof left !== typeof right) {
    return [{ path, type: 'changed', leftValue: left, rightValue: right }]
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const maxLen = Math.max(left.length, right.length)
    for (let i = 0; i < maxLen; i++) {
      const itemPath = `${path}[${i}]`
      if (i >= left.length) {
        results.push({ path: itemPath, type: 'added', rightValue: right[i] })
      } else if (i >= right.length) {
        results.push({ path: itemPath, type: 'removed', leftValue: left[i] })
      } else {
        results.push(...deepDiff(left[i], right[i], itemPath))
      }
    }
    return results
  }

  if (typeof left === 'object' && left !== null && typeof right === 'object' && right !== null) {
    const allKeys = new Set([...Object.keys(left as object), ...Object.keys(right as object)])
    for (const key of allKeys) {
      const l = (left as Record<string, unknown>)[key]
      const r = (right as Record<string, unknown>)[key]
      const keyPath = path ? `${path}.${key}` : key
      results.push(...deepDiff(l, r, keyPath))
    }
    return results
  }

  if (left !== right) {
    return [{ path, type: 'changed', leftValue: left, rightValue: right }]
  }

  return results
}

function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined'
  if (val === null) return 'null'
  if (typeof val === 'object') return JSON.stringify(val, null, 2)
  return String(val)
}

export default function JsonDiffClient() {
  const [leftJson, setLeftJson] = useState('')
  const [rightJson, setRightJson] = useState('')

  const { diffs, error, stats } = useMemo(() => {
    if (!leftJson.trim() && !rightJson.trim()) {
      return { diffs: [], error: null, stats: { added: 0, removed: 0, changed: 0 } }
    }

    let left: unknown, right: unknown
    try {
      left = leftJson.trim() ? JSON.parse(leftJson) : undefined
    } catch (e: any) {
      return { diffs: [], error: `Left JSON: ${e.message}`, stats: { added: 0, removed: 0, changed: 0 } }
    }
    try {
      right = rightJson.trim() ? JSON.parse(rightJson) : undefined
    } catch (e: any) {
      return { diffs: [], error: `Right JSON: ${e.message}`, stats: { added: 0, removed: 0, changed: 0 } }
    }

    const diffs = deepDiff(left, right)
    const stats = {
      added: diffs.filter(d => d.type === 'added').length,
      removed: diffs.filter(d => d.type === 'removed').length,
      changed: diffs.filter(d => d.type === 'changed').length,
    }
    return { diffs, error: null, stats }
  }, [leftJson, rightJson])

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'JSON Diff' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">JSON 对比工具 | JSON Diff Checker</h1>
      <p className="text-sm text-gray-500 mb-6">Compare two JSON objects and highlight structural differences. Deep nested comparison with path-based change tracking.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-gray-500">Original JSON (Left)</label>
            <button onClick={() => setLeftJson('')} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            value={leftJson}
            onChange={e => setLeftJson(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            rows={10}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-gray-500">Modified JSON (Right)</label>
            <button onClick={() => setRightJson('')} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
          </div>
          <textarea
            value={rightJson}
            onChange={e => setRightJson(e.target.value)}
            placeholder='{"name": "Jane", "age": 30, "email": "jane@example.com"}'
            rows={10}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <span className="text-sm text-red-700">⚠️ Parse Error: {error}</span>
        </div>
      )}

      {!error && (leftJson.trim() || rightJson.trim()) && (
        <>
          {/* Stats */}
          <div className="flex gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />+ {stats.added} added
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm">
              <span className="w-2 h-2 rounded-full bg-red-500" />- {stats.removed} removed
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />~ {stats.changed} changed
            </span>
            {diffs.length === 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                ✅ Identical
              </span>
            )}
          </div>

          {/* Diff Results */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Differences</h3>
            {diffs.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-2xl mb-2">✅</div>
                <p className="text-sm">No differences found — the two JSON objects are identical</p>
              </div>
            ) : (
              <div className="space-y-2">
                {diffs.map((diff, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg text-sm font-mono ${
                      diff.type === 'added' ? 'bg-green-50 border-l-4 border-green-400' :
                      diff.type === 'removed' ? 'bg-red-50 border-l-4 border-red-400' :
                      'bg-yellow-50 border-l-4 border-yellow-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        diff.type === 'added' ? 'bg-green-200 text-green-800' :
                        diff.type === 'removed' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : '~'}
                      </span>
                      <span className="text-gray-700 text-xs">{diff.path}</span>
                    </div>
                    <div className="ml-6 space-y-1">
                      {(diff.type === 'removed' || diff.type === 'changed') && (
                        <div className="text-red-600 text-xs">
                          <span className="text-gray-400">- </span>{formatValue(diff.leftValue)}
                        </div>
                      )}
                      {(diff.type === 'added' || diff.type === 'changed') && (
                        <div className="text-green-600 text-xs">
                          <span className="text-gray-400">+ </span>{formatValue(diff.rightValue)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <RelatedTools current="json-diff" />
    </div>
  )
}
