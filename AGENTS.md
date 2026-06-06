# DevToolbox — AI Agent 项目手册

> 每次自动化任务启动时，必须先阅读本文件以获取完整的项目上下文。

---

## 一、项目身份

| 属性 | 值 |
|------|-----|
| **名称** | DevToolbox（开发者工具箱） |
| **域名** | moretoolbox.com |
| **定位** | 免费在线开发者工具集合站，纯前端处理，数据不上传服务器 |
| **目标** | 通过 SEO 自然流量吸引开发者用户 → AdSense 广告变现 |
| **当前工具数** | 46 款 |
| **语言** | 中文（zh_CN） |
| **仓库地址** | 本地 tool-site/ 目录，git remote 已配置 |

---

## 二、技术栈

```
框架:       Next.js 14.2 (App Router)
渲染模式:   SSG — output: 'export'（全静态导出）
样式:       Tailwind CSS 3.4
语言:       TypeScript 5.x
包管理:     npm
部署平台:   Cloudflare Pages
特殊依赖:   marked (Markdown渲染), qrcode (二维码生成)
```

### 目录结构

```
tool-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← 全局布局、metadata、导航栏
│   │   ├── page.tsx            ← 首页（40个工具卡片 + 分类筛选）
│   │   ├── sitemap.ts          ← sitemap.xml 自动生成
│   │   ├── robots.ts           ← robots.txt
│   │   └── tools/
│   │       └── {slug}/
│   │           ├── page.tsx     ← 服务端组件（SEO metadata + JSON-LD）
│   │           └── ToolClient.tsx ← 客户端组件（'use client'，交互逻辑）
│   ├── components/
│   │   ├── Breadcrumb.tsx      ← 面包屑导航
│   │   ├── CopyButton.tsx      ← 一键复制按钮
│   │   ├── AdBanner.tsx        ← AdSense 广告横幅（可配置）
│   │   └── RelatedTools.tsx    ← 相关工具推荐（每个工具配4个推荐）
│   └── app/globals.css
├── public/
│   ├── googlec4c088f9cd8c8e14.html  ← Google Search Console 验证
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js              ← ⚠️ 仅有此一个 config，不可创建 .ts/.mjs 版本
├── .node-version               ← Node 22（Cloudflare Pages 自动识别）
└── postcss.config.js
```

---

## 三、技术约定（必须遵守）

### 每个工具页面的结构
```tsx
// page.tsx — 服务端组件
// - 导出 metadata（title, description, keywords, alternates.canonical）
// - 内嵌 JSON-LD WebApplication schema
// - 渲染 <Breadcrumb> + <ToolClient>（动态导入可选）
// - canonical URL: https://moretoolbox.com/tools/{slug}

// ToolClient.tsx — 客户端组件
// - 必须以 'use client' 开头
// - 包含 <Breadcrumb> + <RelatedTools slug="{slug}">
// - 交互逻辑全在客户端，不调任何后端 API
```

### 修改文件时必须同步更新
添加新工具后，以下 5 个文件必须同步修改：

| 文件 | 需要改什么 |
|------|-----------|
| `src/app/tools/{slug}/page.tsx` | 新工具页面（创建） |
| `src/app/tools/{slug}/ToolClient.tsx` | 新工具交互（创建） |
| `src/app/page.tsx` | 添加到 tools 数组 + 分类 |
| `src/app/sitemap.ts` | 添加到 sitemap 条目 |
| `src/components/RelatedTools.tsx` | 添加该工具的推荐映射 |
| `src/app/layout.tsx` | 更新 metadata 描述中的工具数量 + 导航栏链接（可选） |

### 构建命令
```bash
# Cloudflare 自动构建（远程）：仅构建，不含测试
npm ci && npm run build

# 本地完整流程：构建 + 测试
cd tool-site && npm run build:test    # 构建 + 静态检查 + 功能测试
cd tool-site && git add . && git commit -m "..." && git push
```

