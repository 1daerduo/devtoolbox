import type { MetadataRoute } from 'next'

const BASE_URL = 'https://moretoolbox.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'json-formatter',
    'timestamp',
    'qrcode',
    'regex',
    'base64',
    'url-encode',
    'word-count',
    'hash-generator',
    'color-converter',
    'uuid-generator',
    'password-generator',
    'html-entity',
    'text-dedup',
    'case-converter',
    'image-compressor',
    'markdown-editor',
    'css-formatter',
    'jwt-decoder',
    'xml-formatter',
    'json-to-csv',
    'my-ip',
    'yaml-formatter',
    'sql-formatter',
    'diff-checker',
    'base64-image',
    'bcrypt-generator',
    'cron-generator',
    'html-formatter',
    'js-formatter',
    'lorem-ipsum',
    'markdown-to-html',
    'number-base',
    'user-agent',
    'image-converter',
    'meta-tag',
    'email-validator',
    'dns-lookup',
    'css-gradient',
    'random-number',
    'svg-to-png',
    // Round 4 (new)
    'box-shadow-generator',
    'html-playground',
    'color-palette',
    'password-strength',
    'http-status-codes',
    'url-parser',
    // Round 5 (new)
    'regex-tester',
    'json-schema-validator',
    'image-resizer',
    'uuid-decoder',
    'csv-viewer',
    'emoji-picker',
    'qr-scanner',
    'ascii-art-generator',
    // Favicon 工具套件 (Round 6)
    'favicon-generator',
    'favicon-text',
    'favicon-emoji',
    'favicon-extractor',
    'favicon-validator',
    'web-manifest',
    // Minifier 压缩工具 + 网络开发 (Round 7)
    'json-minifier',
    'css-minifier',
    'js-minifier',
    'html-minifier',
    'curl-to-code',
    // 代码转换 + 生成器 + 参考 (Round 8)
    'json-to-typescript',
    'api-key-generator',
    'slug-generator',
    'chmod-calculator',
    'html-to-markdown',
    // SEO工具 + 转换工具 (Round 9)
    'schema-generator',
    'serp-simulator',
    'seo-checker',
    'percentage-calculator',
    'json-xml-converter',
    // Round 10 (new)
    'cidr-calculator',
    'credit-card-validator',
    'passphrase-generator',
    'json-diff',
    'border-radius-generator',
  ]

  const toolEntries: MetadataRoute.Sitemap = tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...toolEntries,
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]
}
