import type { Metadata } from 'next'
import UserAgentClient from './ToolClient'

export const metadata: Metadata = {
  title: 'User Agent 在线解析器 - DevToolbox',
  description: '在线解析浏览器 User Agent 字符串，识别浏览器类型、版本、操作系统、设备类型、渲染引擎等详细信息。',
  keywords: ['User Agent解析', 'UA解析', '浏览器识别', 'UserAgent', '浏览器检测', '设备检测'],
  alternates: { canonical: '/tools/user-agent' },
}

export default function Page() {
  return <UserAgentClient />
}
