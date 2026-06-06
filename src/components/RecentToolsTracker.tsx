'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const STORAGE_KEY = 'recent-tools'
const MAX_RECENT = 6

/**
 * 记录最近访问的工具页到 sessionStorage。
 * 在 root layout 中渲染一次即可覆盖所有工具页。
 */
export default function RecentToolsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname?.startsWith('/tools/')) return

    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      const list: string[] = stored ? JSON.parse(stored) : []

      // 去重并置顶
      const updated = [pathname, ...list.filter(p => p !== pathname)]
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, MAX_RECENT)))
    } catch {}
  }, [pathname])

  return null
}
