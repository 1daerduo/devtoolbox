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
