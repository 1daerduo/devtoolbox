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
  'jwt-decoder': { name: 'JWT 解码器', desc: '解析 JWT Token 数据' },
  'xml-formatter': { name: 'XML 格式化', desc: 'XML 格式化与压缩' },
  'json-to-csv': { name: 'JSON ↔ CSV', desc: 'JSON 与 CSV 互转' },
  'my-ip': { name: 'IP 地址查询', desc: '查询公网 IP 与位置' },
  'yaml-formatter': { name: 'YAML 格式化', desc: 'YAML ↔ JSON 互转' },
  'sql-formatter': { name: 'SQL 格式化', desc: 'SQL 美化与压缩' },
  'diff-checker': { name: '文本差异对比', desc: '在线 Diff Checker' },
  // Round 2 (previously missing)
  'base64-image': { name: 'Base64 图片互转', desc: '图片与 Base64 编码互转' },
  'bcrypt-generator': { name: 'Bcrypt 生成验证', desc: 'Bcrypt 密码哈希生成与验证' },
  'cron-generator': { name: 'Cron 表达式生成器', desc: '可视化生成 Cron 定时表达式' },
  'html-formatter': { name: 'HTML 格式化', desc: 'HTML 代码美化与压缩' },
  'js-formatter': { name: 'JS 格式化', desc: 'JavaScript 美化与压缩' },
  'lorem-ipsum': { name: 'Lorem Ipsum 生成器', desc: '中英文占位文本生成' },
  'markdown-to-html': { name: 'Markdown 转 HTML', desc: 'Markdown 转换为 HTML 代码' },
  'number-base': { name: '进制转换器', desc: '多进制互转' },
  // Round 3 (new)
  'user-agent': { name: 'User Agent 解析', desc: '浏览器 UA 字符串解析' },
  'image-converter': { name: '图片格式转换', desc: 'JPG/PNG/WebP 格式互转' },
  'meta-tag': { name: 'Meta 标签生成器', desc: 'SEO/OG/Twitter 标签生成' },
  'email-validator': { name: '邮箱验证器', desc: '邮箱格式在线验证' },
  'dns-lookup': { name: 'DNS 查询工具', desc: 'A/AAAA/CNAME/MX 等记录查询' },
  'css-gradient': { name: 'CSS 渐变生成器', desc: '可视化 CSS 渐变生成' },
  'random-number': { name: '随机数生成器', desc: '随机整数/小数批量生成' },
  'svg-to-png': { name: 'SVG 转 PNG', desc: 'SVG 矢量图转 PNG 位图' },
  // Round 4 (new)
  'box-shadow-generator': { name: 'CSS Box Shadow 生成器', desc: '可视化 CSS box-shadow 构建' },
  'html-playground': { name: 'HTML/CSS/JS Playground', desc: '在线代码编辑器实时预览' },
  'color-palette': { name: '颜色调色板生成器', desc: '一键生成和谐配色方案' },
  'password-strength': { name: '密码强度检查器', desc: '检测密码安全性' },
  'http-status-codes': { name: 'HTTP 状态码参考', desc: 'HTTP 响应状态码查询' },
  'url-parser': { name: 'URL 解析器', desc: '解析 URL 各组件' },
  // Round 5 (new)
  'regex-tester': { name: '正则表达式测试器', desc: '在线 Regex 调试匹配替换' },
  'json-schema-validator': { name: 'JSON Schema 验证器', desc: 'Schema 定义校验 JSON 结构' },
  'image-resizer': { name: '图片尺寸调整', desc: '在线缩放裁剪图片尺寸' },
  'uuid-decoder': { name: 'UUID 解码器', desc: '解析 UUID 版本时间戳' },
  'csv-viewer': { name: 'CSV 表格查看器', desc: 'CSV/TSV 表格浏览搜索' },
  'emoji-picker': { name: 'Emoji 选择器', desc: '浏览搜索复制 Emoji' },
  'qr-scanner': { name: '二维码扫描器', desc: '图片扫码解码 QR Code' },
  'ascii-art-generator': { name: 'ASCII 艺术字生成器', desc: '文字转 ASCII 字符画' },
  // Favicon 工具套件 (Round 6)
  'favicon-generator': { name: 'Favicon 生成器', desc: '上传图片生成全尺寸 Favicon' },
  'favicon-text': { name: '文字 Favicon 生成器', desc: '文字生成字母 Favicon' },
  'favicon-emoji': { name: 'Emoji Favicon 生成器', desc: 'Emoji 生成透明 Favicon' },
  'favicon-extractor': { name: 'Favicon 提取器', desc: '提取网站 Favicon 图标' },
  'favicon-validator': { name: 'Favicon 校验器', desc: '检测 Favicon 配置完整性' },
  'web-manifest': { name: 'Web Manifest 生成器', desc: '生成 PWA manifest.json' },
  // Minifier 压缩工具 (Round 7)
  'json-minifier': { name: 'JSON 压缩', desc: '在线压缩 JSON 数据' },
  'css-minifier': { name: 'CSS 压缩', desc: '在线压缩 CSS 代码' },
  'js-minifier': { name: 'JS 压缩', desc: '在线压缩 JavaScript 代码' },
  'html-minifier': { name: 'HTML 压缩', desc: '在线压缩 HTML 代码' },
  // 网络开发工具 (Round 7)
  'curl-to-code': { name: 'cURL 转代码', desc: 'cURL 命令转 Python/JS/PHP/Go' },
}