### 测试体系
```bash
npm test            # 静态检查（<1s，7 项：结构/HTML/GA4/AdSense/大小/robots/sitemap）
npm run test:func   # 功能测试（Playwright，~2min，39 工具浏览器验证）
npm run test:all    # 静态 + 功能
npm run build:test  # 构建 + 全部测试

npm run setup:test  # 仅首次：本地安装 Playwright + Chromium（~300MB，不会被推送）
```
> **重要**：Playwright 已从 package.json 剥离，Cloudflare `npm ci` 不会安装它。
> 本地首次运行前需执行 `npm run setup:test`。

---

## 四、完整工具清单（40 个）

### 格式化类（6）
| 工具 | slug | 关键词（SEO） |
|------|------|--------------|
| JSON 格式化 | json-formatter | JSON格式化,JSON美化,JSON校验 |
| XML 格式化 | xml-formatter | XML格式化,XML美化 |
| SQL 格式化 | sql-formatter | SQL格式化,SQL美化 |
| CSS 格式化 | css-formatter | CSS格式化,CSS压缩 |
| HTML 格式化 | html-formatter | HTML格式化,HTML美化 |
| JS 格式化 | js-formatter | JS格式化,JavaScript美化 |

### 编解码类（7）
| 工具 | slug | 关键词 |
|------|------|--------|
| Base64 编解码 | base64 | Base64编码,Base64解码 |
| URL 编解码 | url-encode | URL编码,URL解码 |
| HTML 实体编解码 | html-entity | HTML实体编码,HTML实体解码 |
| JWT 解码器 | jwt-decoder | JWT解码,JWT解析 |
| Base64 图片互转 | base64-image | Base64转图片,图片转Base64 |
| 哈希生成器 | hash-generator | MD5,SHA1,SHA256,SHA512 |
| Bcrypt 生成器 | bcrypt-generator | Bcrypt加密,Bcrypt校验 |

### 生成器类（8）
| 工具 | slug | 关键词 |
|------|------|--------|
| 二维码生成 | qrcode | 二维码生成,QR码 |
| UUID 生成 | uuid-generator | UUID生成,在线UUID |
| 密码生成器 | password-generator | 随机密码,强密码生成 |
| Cron 表达式 | cron-generator | Cron表达式,Cron生成 |
| Lorem Ipsum | lorem-ipsum | Lorem Ipsum,占位文本 |
| 正则测试 | regex | 正则表达式测试,Regex |
| Markdown 编辑 | markdown-editor | Markdown编辑器,在线Markdown |
| 随机数生成 | random-number | 随机数,随机整数 |

### 转换类（8）
| 工具 | slug | 关键词 |
|------|------|--------|
| 时间戳转换 | timestamp | Unix时间戳,时间戳转换 |
| 颜色转换 | color-converter | 颜色转换,HEX转RGB |
| JSON ↔ CSV | json-to-csv | JSON转CSV,CSV转JSON |
| YAML ↔ JSON | yaml-formatter | YAML转JSON,JSON转YAML |
| 大小写转换 | case-converter | 大小写转换,驼峰转换 |
| 进制转换 | number-base | 进制转换,二进制,十六进制 |
| Markdown 转 HTML | markdown-to-html | Markdown转HTML |
| CSS 渐变生成 | css-gradient | CSS渐变,线性渐变,径向渐变 |

### 文本工具（4）
| 工具 | slug | 关键词 |
|------|------|--------|
| 字数统计 | word-count | 字数统计,字符统计 |
| 文本去重 | text-dedup | 文本去重,行去重 |
| 文本差异对比 | diff-checker | 文本对比,Diff工具 |
| Markdown 编辑 | markdown-editor | 已列入生成器 |

### 查询工具（3）
| 工具 | slug | 关键词 |
|------|------|--------|
| IP 查询 | my-ip | IP查询,公网IP,IP地址 |
| User Agent 解析 | user-agent | User Agent,浏览器识别 |
| 邮箱验证 | email-validator | 邮箱验证,邮箱格式 |

### 网络工具（1）
| 工具 | slug | 关键词 |
|------|------|--------|
| DNS 查询 | dns-lookup | DNS查询,DNS记录,A记录,MX记录 |

### SEO工具（1）
| 工具 | slug | 关键词 |
|------|------|--------|
| Meta 标签生成 | meta-tag | Meta标签,OG标签,SEO标签 |

