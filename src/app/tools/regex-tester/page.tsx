import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '正则表达式测试器 - 在线 Regex 调试工具 | MoreToolbox',
  description: '免费在线正则表达式测试工具，支持 JavaScript 正则语法，实时匹配高亮、捕获组查看、替换功能、常用正则库。100% 浏览器本地处理。',
  keywords: ['正则表达式测试器', 'regex tester', '在线正则工具', 'regex101', '正则调试', '正则匹配', '正则替换', '捕获组', 'online regex tool', 'regular expression tester'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/regex-tester',
  },
}

export default function RegexTesterPage() {
  return <ToolClient />
}
