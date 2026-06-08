import type { Metadata } from 'next'
import ToolClient from './ToolClient'

export const metadata: Metadata = {
  title: 'ASCII 艺术字生成器 - 在线文字转 ASCII Art 工具 | MoreToolbox',
  description: '免费在线 ASCII 艺术字生成器，将文字转换为 ASCII 字符画。支持多种字体风格(Standard/Blocks/Simple 等)，可调节字符间距，一键复制到代码注释、README 文档或社交媒体。100% 浏览器本地处理，无需上传。 | Free online ASCII art text generator. Convert text to ASCII art characters with multiple FIGlet fonts. Copy to code comments, README or social media. 100% browser-side.',
  keywords: ['ASCII 艺术字', 'ASCII art generator', '文字转ASCII', '字符画生成', 'FIGlet', 'ASCII 字体', 'text to ascii art', '字符艺术'],
  alternates: {
    canonical: 'https://moretoolbox.com/tools/ascii-art-generator',
  },
}

export default function AsciiArtGeneratorPage() {
  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "首页", "item": "https://moretoolbox.com" }, { "@type": "ListItem", "position": 2, "name": "ASCII 艺术字生成器", "item": "https://moretoolbox.com/tools/ascii-art-generator" }] }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "ASCII 艺术字生成器 - MoreToolbox", "description": "将文字转换为 ASCII 字符画，支持多种 FIGlet 字体风格 | Free online ASCII art text generator", "url": "https://moretoolbox.com/tools/ascii-art-generator", "applicationCategory": "DeveloperApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" }, "inLanguage": "zh-CN" }),
          }}
        />
        <ToolClient />
      </>
    )
}
