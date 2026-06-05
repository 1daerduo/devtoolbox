import type { Metadata } from 'next'
import QrcodeClient from './ToolClient'

export const metadata: Metadata = {
  title: '在线二维码生成器 - DevToolbox',
  description: '在线生成高清二维码，支持自定义颜色和尺寸，一键下载 PNG 图片。免费、无需注册，输入文本或网址即可生成。',
  keywords: ['二维码生成器', '在线二维码', 'QR Code生成', '二维码制作', 'QR code generator'],
  alternates: { canonical: '/tools/qrcode' },
}

export default function Page() {
  return <QrcodeClient />
}
