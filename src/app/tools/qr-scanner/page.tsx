import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: '二维码扫描器 - 在线 QR Code 解码识别工具 | MoreToolbox',
  description: '免费在线二维码扫描器，上传图片或粘贴截图即可识别 QR Code 内容。支持 URL/文本/名片/WiFi 等多种格式解码。纯浏览器端处理，图片不上传。',
  keywords: ['二维码扫描器', 'QR 扫描', '在线二维码解码', 'QR scanner', '二维码识别', '扫码工具', 'QR code reader online', '图片扫码'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/qr-scanner',
  },
}

export default function QrScannerPage() {
  return <ToolClient />
}
