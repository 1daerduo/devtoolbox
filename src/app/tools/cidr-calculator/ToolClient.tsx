'use client'

import { useState, useMemo } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import CopyButton from '@/components/CopyButton'
import RelatedTools from '@/components/RelatedTools'

function ipToNum(ip: string): number {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function numToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join('.')
}

function prefixToMask(prefix: number): number {
  return prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0
}

function numToBinary(num: number): string {
  return [
    ((num >>> 24) & 255).toString(2).padStart(8, '0'),
    ((num >>> 16) & 255).toString(2).padStart(8, '0'),
    ((num >>> 8) & 255).toString(2).padStart(8, '0'),
    (num & 255).toString(2).padStart(8, '0'),
  ].join('.')
}

const commonPrefixes = [8, 12, 16, 20, 24, 25, 26, 27, 28, 29, 30, 32]

export default function CidrCalculatorClient() {
  const [ipInput, setIpInput] = useState('192.168.1.0')
  const [prefix, setPrefix] = useState(24)

  const result = useMemo(() => {
    const ipNum = ipToNum(ipInput)
    const maskNum = prefixToMask(prefix)
    const networkNum = (ipNum & maskNum) >>> 0
    const broadcastNum = (networkNum | ~maskNum) >>> 0
    const firstHostNum = prefix === 32 ? networkNum : (networkNum + 1) >>> 0
    const lastHostNum = prefix === 32 ? networkNum : (broadcastNum - 1) >>> 0
    const totalAddresses = Math.pow(2, 32 - prefix)
    const usableHosts = prefix === 32 ? 1 : Math.max(0, totalAddresses - 2)
    const wildcardNum = (~maskNum) >>> 0

    return {
      networkAddress: numToIp(networkNum),
      broadcastAddress: numToIp(broadcastNum),
      subnetMask: numToIp(maskNum),
      wildcardMask: numToIp(wildcardNum),
      firstHost: numToIp(firstHostNum),
      lastHost: numToIp(lastHostNum),
      totalAddresses,
      usableHosts,
      networkBinary: numToBinary(networkNum),
      maskBinary: numToBinary(maskNum),
      cidr: `${numToIp(networkNum)}/${prefix}`,
    }
  }, [ipInput, prefix])

  const isValidIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(ipInput) &&
    ipInput.split('.').every(p => { const n = Number(p); return n >= 0 && n <= 255 })

  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'CIDR Calculator' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">CIDR 计算器 | CIDR Subnet Calculator</h1>
      <p className="text-sm text-gray-500 mb-6">Calculate network address, broadcast, subnet mask, and usable hosts from CIDR notation. IPv4 subnet planning made easy.</p>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">CIDR Input</h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 mb-1 block">IP Address</label>
            <input
              type="text"
              value={ipInput}
              onChange={e => setIpInput(e.target.value)}
              placeholder="e.g. 192.168.1.0"
              className={`w-full px-3 py-2 border rounded-lg text-sm font-mono ${isValidIp ? 'border-gray-300' : 'border-red-400'} focus:outline-none focus:border-primary-500`}
            />
          </div>
          <div className="w-32">
            <label className="text-xs text-gray-500 mb-1 block">Prefix (/{prefix})</label>
            <input
              type="number"
              min={0}
              max={32}
              value={prefix}
              onChange={e => setPrefix(Math.min(32, Math.max(0, Number(e.target.value))))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {commonPrefixes.map(p => (
              <button
                key={p}
                onClick={() => setPrefix(p)}
                className={`px-2 py-1 rounded text-xs font-mono ${prefix === p ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                /{p}
              </button>
            ))}
          </div>
        </div>
        {!isValidIp && ipInput && (
          <p className="text-xs text-red-500 mt-2">Please enter a valid IPv4 address (0-255 for each octet)</p>
        )}
      </div>

      {/* Results */}
      {isValidIp && (
        <>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Calculation Results</h3>
              <CopyButton text={`CIDR: ${result.cidr}\nNetwork: ${result.networkAddress}\nBroadcast: ${result.broadcastAddress}\nSubnet Mask: ${result.subnetMask}\nWildcard: ${result.wildcardMask}\nFirst Host: ${result.firstHost}\nLast Host: ${result.lastHost}\nTotal Addresses: ${result.totalAddresses.toLocaleString()}\nUsable Hosts: ${result.usableHosts.toLocaleString()}`} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'CIDR Notation', value: result.cidr, highlight: true },
                { label: 'Network Address', value: result.networkAddress },
                { label: 'Broadcast Address', value: result.broadcastAddress },
                { label: 'Subnet Mask', value: result.subnetMask },
                { label: 'Wildcard Mask', value: result.wildcardMask },
                { label: 'First Usable Host', value: result.firstHost },
                { label: 'Last Usable Host', value: result.lastHost },
                { label: 'Total Addresses', value: result.totalAddresses.toLocaleString() },
                { label: 'Usable Hosts', value: result.usableHosts.toLocaleString(), highlight: true },
              ].map(item => (
                <div key={item.label} className={`p-3 rounded-lg ${item.highlight ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'}`}>
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className={`text-sm font-mono font-semibold ${item.highlight ? 'text-primary-700' : 'text-gray-900'}`}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Binary Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Binary Breakdown</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex gap-2">
                <span className="w-36 text-gray-500 shrink-0">Network:</span>
                <span className="text-gray-900">{result.networkBinary}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-36 text-gray-500 shrink-0">Mask:</span>
                <span className="text-gray-900">{result.maskBinary}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="w-36 text-gray-500 shrink-0">Network bits:</span>
                <span>
                  <span className="text-primary-600">{'1'.repeat(prefix)}</span>
                  <span className="text-gray-300">{'0'.repeat(32 - prefix)}</span>
                  <span className="text-gray-400 ml-2">({prefix} / {32 - prefix})</span>
                </span>
              </div>
            </div>
          </div>

          {/* IP Range Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">IP Range</h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-gray-500">{result.networkAddress}</span>
              <div className="flex-1 h-3 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-px bg-red-500" style={{ left: '0%' }} />
                <div className="absolute right-0 top-0 h-full w-px bg-red-500" style={{ right: '0%' }} />
              </div>
              <span className="text-gray-500">{result.broadcastAddress}</span>
            </div>
            <div className="text-center text-xs text-gray-500 mt-1">
              {result.firstHost} — {result.lastHost} ({result.usableHosts.toLocaleString()} usable hosts)
            </div>
          </div>
        </>
      )}

      <RelatedTools current="cidr-calculator" />
    </div>
  )
}
