import type { Metadata } from 'next'
import RandomNumberClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线随机数生成器 - DevToolbox',
  description: '在线生成指定范围内的随机整数或小数，支持排除特定数字、批量生成、不重复模式，可用于抽奖、测试数据、游戏等场景。',
  keywords: ['随机数生成', '随机数生成器', '随机整数', '随机小数', '抽奖', '随机选择', 'random number'],
  alternates: { canonical: '/tools/random-number' },
}

export default function Page() {
  return <RandomNumberClient />
}
