import type { Metadata } from 'next'
import EmailValidatorClient from './ToolClient'

export const metadata: Metadata = {
  title: '邮箱地址在线验证器 - DevToolbox',
  description: '在线验证邮箱地址格式，检测常见拼写错误、域名有效性，支持批量邮箱验证，数据本地处理保护隐私。',
  keywords: ['邮箱验证', 'Email验证', '邮箱格式检查', '邮箱校验', 'email validator', '邮件地址验证'],
  alternates: { canonical: '/tools/email-validator' },
}

export default function Page() {
  return <EmailValidatorClient />
}
