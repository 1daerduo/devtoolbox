/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // 开启静态导出，生成 out/ 目录
  reactStrictMode: true,
  images: {
    unoptimized: true,    // 静态导出必须关闭图片优化
  },
  trailingSlash: true,    // Cloudflare Pages 推荐加，防止路由 404
}

module.exports = nextConfig