### 图像/其他（4）
| 工具 | slug | 关键词 |
|------|------|--------|
| 图片压缩 | image-compressor | 图片压缩,在线压缩 |
| 图片格式转换 | image-converter | 图片格式转换,JPG转PNG |
| SVG 转 PNG | svg-to-png | SVG转PNG,在线SVG转换 |
| CSS 渐变生成 | css-gradient | 已列入转换类 |

---

## 五、SEO 状态

### 已完成 ✅
- JSON-LD WebApplication schema（layout.tsx）
- **JSON-LD BreadcrumbList + SoftwareApplication schema（全部 40 个工具页）**
- Open Graph / Twitter Card 标签（layout.tsx）
- 每个工具页独立 metadata + canonical URL
- **keywords 统一为数组格式（27 页修复）**
- robots.txt（允许全部爬虫）
- sitemap.xml（40 个工具页 + 首页 + 广告合作页）
- Google Search Console 验证文件已部署
- 所有工具页含 RelatedTools 内链（**每个工具 4 个推荐，消除 orphan 页面**）
- Google Analytics 4 **已激活** — 测量 ID: G-HYD79KJF3L，实时数据正常
- AdSense 广告组件已就绪 — 发布商 ID: ca-pub-2041541281963495（等待审核）
- **首页 metadata 优化（title/description/keywords 关键词密度提升）**
- **Cloudflare Pages 自动构建** — 配置: Root=/, Build=npm ci && npm run build, Output=out

### 待完成 ❌
- **AdSense 审核中** — 需等待 Google 审核通过（几天到两周）
- **外链建设**：GitHub README、社交媒体、技术博客
- **性能优化**：Core Web Vitals（LCP、CLS、FID）
- **qrcode.react** 未使用依赖，可清理减包
- FAQPage / HowTo schema（对特定工具如正则测试、Cron生成器更合适）

---

## 六、变现路线图

### 当前阶段：流量积累期
- 目标：通过长尾 SEO 关键词获取自然流量
- 策略：工具数量 → 关键词覆盖 → 搜索曝光 → 点击

### 近期优先（Q2 2026）
1. **Google Analytics** — 了解流量来源和用户行为
2. **AdSense 接入** — 在流量页面上放置广告单元
3. **工具数量扩展至 50+** — 覆盖更多长尾关键词
4. **内链优化** — 工具间互相引荐，提升 PV/UV

### 中期（Q3 2026）
1. AdSense 广告位置 AB 测试
2. 内容营销（每工具配套一篇教程博客）
3. 外链建设（GitHub Awesome List、Hacker News、V2EX）

### 工具扩展优先级（按变现潜力排序）
**高价值（高搜索量 + 高广告CPC）**：
- HTML/CSS 在线预览/Playground
- SVG 编辑器
- 图片处理类（批量压缩、格式转换增强）
- 正则表达式测试增强（含常用正则库）

**中等价值（稳定长尾流量）**：
- UUID/GUID 解码
- CSV/JSON 可视化
- SSL 证书检查
- HTTP 状态码参考

**低价值但覆盖长尾**：
- 字符计数器
- 摩斯码转换
- Emoji 查询

---

## 七、竞品参考

| 竞品 | 工具数量 | 特色 | 变现方式 |
|------|---------|------|---------|
| appdevtools.com | 100+ | 全面、英文 | AdSense |
| devtoollab.com | 450+ | 极其全面 | AdSense + 赞助 |
| tooltiq.com | 50+ | UI 精美 | AdSense |
| codebeautify.org | 200+ | 老牌选手 | AdSense + API |

---

## 八、已知问题 & 技术债务

1. `qrcode.react` 未使用 — 可与 `qrcode` 包统一
2. AdSense 审核中 — 发布商 ID ca-pub-2041541281963495，代码内联部署，待 Google 审核
3. 部分工具 ToolClient.tsx 无 loading/error 状态
4. 首页工具卡片按分类硬编码排序，非动态排序
5. 无暗色模式支持
6. 未配置 PWA/service worker
7. ⚠️ 删除 next.config.ts 后不可再创建，防止与 next.config.js (output:export) 冲突
5. 首页工具卡片按分类硬编码排序，非动态排序
6. 无暗色模式支持
7. 未配置 PWA/service worker
