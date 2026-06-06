#!/usr/bin/env node

/**
 * 本地 Playwright 安装脚本
 * 仅在本地开发环境运行，Cloudflare 构建不会执行此脚本
 *
 * 用法: npm run setup:test
 * 效果: 项目内安装 playwright + chromium 浏览器（约 300MB）
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const NODE_MODULES = join(ROOT, 'node_modules');

// 确保 node_modules 存在
if (!existsSync(NODE_MODULES)) {
  mkdirSync(NODE_MODULES, { recursive: true });
}

console.log('📦 安装 Playwright（仅本地）...\n');

// Step 1: 安装 playwright npm 包到项目 node_modules
console.log('→ 安装 playwright 包...');
execSync('npm install --no-save playwright@^1.60.0', {
  cwd: ROOT,
  stdio: 'inherit',
});

// Step 2: 安装 Chromium 浏览器
console.log('\n→ 安装 Chromium 浏览器...');
execSync('npx playwright install chromium', {
  cwd: ROOT,
  stdio: 'inherit',
});

// Step 3: 验证
console.log('\n→ 验证安装...');
try {
  execSync('node -e "require(\'playwright\')"', {
    cwd: ROOT,
    stdio: 'pipe',
  });
  console.log('✅ Playwright 安装成功！');
  console.log('\n💡 现在可以运行: npm run test:func');
} catch {
  console.log('⚠️  安装可能未完全成功，请检查错误信息');
  process.exit(1);
}
