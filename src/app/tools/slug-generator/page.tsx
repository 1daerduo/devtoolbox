import type { Metadata } from 'next'
import SlugGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'Slug 生成器 | URL Slug Generator Online - MoreToolbox',
  description: '免费在线 Slug 生成器，将中文、英文标题一键转为 SEO 友好的 URL Slug。支持自定义分隔符、大小写、最大长度，自动移除特殊字符。博客、CMS、电商平台 URL 优化必备。 | Free online URL slug generator. Convert titles to SEO-friendly slugs with custom separator, case, and max length. Perfect for blogs, CMS, and e-commerce.',
  keywords: ['Slug生成器', 'URL Slug generator', 'SEO Slug', 'URL别名', '友好的URL', 'slugify', 'URL slug online', '中文转Slug'],
  alternates: { canonical: 'https://moretoolbox.com/tools/slug-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "Slug 生成器", "item": "https://moretoolbox.com/tools/slug-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Slug 生成器 - MoreToolbox", "description": "将标题转换为 SEO 友好的 URL Slug | Convert titles to SEO-friendly URL slugs", "url": "https://moretoolbox.com/tools/slug-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <SlugGeneratorClient />
      </>
    )
}
