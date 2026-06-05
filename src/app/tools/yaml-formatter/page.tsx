import type { Metadata } from 'next'
import YamlFormatterClient from './ToolClient'

export const metadata: Metadata = {
  title: 'YAML 在线格式化验证工具 - DevToolbox',
  description: '免费在线 YAML 格式化、压缩、验证工具。支持 Kubernetes/Docker Compose 配置验证，YAML↔JSON 互转。DevOps 必备工具。',
  keywords: 'YAML格式化, YAML formatter, YAML验证, YAML压缩, YAML转JSON, Kubernetes配置, Docker Compose',
  alternates: { canonical: 'https://devtoolbox-61u.pages.dev/tools/yaml-formatter' },
}

export default function Page() {
  return <YamlFormatterClient />
}