const related: Record<string, string[]> = {
  // 格式化类
  'json-formatter': ['xml-formatter', 'hash-generator', 'color-converter', 'base64'],
  'xml-formatter': ['json-schema-validator', 'sql-formatter', 'yaml-formatter', 'html-formatter'],
  'sql-formatter': ['json-formatter', 'xml-formatter', 'json-to-csv', 'diff-checker'],
  'css-formatter': ['css-gradient', 'color-converter', 'html-playground', 'css-minifier'],
  'html-formatter': ['css-formatter', 'js-formatter', 'html-playground', 'meta-tag'],
  'js-formatter': ['regex-tester', 'html-formatter', 'css-formatter', 'sql-formatter'],
  // 编解码类
  'base64': ['url-encode', 'hash-generator', 'html-entity', 'base64-image'],
  'url-encode': ['html-entity', 'base64', 'url-parser', 'my-ip'],
  'html-entity': ['url-encode', 'base64', 'jwt-decoder', 'markdown-to-html'],
  'jwt-decoder': ['base64', 'hash-generator', 'json-schema-validator', 'url-encode'],
  'base64-image': ['base64', 'image-converter', 'image-compressor', 'qrcode'],
  'hash-generator': ['password-generator', 'bcrypt-generator', 'uuid-generator', 'base64'],
  'bcrypt-generator': ['password-strength', 'password-generator', 'base64', 'random-number'],
  // 生成器类
  'qrcode': ['url-encode', 'qr-scanner', 'image-compressor', 'color-converter'],
  'uuid-generator': ['password-strength', 'password-generator', 'timestamp', 'random-number'],
  'password-generator': ['hash-generator', 'bcrypt-generator', 'password-strength', 'random-number'],
  'cron-generator': ['timestamp', 'uuid-generator', 'uuid-decoder', 'number-base'],
  'lorem-ipsum': ['word-count', 'markdown-to-html', 'ascii-art-generator', 'emoji-picker'],
  'regex': ['diff-checker', 'word-count', 'regex-tester', 'html-entity'],
  'markdown-editor': ['word-count', 'markdown-to-html', 'ascii-art-generator', 'emoji-picker'],
  'random-number': ['password-generator', 'uuid-generator', 'number-base', 'password-strength'],
  // 转换类
  'timestamp': ['uuid-generator', 'cron-generator', 'uuid-decoder', 'number-base'],
  'color-converter': ['css-gradient', 'qrcode', 'color-palette', 'box-shadow-generator'],
  'json-to-csv': ['json-formatter', 'sql-formatter', 'csv-viewer', 'number-base'],
  'yaml-formatter': ['json-formatter', 'xml-formatter', 'json-to-csv', 'diff-checker'],
  'case-converter': ['text-dedup', 'word-count', 'markdown-editor', 'css-formatter'],
  'number-base': ['color-converter', 'uuid-decoder', 'timestamp', 'cron-generator'],
  'markdown-to-html': ['markdown-editor', 'html-formatter', 'ascii-art-generator', 'html-entity'],
  'css-gradient': ['color-converter', 'css-formatter', 'box-shadow-generator', 'image-converter'],
  // 文本工具
  'word-count': ['case-converter', 'markdown-editor', 'emoji-picker', 'csv-viewer'],
  'text-dedup': ['word-count', 'case-converter', 'emoji-picker', 'regex-tester'],
  'diff-checker': ['regex', 'word-count', 'regex-tester', 'case-converter'],
  // 查询工具
  'my-ip': ['dns-lookup', 'user-agent', 'url-parser', 'email-validator'],
  'user-agent': ['my-ip', 'dns-lookup', 'http-status-codes', 'web-manifest'],
  'email-validator': ['user-agent', 'my-ip', 'http-status-codes', 'password-generator'],
  // 网络工具
  'dns-lookup': ['my-ip', 'user-agent', 'http-status-codes', 'url-parser'],
  // SEO工具
  'meta-tag': ['html-formatter', 'user-agent', 'html-playground', 'web-manifest'],
  // 图像/其他
  'image-compressor': ['image-converter', 'image-resizer', 'qr-scanner', 'color-converter'],
  'image-converter': ['image-compressor', 'image-resizer', 'qr-scanner', 'svg-to-png'],
  'svg-to-png': ['image-converter', 'image-compressor', 'image-resizer', 'qr-scanner'],
  // Round 4 (new)
  'box-shadow-generator': ['css-gradient', 'color-converter', 'css-formatter', 'color-palette'],
  'html-playground': ['markdown-editor', 'html-formatter', 'js-formatter', 'css-formatter'],
  'color-palette': ['color-converter', 'css-gradient', 'box-shadow-generator', 'css-formatter'],
  'password-strength': ['password-generator', 'hash-generator', 'bcrypt-generator', 'random-number'],
  'http-status-codes': ['url-parser', 'dns-lookup', 'email-validator', 'curl-to-code'],
  'url-parser': ['url-encode', 'http-status-codes', 'my-ip', 'curl-to-code'],
  // Round 5 (new)
  'regex-tester': ['regex', 'diff-checker', 'word-count', 'html-entity'],
  'json-schema-validator': ['json-formatter', 'yaml-formatter', 'json-to-csv', 'csv-viewer'],
  'image-resizer': ['image-compressor', 'image-converter', 'svg-to-png', 'base64-image'],
  'uuid-decoder': ['uuid-generator', 'hash-generator', 'timestamp', 'cron-generator'],
  'csv-viewer': ['json-to-csv', 'json-formatter', 'sql-formatter', 'number-base'],
  'emoji-picker': ['text-dedup', 'markdown-editor', 'word-count', 'lorem-ipsum'],
  'qr-scanner': ['qrcode', 'base64-image', 'image-converter', 'image-compressor'],
  'ascii-art-generator': ['lorem-ipsum', 'markdown-to-html', 'text-dedup', 'markdown-editor'],
  // Favicon 工具套件 (Round 6)
  'favicon-generator': ['favicon-text', 'favicon-emoji', 'favicon-extractor', 'image-converter'],
  'favicon-text': ['favicon-generator', 'favicon-emoji', 'color-converter', 'css-gradient'],
  'favicon-emoji': ['favicon-generator', 'favicon-text', 'emoji-picker', 'image-converter'],
  'favicon-extractor': ['favicon-validator', 'favicon-generator', 'meta-tag', 'dns-lookup'],
  'favicon-validator': ['favicon-extractor', 'favicon-generator', 'meta-tag', 'web-manifest'],
  'web-manifest': ['favicon-generator', 'favicon-validator', 'meta-tag', 'color-converter'],
  // Minifier 压缩工具 (Round 7)
  'json-minifier': ['json-formatter', 'css-minifier', 'js-minifier', 'base64'],
  'css-minifier': ['css-formatter', 'json-minifier', 'js-minifier', 'html-minifier'],
  'js-minifier': ['js-formatter', 'json-minifier', 'css-minifier', 'html-minifier'],
  'html-minifier': ['html-formatter', 'css-minifier', 'js-minifier', 'meta-tag'],
  // 网络开发工具 (Round 7)
  'curl-to-code': ['http-status-codes', 'url-parser', 'jwt-decoder', 'json-formatter'],
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
