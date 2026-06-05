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
  {
    name: 'URL 编码解码',
    desc: 'URL 编码与解码，将特殊字符转为 %XX 格式。',
    href: '/tools/url-encode',
    icon: '🔗',
  },
  {
    name: '字数统计',
    desc: '实时统计中文字符、英文单词、段落数、句子数。',
    href: '/tools/word-count',
    icon: '📝',
  },
  {
    name: '哈希生成器',
    desc: 'MD5、SHA-1、SHA-256、SHA-512 哈希值生成。',
    href: '/tools/hash-generator',
    icon: '#️⃣',
  },
  {
    name: '颜色转换',
    desc: 'HEX、RGB、HSL 三种颜色格式互相转换。',
    href: '/tools/color-converter',
    icon: '🎨',
  },
  {
    name: 'UUID 生成器',
    desc: '生成 UUID v4/v7，支持批量生成一键复制。',
    href: '/tools/uuid-generator',
    icon: '🆔',
  },
  {
    name: '密码生成器',
    desc: '生成安全随机密码，支持自定义长度与字符类型。',
    href: '/tools/password-generator',
    icon: '🔐',
  },
  {
    name: 'HTML 实体编解码',
    desc: 'HTML 特殊字符与实体互相转换，防 XSS。',
    href: '/tools/html-entity',
    icon: '🔣',
  },
  {
    name: '文本去重排序',
    desc: '按行去重、排序、反转、去空行。',
    href: '/tools/text-dedup',
    icon: '📋',
  },
  {
    name: '大小写转换',
    desc: '大写/小写/驼峰/蛇形等 9 种格式互转。',
    href: '/tools/case-converter',
    icon: 'Aa',
  },
  {
    name: '图片压缩',
    desc: '在线压缩 PNG/JPG/WebP，调节质量，实时预览。',
    href: '/tools/image-compressor',
    icon: '🖼️',
  },
  {
    name: 'Markdown 编辑器',
    desc: '实时预览 Markdown，导出 HTML 或 .md 文件。',
    href: '/tools/markdown-editor',
    icon: '📄',
  },
  {
    name: 'CSS 格式化',
    desc: 'CSS 美化与压缩，一键复制输出结果。',
    href: '/tools/css-formatter',
    icon: '🎨',
  },
  {
    name: 'JWT 解码器',
    desc: '在线解析 JWT Token，查看 Header/Payload/Signature。',
    href: '/tools/jwt-decoder',
    icon: '🔑',
  },
  {
    name: 'XML 格式化',
    desc: 'XML 格式化与压缩，支持自定义缩进。',
    href: '/tools/xml-formatter',
    icon: '<>',
  },
  {
    name: 'JSON ↔ CSV 转换',
    desc: 'JSON 与 CSV 格式互转，支持自定义分隔符。',
    href: '/tools/json-to-csv',
    icon: '⇄',
  },
  {
    name: 'IP 地址查询',
    desc: '查询公网 IP、地理位置、运营商和浏览器信息。',
    href: '/tools/my-ip',
    icon: '🌐',
  },
  {
    name: 'YAML 格式化',
    desc: 'YAML ↔ JSON 互转与格式验证，DevOps 必备。',
    href: '/tools/yaml-formatter',
    icon: 'Y↔J',
  },
  {
    name: 'SQL 格式化',
    desc: 'SQL 美化与压缩，支持多种数据库方言。',
    href: '/tools/sql-formatter',
    icon: '🛢️',
  },
  {
    name: '文本差异对比',
    desc: '在线 Diff Checker，可视化两个文本的行级差异。',
    href: '/tools/diff-checker',
    icon: '≠',
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
          免费、快速、无需注册。JSON 格式化、时间戳转换、二维码生成、URL编码、哈希计算、密码生成……
          24 款开发工具，一站式解决。
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
