import type { Metadata } from 'next'
import DnsLookupClient from './ToolClient'

export const metadata: Metadata = {
  title: 'DNS 在线查询工具 - A/AAAA/CNAME/MX/NS/TXT 记录查询 - DevToolbox',
  description: '在线 DNS 记录查询工具，支持 A、AAAA、CNAME、MX、NS、TXT、SOA 等常见 DNS 记录查询，快速诊断域名解析问题。',
  keywords: ['DNS查询', 'DNS记录', 'A记录', 'CNAME', 'MX记录', '域名解析', 'NS记录', 'TXT记录', 'DNS lookup'],
  alternates: { canonical: '/tools/dns-lookup' },
}

export default function Page() {
  return <DnsLookupClient />
}
