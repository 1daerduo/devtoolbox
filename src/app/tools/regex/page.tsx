import type { Metadata } from 'next'
import RegexClient from './ToolClient'

export const metadata: Metadata = {
  title: '正则表达式在线测试工具 - DevToolbox',
  description: '在线测试正则表达式，支持多种标志位、实时匹配高亮，内置常用正则速查。免费，无需注册，开发者调试必备。',
  keywords: ['正则表达式', '正则测试', 'Regex测试', '在线正则', 'regex tester', '正则匹配'],
  alternates: { canonical: '/tools/regex' },
}

export default function Page() {
  return <RegexClient />
}
