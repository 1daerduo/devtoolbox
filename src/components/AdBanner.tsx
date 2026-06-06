'use client'

/**
 * Google AdSense 横幅广告组件
 *
 * 使用方式（激活后）：
 *   1. 在 .env 中设置 NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
 *   2. 在 Google AdSense 后台创建广告单元，获取 data-ad-slot
 *   3. 传入 dataAdSlot + dataAdFormat 属性
 *
 * 未配置时显示静默占位（不影响页面布局的预留空间）。
 */

interface AdBannerProps {
  /** AdSense 广告单元 ID（在 AdSense 后台创建广告单元后获得） */
  dataAdSlot?: string
  /** 广告格式：auto(自适应) | rectangle(矩形) | horizontal(横幅) | vertical(竖幅) */
  dataAdFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  /** 额外的 CSS class */
  className?: string
}

const formatStyles: Record<string, string> = {
  auto: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  horizontal: 'min-h-[90px]',
  vertical: 'min-h-[600px]',
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  className = '',
}: AdBannerProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  // 未配置 AdSense 发布商 ID — 显示精简占位（不影响 Core Web Vitals）
  if (!publisherId || publisherId === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return (
      <div className={`text-center py-4 ${className}`}>
        <div
          className="mx-auto max-w-4xl rounded-lg border border-dashed border-gray-200 bg-gray-50/50 px-4 py-3 text-xs text-gray-400"
          style={{ minHeight: dataAdFormat === 'rectangle' ? '250px' : '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span>广告位 — 设置 NEXT_PUBLIC_ADSENSE_PUBLISHER_ID 后激活</span>
        </div>
      </div>
    )
  }

  // AdSense 已配置 — 渲染真实广告单元
  const adClass = dataAdSlot ? '' : formatStyles[dataAdFormat] || 'min-h-[90px]'

  return (
    <div className={`text-center py-4 ${className}`}>
      <div className="mx-auto max-w-4xl">
        <ins
          className={`adsbygoogle block ${adClass}`}
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={dataAdSlot || ''}
          data-ad-format={dataAdFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
