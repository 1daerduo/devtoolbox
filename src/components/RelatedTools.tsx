import Link from 'next/link'

const toolMap: Record<string, { name: string; desc: string }> = {
  'json-formatter': { name: 'JSON 格式化', desc: '格式化、压缩、验证 JSON 数据' },
  timestamp: { name: '时间戳转换', desc: 'Unix 时间戳与日期互转' },
  qrcode: { name: '二维码生成器', desc: '在线生成可下载的二维码' },
  regex: { name: '正则表达式测试', desc: '在线正则匹配与高亮' },
  base64: { name: 'Base64 编解码', desc: '文本与 Base64 互转' },
  'url-encode': { name: 'URL 编码解码', desc: 'URL 编码与解码互转' },
  'word-count': { name: '字数统计', desc: '字符数、单词数、段落数统计' },
  'hash-generator': { name: '哈希生成器', desc: 'MD5/SHA 哈希值生成' },
  'color-converter': { name: '颜色转换', desc: 'HEX/RGB/HSL 格式互转' },
  'uuid-generator': { name: 'UUID 生成器', desc: 'UUID v4/v7 批量生成' },
  'password-generator': { name: '密码生成器', desc: '安全随机密码生成' },
  'html-entity': { name: 'HTML 实体编解码', desc: 'HTML 特殊字符与实体互转' },
  'text-dedup': { name: '文本去重排序', desc: '按行去重、排序、反转' },
  'case-converter': { name: '大小写转换', desc: '大写/小写/驼峰等9种格式' },
  'image-compressor': { name: '图片压缩', desc: '在线压缩 PNG/JPG/WebP' },
  'markdown-editor': { name: 'Markdown 编辑器', desc: '实时预览 Markdown 编辑器' },
  'css-formatter': { name: 'CSS 格式化', desc: 'CSS 美化与压缩' },
}

// Related tools for each tool
const related: Record<string, string[]> = {
  'json-formatter': ['base64', 'hash-generator', 'color-converter'],
  timestamp: ['uuid-generator', 'password-generator', 'base64'],
  qrcode: ['url-encode', 'color-converter', 'image-compressor'],
  regex: ['word-count', 'html-entity', 'json-formatter'],
  base64: ['url-encode', 'hash-generator', 'html-entity'],
  'url-encode': ['html-entity', 'base64', 'json-formatter'],
  'word-count': ['case-converter', 'markdown-editor', 'text-dedup'],
  'hash-generator': ['password-generator', 'uuid-generator', 'base64'],
  'color-converter': ['qrcode', 'json-formatter', 'css-formatter'],
  'uuid-generator': ['hash-generator', 'password-generator', 'timestamp'],
  'password-generator': ['hash-generator', 'uuid-generator', 'base64'],
  'html-entity': ['url-encode', 'regex', 'markdown-editor'],
  'text-dedup': ['word-count', 'case-converter', 'regex'],
  'case-converter': ['text-dedup', 'word-count', 'css-formatter'],
  // Tier3
  'image-compressor': ['color-converter', 'qrcode', 'css-formatter'],
  'markdown-editor': ['word-count', 'html-entity', 'css-formatter'],
  'css-formatter': ['color-converter', 'case-converter', 'markdown-editor'],
}

interface Props {
  current: string
}

export default function RelatedTools({ current }: Props) {
  const items = related[current]
  if (!items) return null

  return (
    <section className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="text-base font-semibold text-gray-700 mb-4">🔧 你可能还需要</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((slug) => {
          const t = toolMap[slug]
          if (!t) return null
          return (
            <Link
              key={slug}
              href={`/tools/${slug}`}
              className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-300 hover:shadow-sm no-underline transition-all"
            >
              <div className="font-medium text-gray-900 text-sm mb-1">{t.name}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
