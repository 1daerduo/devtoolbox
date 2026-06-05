import Link from 'next/link'

const tools = [
  {
    name: 'JSON 格式化',
    desc: '格式化、压缩、验证 JSON 数据，支持语法高亮显示。',
    href: '/tools/json-formatter',
    icon: '{ }',
  },
  {
    name: '时间戳转换',
    desc: 'Unix 时间戳与日期时间互相转换，支持秒/毫秒。',
    href: '/tools/timestamp',
    icon: '🕐',
  },
  {
    name: '二维码生成器',
    desc: '输入文本或网址，实时生成可下载的二维码。',
    href: '/tools/qrcode',
    icon: '▣',
  },
  {
    name: '正则表达式测试',
    desc: '在线测试正则表达式，支持实时匹配高亮与解释。',
    href: '/tools/regex',
    icon: '.*',
  },
  {
    name: 'Base64 编解码',
    desc: '文本与 Base64 互相编码/解码，支持 UTF-8。',
    href: '/tools/base64',
    icon: 'B64',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16 bg-gradient-to-b from-primary-50 to-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          在线开发者工具集合
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          免费、快速、无需注册。JSON 格式化、时间戳转换、二维码生成……
          常用开发工具，一站式解决。
        </p>
        <Link
          href="/tools/json-formatter"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 no-underline"
        >
          开始使用 →
        </Link>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
          所有工具
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="tool-card block bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 no-underline"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ads placeholder */}
      <section className="py-8 text-center">
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg p-6 text-gray-400 text-sm border-2 border-dashed border-gray-300">
          [ Google AdSense 广告位 - 网站流量达标后申请接入 ]
        </div>
      </section>
    </div>
  )
}
