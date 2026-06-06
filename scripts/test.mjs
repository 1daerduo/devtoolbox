#!/usr/bin/env node

/**
 * DevToolbox 自动化测试脚本
 * 零依赖，纯 Node.js，构建后验证静态站点质量
 * 用法: node scripts/test.mjs
 * 耗时: ~10-15 秒（47 个页面）
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, sep } from 'path';

const OUT_DIR = join(process.cwd(), 'out');
const PASS = '✅';
const FAIL = '❌';
const WARN = '⚠️';

let errors = 0;
let warnings = 0;
let total = 0;

function log(symbol, msg) {
  console.log(`  ${symbol} ${msg}`);
  if (symbol === FAIL) errors++;
  if (symbol === WARN) warnings++;
  total++;
}

// ────────────────────────────────────────────
// 1. 基础结构检查
// ────────────────────────────────────────────
console.log('\n📁 1. 基础结构检查');

if (!existsSync(OUT_DIR)) {
  log(FAIL, 'out/ 目录不存在 — 是否执行了 npm run build？');
  process.exit(1);
}
log(PASS, 'out/ 目录存在');

const requiredFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml'];
for (const f of requiredFiles) {
  if (existsSync(join(OUT_DIR, f))) {
    log(PASS, `${f} 存在`);
  } else {
    log(FAIL, `${f} 缺失`);
  }
}

// ────────────────────────────────────────────
// 2. 收集所有 HTML 页面
// ────────────────────────────────────────────
console.log('\n📄 2. HTML 页面完整性');

function collectHtmlFiles(dir) {
  let files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files = files.concat(collectHtmlFiles(full));
    } else if (extname(full) === '.html') {
      files.push(full);
    }
  }
  return files;
}

// 排除特殊文件（Google 验证文件等非真实页面）
const isSpecialFile = (f) => f.includes('google') && f.endsWith('.html');

const htmlFiles = collectHtmlFiles(OUT_DIR).filter(f => !isSpecialFile(f));
const pageCount = htmlFiles.length;
console.log(`  共 ${pageCount} 个 HTML 页面`);

if (pageCount >= 40) {
  log(PASS, `页面数 ${pageCount} >= 40（满足工具站要求）`);
} else {
  log(FAIL, `页面数 ${pageCount} < 40（工具可能缺失）`);
}

// ────────────────────────────────────────────
// 3. 每个页面的关键检查
// ────────────────────────────────────────────
console.log('\n🔍 3. 页面关键元素检查');

// 跨平台兼容：Windows 用 \，Linux/Mac 用 /
const toolPages = htmlFiles.filter(f => f.includes(`${sep}tools${sep}`) || f.includes('/tools/'));

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const relPath = file.replace(OUT_DIR, '');

  // 基础 HTML 结构
  if (!html.includes('<!DOCTYPE html>') && !html.includes('<!doctype html>')) {
    log(FAIL, `${relPath}: 缺少 DOCTYPE`);
    continue;
  }
  if (!html.includes('<title>')) {
    log(FAIL, `${relPath}: 缺少 <title>`);
    continue;
  }
  // charset 检测：Next.js 输出 <meta charSet="utf-8"/>（注意大写 S）
  if (!html.includes('charSet') && !html.includes('charset') && !html.includes('CHARSET')) {
    log(WARN, `${relPath}: 缺少 charset meta`);
  }
}

// 所有工具页必须有的元素
for (const file of toolPages) {
  const html = readFileSync(file, 'utf-8');
  const relPath = file.replace(OUT_DIR, '');
  // 提取工具 slug：兼容 \tools\xxx\index.html 和 /tools/xxx/index.html
  const name = relPath.replace(/[\\/]tools[\\/]/, '').replace(/[\\/]index\.html$/, '');

  // canonical URL
  if (!html.includes('rel="canonical"')) {
    log(WARN, `${name}: 缺少 canonical URL`);
  }

  // meta description
  if (!html.includes('name="description"')) {
    log(WARN, `${name}: 缺少 meta description`);
  }

  // JSON-LD structured data
  if (!html.includes('application/ld+json')) {
    log(WARN, `${name}: 缺少 JSON-LD 结构化数据`);
  }
}

console.log(`  已验证 ${toolPages.length} 个工具页的基本结构`);

// ────────────────────────────────────────────
// 4. GA4 + AdSense 脚本检查（关键！）
// ────────────────────────────────────────────
console.log('\n📊 4. GA4 + AdSense 脚本检查');

const ga4Id = 'G-HYD79KJF3L';
const adsenseId = 'ca-pub-2041541281963495';

let ga4Count = 0;
let adsenseCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  if (html.includes(ga4Id) && html.includes('googletagmanager.com/gtag')) {
    ga4Count++;
  }
  if (html.includes(adsenseId) && html.includes('adsbygoogle')) {
    adsenseCount++;
  }
}

if (ga4Count === pageCount) {
  log(PASS, `GA4 脚本: ${ga4Count}/${pageCount} 页面 ✅`);
} else {
  log(FAIL, `GA4 脚本: ${ga4Count}/${pageCount} 页面（缺少 ${pageCount - ga4Count} 个）`);
}

if (adsenseCount === pageCount) {
  log(PASS, `AdSense 脚本: ${adsenseCount}/${pageCount} 页面 ✅`);
} else {
  log(FAIL, `AdSense 脚本: ${adsenseCount}/${pageCount} 页面（缺少 ${pageCount - adsenseCount} 个）`);
}

// ────────────────────────────────────────────
// 5. 文件大小检查（过大页面警告）
// ────────────────────────────────────────────
console.log('\n📦 5. 页面大小检查');

let oversizedCount = 0;
for (const file of htmlFiles) {
  const size = statSync(file).size;
  const kb = (size / 1024).toFixed(1);
  const relPath = file.replace(OUT_DIR, '');
  if (size > 100 * 1024) { // 超过 100KB 警告
    log(WARN, `${relPath}: ${kb}KB（偏大）`);
    oversizedCount++;
  }
}

if (oversizedCount === 0) {
  log(PASS, '所有页面 < 100KB，大小正常');
}

// ────────────────────────────────────────────
// 6. robots.txt 检查
// ────────────────────────────────────────────
console.log('\n🤖 6. robots.txt 检查');

const robotsPath = join(OUT_DIR, 'robots.txt');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf-8');
  if (robots.includes('Sitemap:')) {
    log(PASS, 'robots.txt 包含 Sitemap 引用');
  } else {
    log(WARN, 'robots.txt 缺少 Sitemap 引用');
  }
}

// ────────────────────────────────────────────
// 7. sitemap.xml 检查
// ────────────────────────────────────────────
console.log('\n🗺️  7. sitemap.xml 检查');

const sitemapPath = join(OUT_DIR, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf-8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  log(PASS, `sitemap.xml 包含 ${urlCount} 个 URL`);
  
  const sitemapSize = statSync(sitemapPath).size;
  if (sitemapSize > 50 * 1024 * 1024) {
    log(FAIL, 'sitemap.xml 超过 50MB 上限');
  }
}

// ────────────────────────────────────────────
// 总结
// ────────────────────────────────────────────
console.log('\n' + '='.repeat(50));
console.log('📋 测试总结');
console.log('='.repeat(50));
console.log(`  页面总数: ${pageCount}`);
console.log(`  工具页面: ${toolPages.length}`);
console.log(`  GA4 覆盖: ${ga4Count}/${pageCount}`);
console.log(`  AdSense 覆盖: ${adsenseCount}/${pageCount}`);
console.log(`  错误: ${errors}  警告: ${warnings}`);
console.log('='.repeat(50));

if (errors > 0) {
  console.log(`\n❌ 测试失败 — ${errors} 个错误需要修复`);
  process.exit(1);
} else {
  console.log('\n✅ 全部测试通过！');
  process.exit(0);
}
