import type { MetadataRoute } from 'next'

const BASE_URL = 'https://devtoolbox-61u.pages.dev'

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
  ]

  const toolEntries: MetadataRoute.Sitemap = tools.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...toolEntries,
  ]
}
