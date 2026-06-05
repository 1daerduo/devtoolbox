import type { Metadata } from 'next'
import MyIpClient from './ToolClient'

export const metadata: Metadata = {
  title: 'IP 地址查询工具 - 我的IP是什么 - DevToolbox',
  description: '免费在线查询本机公网 IP 地址、地理位置、ISP 运营商信息。支持 IPv4/IPv6 地址检测，查询当前网络信息。',
  keywords: 'IP查询, 我的IP, what is my ip, IP地址查询, 公网IP, 本机IP, IPv4, IPv6',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/my-ip' },
}

export default function Page() {
  return <MyIpClient />
}
