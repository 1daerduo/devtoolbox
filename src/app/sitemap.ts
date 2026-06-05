import type { MetadataRoute } from 'next'

const BASE_URL = 'https://devtoolbox-61u.pages.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'json-formatter',
    'timestamp',
    'qrcode',
    'regex',
    'base64',
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
