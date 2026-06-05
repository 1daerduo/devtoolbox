import type { Metadata } from 'next'
import HtmlEntityClient from './ToolClient'

export const metadata: Metadata = {
  title: 'HTML 实体编码解码工具 - 在线转义 &lt; &gt; &amp; - DevToolbox',
  description: '在线 HTML 实体编码解码工具，将 < > & " 等特殊字符与 HTML 实体 (&lt; &amp;) 互转，防止 XSS 攻击，前端开发必备。',
  keywords: 'HTML实体, HTML编码, HTML解码, html entities, 转义字符, HTML特殊字符, html encode, html decode, XSS防护',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/html-entity' },
}

export default function Page() {
  return <HtmlEntityClient />
}
