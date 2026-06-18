'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

type Mode = 'what-is' | 'percent-of' | 'increase' | 'decrease' | 'discount' | 'margin'

const MODES: { id: Mode; title: string; desc: string; formula: string }[] = [
  { id: 'what-is', title: 'X 占 Y 的百分比', desc: '已知 X 和 Y，求 X 是 Y 的百分之几', formula: 'X ÷ Y × 100%' },
  { id: 'percent-of', title: 'Y 的 P% 是多少', desc: '已知 Y 和百分比 P，求数值', formula: 'Y × P%' },
  { id: 'increase', title: '从 X 增加到 Y 涨了百分之几', desc: '增长百分比', formula: '(Y - X) ÷ X × 100%' },
  { id: 'decrease', title: '从 X 减少到 Y 降了百分之几', desc: '下降百分比', formula: '(X - Y) ÷ X × 100%' },
  { id: 'discount', title: '折扣计算', desc: '原价折扣后价格和优惠金额', formula: '原价 × (1 - 折扣率)' },
  { id: 'margin', title: '利润率计算', desc: '成本和售价的利润率', formula: '(售价 - 成本) ÷ 售价 × 100%' },
]

export default function PercentageCalculatorClient() {
  const [mode, setMode] = useState<Mode>('what-is')

  // what-is
  const [wiX, setWiX] = useState('25')
  const [wiY, setWiY] = useState('200')

  // percent-of
  const [poP, setPoP] = useState('15')
  const [poY, setPoY] = useState('300')

  // increase
  const [incX, setIncX] = useState('100')
  const [incY, setIncY] = useState('150')

  // decrease
  const [decX, setDecX] = useState('100')
  const [decY, setDecY] = useState('75')

  // discount
  const [disOrig, setDisOrig] = useState('299')
  const [disRate, setDisRate] = useState('20')

  // margin
  const [marCost, setMarCost] = useState('50')
  const [marPrice, setMarPrice] = useState('99')

  const result = useMemo(() => {
    const num = (s: string) => parseFloat(s) || 0
    switch (mode) {
      case 'what-is': {
        const x = num(wiX), y = num(wiY)
        if (y === 0) return { main: '除数不能为 0', secondary: '', formula: '' }
        return {
          main: `${((x / y) * 100).toFixed(2)}%`,
          secondary: `${x} 是 ${y} 的 ${((x / y) * 100).toFixed(2)}%`,
          formula: `${x} ÷ ${y} × 100% = ${((x / y) * 100).toFixed(2)}%`,
        }
      }
      case 'percent-of': {
        const p = num(poP), y = num(poY)
        return {
          main: `${(y * p / 100).toFixed(2)}`,
          secondary: `${y} 的 ${p}% = ${(y * p / 100).toFixed(2)}`,
          formula: `${y} × ${p}% = ${(y * p / 100).toFixed(2)}`,
        }
      }
      case 'increase': {
        const x = num(incX), y = num(incY)
        if (x === 0) return { main: '基数不能为 0', secondary: '', formula: '' }
        const pct = ((y - x) / x) * 100
        return {
          main: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
          secondary: `从 ${x} 增加到 ${y}，${pct >= 0 ? '增长' : '减少'} ${Math.abs(pct).toFixed(2)}%`,
          formula: `(${y} - ${x}) ÷ ${x} × 100% = ${pct.toFixed(2)}%`,
        }
      }
      case 'decrease': {
        const x = num(decX), y = num(decY)
        if (x === 0) return { main: '基数不能为 0', secondary: '', formula: '' }
        const pct = ((x - y) / x) * 100
        return {
          main: `${pct >= 0 ? '-' : '+'}${pct.toFixed(2)}%`,
          secondary: `从 ${x} 减少到 ${y}，${pct >= 0 ? '下降' : '增加'} ${Math.abs(pct).toFixed(2)}%`,
          formula: `(${x} - ${y}) ÷ ${x} × 100% = ${pct.toFixed(2)}%`,
        }
      }
      case 'discount': {
        const o = num(disOrig), r = num(disRate)
        const final = o * (1 - r / 100)
        const saved = o - final
        return {
          main: `¥${final.toFixed(2)}`,
          secondary: `原价 ¥${o.toFixed(2)} 享 ${r}% 优惠，立省 ¥${saved.toFixed(2)}`,
          formula: `${o} × (1 - ${r}%) = ${final.toFixed(2)}`,
        }
      }
      case 'margin': {
        const c = num(marCost), p = num(marPrice)
        if (p === 0) return { main: '售价不能为 0', secondary: '', formula: '' }
        const profit = p - c
        const marginPct = (profit / p) * 100
        const markupPct = c === 0 ? 0 : (profit / c) * 100
        return {
          main: `${marginPct.toFixed(2)}%`,
          secondary: `利润 ¥${profit.toFixed(2)} · 加价率 ${markupPct.toFixed(2)}% · 成本占 ${(100 - marginPct).toFixed(2)}%`,
          formula: `(${p} - ${c}) ÷ ${p} × 100% = ${marginPct.toFixed(2)}%`,
        }
      }
    }
  }, [mode, wiX, wiY, poP, poY, incX, incY, decX, decY, disOrig, disRate, marCost, marPrice])

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '百分比计算器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">百分比计算器 | Percentage Calculator</h1>
      <p className="text-sm text-gray-500 mb-6">6 种百分比计算模式：占比、增减、折扣、利润率。日常生活、工作、财务通用计算工具。</p>

      {/* 模式选择 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                mode === m.id ? 'bg-primary-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{m.title}</div>
              <div className={`text-xs mt-0.5 ${mode === m.id ? 'text-primary-100' : 'text-gray-500'}`}>
                {m.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：输入 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">{MODES.find(m => m.id === mode)?.title}</h3>
          <p className="text-xs text-gray-500 mb-4">{MODES.find(m => m.id === mode)?.desc}</p>

          {mode === 'what-is' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">X (分子)</label>
                <input value={wiX} onChange={e => setWiX(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y (分母)</label>
                <input value={wiY} onChange={e => setWiY(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {mode === 'percent-of' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">百分比 P (%)</label>
                <input value={poP} onChange={e => setPoP(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y (基数)</label>
                <input value={poY} onChange={e => setPoY(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {mode === 'increase' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">原值 X</label>
                <input value={incX} onChange={e => setIncX(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">新值 Y</label>
                <input value={incY} onChange={e => setIncY(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {mode === 'decrease' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">原值 X</label>
                <input value={decX} onChange={e => setDecX(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">新值 Y</label>
                <input value={decY} onChange={e => setDecY(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {mode === 'discount' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">原价</label>
                <input value={disOrig} onChange={e => setDisOrig(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">折扣率 (%)</label>
                <input value={disRate} onChange={e => setDisRate(e.target.value)} type="number" min="0" max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}

          {mode === 'margin' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">成本</label>
                <input value={marCost} onChange={e => setMarCost(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">售价</label>
                <input value={marPrice} onChange={e => setMarPrice(e.target.value)} type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
          )}
        </div>

        {/* 右侧：结果 */}
        <div className="bg-white rounded-xl border border-primary-200 p-5 sticky top-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">📊 计算结果</h3>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center mb-4">
            <div className="text-4xl font-bold text-primary-700 break-all">{result.main}</div>
            {result.secondary && (
              <div className="text-sm text-gray-600 mt-2">{result.secondary}</div>
            )}
          </div>
          {result.formula && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">计算公式</div>
              <code className="text-sm font-mono text-gray-800">{result.formula}</code>
            </div>
          )}
        </div>
      </div>

      <RelatedTools current="percentage-calculator" />
    </div>
  )
}
