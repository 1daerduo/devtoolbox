import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise - MoreToolbox 开发者工具站广告合作 | Advertising',
  description: 'MoreToolbox 开发者工具站广告合作，支持 AdSense、赞助工具位、品牌定制等多种合作方式。精准触达开发者用户群体。 | Advertise with MoreToolbox. AdSense, sponsored tools, brand partnerships. Reach developer audience.',
  alternates: {
    canonical: 'https://moretoolbox.com/advertise/',
  },
}

export default function AdvertisePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">广告合作</h1>
      <p className="text-gray-500 mb-8">
        精准触达中文开发者用户群体，多种合作方式灵活选择。
      </p>

      {/* 站点数据 */}
      <section className="bg-white rounded-xl border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">站点概况</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: '在线工具', value: '40+' },
            { label: '页面数', value: '50+' },
            { label: '语言', value: '中文' },
            { label: '用户群', value: '开发者' },
          ].map(item => (
            <div key={item.label}>
              <div className="text-2xl font-bold text-primary-600">{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 合作方式 */}
      <section className="bg-white rounded-xl border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">合作方式</h2>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">🏷️ 赞助工具位</h3>
            <p className="text-sm text-gray-600 mt-1">
              将您的品牌 Logo 和链接展示在工具卡片上，以「赞助」标记。适合 API 服务商、云平台、开发者工具品牌。
            </p>
            <ul className="mt-2 text-xs text-gray-500 space-y-1">
              <li>· 首页工具卡片区醒目展示</li>
              <li>· 按周/月计费，支持续费</li>
              <li>· 每次仅 1-2 个赞助位，不稀释品牌价值</li>
            </ul>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900">📢 横幅广告</h3>
            <p className="text-sm text-gray-600 mt-1">
              在工具页面顶部或中部展示横幅广告，支持图片/HTML5 素材。适合面向开发者的 SaaS 产品、技术社区推广。
            </p>
            <ul className="mt-2 text-xs text-gray-500 space-y-1">
              <li>· 首页顶部 / 工具页中部 两种位置可选</li>
              <li>· CPM 或固定周价计费</li>
              <li>· 支持地域定向（国内/海外）</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">🤝 内容合作</h3>
            <p className="text-sm text-gray-600 mt-1">
              在工具描述中嵌入品牌提及，或以「推荐工具」形式展示您的产品。
            </p>
            <ul className="mt-2 text-xs text-gray-500 space-y-1">
              <li>· 工具页底部「相关推荐」区</li>
              <li>· 原生内容形式，用户接受度高</li>
              <li>· 适合长期品牌曝光</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="bg-primary-50 rounded-xl border border-primary-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-primary-800 mb-3">📬 联系我们</h2>
        <p className="text-sm text-gray-700 mb-4">
          请通过以下方式联系，我们会在 24 小时内回复：
        </p>
        <div className="space-y-2 text-sm">
          <p>
            📧 邮箱：<a href="mailto:daerduodaerdong@163.com" className="text-primary-600 hover:text-primary-700">
              daerduodaerdong@163.com
            </a>
          </p>
        </div>
      </section>

      <div className="text-center">
        <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm no-underline">
          ← 返回工具首页
        </Link>
      </div>
    </div>
  )
}
