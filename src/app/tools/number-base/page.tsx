import type { Metadata } from 'next'
import NumberBaseClient from './ToolClient'

export const metadata: Metadata = {
  title: '进制转换器 - 二进制八进制十进制十六进制互转 - DevToolbox',
  description: '免费在线进制转换工具，支持二进制、八进制、十进制、十六进制等多种进制互转，实时计算，开发者必备。',
  keywords: '进制转换, 二进制转十进制, 十六进制转十进制, 八进制, number base converter, 进制计算器, bin dec hex oct',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/number-base' },
}

export default function Page() {
  return <NumberBaseClient />
}
