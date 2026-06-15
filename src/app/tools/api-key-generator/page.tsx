import type { Metadata } from 'next'
import ApiKeyGeneratorClient from './ToolClient'

export const metadata: Metadata = {
  title: 'API Key 生成器 | API Key Generator Online - MoreToolbox',
  description: '免费在线 API Key 生成器，支持自定义长度、前缀、字符集，一键生成随机 API 密钥、Access Token、Secret Key。适用于开发测试环境，数据纯浏览器本地处理。 | Free online API key generator. Custom length, prefix, character set. Generate random API keys, access tokens, secret keys for development.',
  keywords: ['API Key生成器', 'API Key generator', '密钥生成', 'Access Token生成', 'Secret Key', 'API密钥', '随机密钥', 'API key generator online'],
  alternates: { canonical: 'https://moretoolbox.com/tools/api-key-generator' },
}

export default function Page() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "API Key 生成器", "item": "https://moretoolbox.com/tools/api-key-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "API Key 生成器 - MoreToolbox", "description": "生成随机 API 密钥和访问令牌 | Generate random API keys and access tokens", "url": "https://moretoolbox.com/tools/api-key-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ApiKeyGeneratorClient />
      </>
    )
}
