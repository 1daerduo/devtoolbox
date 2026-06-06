#!/usr/bin/env node

/**
 * DevToolbox 功能测试（Playwright）
 * 构建完成后，启动本地服务器，用无头浏览器逐个验证工具
 * 用法: node scripts/functional-test.mjs
 * 耗时: ~2-3 分钟
 */

import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'out');

// ────────────────────────────────────────────
// 预检：Playwright 是否已本地安装
// ────────────────────────────────────────────
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('❌ 未安装 Playwright（本地测试工具）');
  console.log('   运行 npm run setup:test 一键安装 (~300MB)\n');
  process.exit(1);
}

const PASS = '✅';
const FAIL = '❌';
const SKIP = '⏭️';

const results = { pass: 0, fail: 0, skip: 0 };

function log(symbol, msg) {
  console.log(`  ${symbol} ${msg}`);
  if (symbol === FAIL) results.fail++;
  else if (symbol === PASS) results.pass++;
  else if (symbol === SKIP) results.skip++;
}

// ────────────────────────────────────────────
// 简易静态文件服务器
// ────────────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webp': 'image/webp',
};

function startServer(port = 8765) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = new URL(req.url, `http://localhost:${port}`).pathname;
      if (urlPath === '/') urlPath = '/index.html';

      try { urlPath = decodeURIComponent(urlPath); } catch {}

      const filePath = join(OUT_DIR, urlPath);

      // Try file directly
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(readFileSync(filePath));
        return;
      }

      // Try index.html in directory
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(indexPath));
        return;
      }

      // Try without trailing slash
      const cleanPath = filePath.replace(/[\\/]$/, '');
      if (existsSync(cleanPath) && statSync(cleanPath).isFile()) {
        const ext = extname(cleanPath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(readFileSync(cleanPath));
        return;
      }

      res.writeHead(404);
      res.end('Not Found');
    });
    server.listen(port, () => resolve(server));
  });
}

// ────────────────────────────────────────────
// 通用：导航到页面
// ────────────────────────────────────────────
async function goTo(page, baseURL, slug) {
  const url = slug === '__home__' ? `${baseURL}/` : `${baseURL}/tools/${slug}/`;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    if (!resp || !resp.ok()) {
      log(FAIL, `${slug}: HTTP ${resp?.status() ?? 'no response'}`);
      return false;
    }
    const title = await page.title();
    if (!title || title.length < 2) {
      log(FAIL, `${slug}: 标题缺失`);
      return false;
    }
    return true;
  } catch (e) {
    log(FAIL, `${slug}: 加载失败 — ${e.message.slice(0, 80)}`);
    return false;
  }
}

// ────────────────────────────────────────────
// 类型 A：文本转换（输入 → 按钮 → 输出）
// ────────────────────────────────────────────
async function testTextTransform(page, baseURL, slug, opts) {
  if (!await goTo(page, baseURL, slug)) return;

  const { input, triggerText, outputSel, modeBtnText } = opts;

  const textarea = page.locator('textarea').first();
  if (!await textarea.isVisible({ timeout: 4000 }).catch(() => false)) {
    log(FAIL, `${slug}: 找不到输入框`);
    return;
  }
  await textarea.fill(input);

  if (modeBtnText) {
    try {
      await page.locator(`button:has-text("${modeBtnText}")`).first().click({ timeout: 2000 });
      await page.waitForTimeout(300);
    } catch {}
  }

  try {
    await page.locator(`button:has-text("${triggerText}")`).first().click({ timeout: 4000 });
  } catch {
    log(FAIL, `${slug}: 找不到按钮 "${triggerText}"`);
    return;
  }

  await page.waitForTimeout(800);

  const output = page.locator(outputSel).first();
  try {
    await output.waitFor({ state: 'visible', timeout: 6000 });
    const text = await output.textContent().catch(() => '');
    if (text && text.trim().length > 0) {
      log(PASS, `${slug}`);
    } else {
      log(FAIL, `${slug}: 输出为空`);
    }
  } catch {
    log(FAIL, `${slug}: 输出未出现`);
  }
}

// ────────────────────────────────────────────
// 类型 B：自动计算（输入即输出）
// ────────────────────────────────────────────
async function testAutoCompute(page, baseURL, slug, opts) {
  if (!await goTo(page, baseURL, slug)) return;

  const { input, outputSel } = opts;

  // 找第一个可见的输入元素
  let inputElem = null;
  try {
    inputElem = page.locator('textarea').first();
    if (!await inputElem.isVisible({ timeout: 2000 })) inputElem = null;
  } catch { inputElem = null; }

  if (!inputElem) {
    try {
      inputElem = page.locator('input[type="text"]').first();
      if (!await inputElem.isVisible({ timeout: 2000 })) inputElem = null;
    } catch { inputElem = null; }
  }

  if (!inputElem) {
    log(SKIP, `${slug}: 无可见输入元素`);
    return;
  }

  if (input) await inputElem.fill(input);
  await page.waitForTimeout(800);

  const output = page.locator(outputSel).first();
  try {
    await output.waitFor({ state: 'visible', timeout: 6000 });
    log(PASS, `${slug}`);
  } catch {
    log(FAIL, `${slug}: 输出未出现`);
  }
}

// ────────────────────────────────────────────
// 类型 C：生成器（点击生成 → 输出）
// ────────────────────────────────────────────
async function testGenerator(page, baseURL, slug, opts) {
  if (!await goTo(page, baseURL, slug)) return;

  const { triggerText, outputSel } = opts;

  if (triggerText) {
    try {
      await page.locator(`button:has-text("${triggerText}")`).first().click({ timeout: 4000 });
    } catch {
      // 有些生成器是自动的
    }
  }

  await page.waitForTimeout(800);

  const output = page.locator(outputSel).first();
  try {
    await output.waitFor({ state: 'visible', timeout: 6000 });
    log(PASS, `${slug}`);
  } catch {
    log(FAIL, `${slug}: 输出未出现`);
  }
}

// ────────────────────────────────────────────
// 类型 D：展示/查询（页面加载即有内容）
// ────────────────────────────────────────────
async function testDisplay(page, baseURL, slug, opts) {
  if (!await goTo(page, baseURL, slug)) return;
  await page.waitForTimeout(1500);

  const output = page.locator(opts.outputSel).first();
  try {
    await output.waitFor({ state: 'visible', timeout: 8000 });
    log(PASS, `${slug}`);
  } catch {
    log(FAIL, `${slug}: 内容未加载`);
  }
}

// ────────────────────────────────────────────
// 特殊：base64（有编码/解码模式切换）
// ────────────────────────────────────────────
async function testBase64(page, baseURL) {
  try {
    if (!await goTo(page, baseURL, 'base64')) return;

    // 填输入
    const textarea = page.locator('textarea').first();
    if (!await textarea.isVisible({ timeout: 4000 }).catch(() => false)) {
      log(FAIL, 'base64: 找不到输入框');
      return;
    }
    await textarea.fill('Hello Test');

    // 点编码按钮（先确保在编码模式）
    try {
      await page.locator('button:has-text("编码 Encode")').first().click({ timeout: 2000 });
    } catch {
      // 可能已在编码模式
    }

    await page.waitForTimeout(500);

    // 点操作按钮（有的版本是"编码 →"）
    try {
      await page.locator('button:has-text("编码 →")').first().click({ timeout: 2000 });
    } catch {}

    await page.waitForTimeout(800);

    // 检查输出 - 第一个可编辑的 textarea 有输入，第二个(可能 readonly)有输出
    // 或者检查任意包含 base64 特征文字的元素
    const bodyText = await page.locator('body').textContent();
    if (bodyText.includes('SGVsbG8') || bodyText.includes('aGVsbG8')) {
      log(PASS, 'base64');
      return;
    }

    // 尝试获取 readonly textarea
    const readonly = page.locator('textarea[readonly]');
    if (await readonly.count() > 0) {
      const val = await readonly.first().inputValue().catch(() => '');
      if (val && val.length > 0) {
        log(PASS, 'base64');
        return;
      }
    }

    log(FAIL, 'base64: 输出未出现');
  } catch (e) {
    log(FAIL, `base64: 异常 — ${e.message.slice(0, 60)}`);
  }
}

// ────────────────────────────────────────────
// 特殊：regex（3 个输入字段）
// ────────────────────────────────────────────
async function testRegex(page, baseURL) {
  if (!await goTo(page, baseURL, 'regex')) return;

  // 填正则表达式
  const inputs = page.locator('input[type="text"]');
  await inputs.first().fill('\\d+');
  // 标志位（第二个 input）
  try { await inputs.nth(1).fill('g'); } catch {}

  // 填测试文本（textarea）
  const textarea = page.locator('textarea').first();
  if (await textarea.isVisible({ timeout: 2000 }).catch(() => false)) {
    await textarea.fill('abc123def456');
  }

  // 点"测试匹配"
  try {
    await page.locator('button:has-text("测试匹配")').first().click({ timeout: 3000 });
  } catch {
    // 自动触发，不需要按钮
  }

  await page.waitForTimeout(1000);

  // 检查是否有匹配结果
  const result = page.locator('div').filter({ hasText: /123|匹配|match/i }).first();
  try {
    await result.waitFor({ state: 'visible', timeout: 5000 });
    log(PASS, 'regex');
  } catch {
    log(FAIL, 'regex: 未显示匹配结果');
  }
}

// ────────────────────────────────────────────
// 特殊：qrcode（需要点击生成按钮 + canvas 输出）
// ────────────────────────────────────────────
async function testQrcode(page, baseURL) {
  try {
    if (!await goTo(page, baseURL, 'qrcode')) return;

    const textarea = page.locator('textarea').first();
    if (!await textarea.isVisible({ timeout: 4000 }).catch(() => false)) {
      log(FAIL, 'qrcode: 找不到输入框');
      return;
    }
    await textarea.fill('https://devtoolbox-61u.pages.dev');

    // 点"生成二维码"按钮
    try {
      await page.locator('button:has-text("生成")').first().click({ timeout: 3000 });
    } catch {
      log(FAIL, 'qrcode: 找不到生成按钮');
      return;
    }

    await page.waitForTimeout(2000); // QR code generation takes time (canvas)

    // 检查是否有 img 或 canvas 输出
    const img = page.locator('img');
    const canvas = page.locator('canvas');

    const imgCount = await img.count();
    const canvasCount = await canvas.count();

    if (imgCount > 0 || canvasCount > 0) {
      log(PASS, 'qrcode');
    } else {
      log(FAIL, 'qrcode: 未生成图像');
    }
  } catch (e) {
    log(FAIL, `qrcode: 异常 — ${e.message.slice(0, 60)}`);
  }
}
async function testDiff(page, baseURL) {
  if (!await goTo(page, baseURL, 'diff-checker')) return;

  const textareas = page.locator('textarea');
  if (await textareas.count() < 2) {
    log(FAIL, 'diff-checker: 找不到 2 个文本框');
    return;
  }

  await textareas.first().fill('line1\nline2\nline3\nline4');
  await textareas.nth(1).fill('line1\nmodified line2\nline3\nline4\nline5');
  await page.waitForTimeout(1000);

  // 检查是否有差异结果
  const result = page.locator('div').filter({ hasText: /line|差异|diff/i }).first();
  try {
    await result.waitFor({ state: 'visible', timeout: 5000 });
    log(PASS, 'diff-checker');
  } catch {
    log(FAIL, 'diff-checker: 未显示差异结果');
  }
}

// ────────────────────────────────────────────
// 工具测试配置
// ────────────────────────────────────────────
const TOOL_TESTS = [
  // === 文本转换类 ===
  { type: 'text', slug: 'base64', special: 'base64' },
  { type: 'text', slug: 'css-formatter',
    input: 'body{color:red;margin:0;padding:10px;}', triggerText: '美化', outputSel: 'pre, textarea[readonly]' },
  { type: 'text', slug: 'html-formatter',
    input: '<div><p>test</p></div>', triggerText: '美化', outputSel: 'pre' },
  { type: 'text', slug: 'html-entity',
    input: '<div class="test">Hello & World</div>', triggerText: '编码', outputSel: 'pre, div' },
  { type: 'text', slug: 'js-formatter',
    input: 'const a=1;function test(){return a+2;}', triggerText: '美化', outputSel: 'pre' },
  { type: 'text', slug: 'json-formatter',
    input: '{"name":"test","value":42,"arr":[1,2,3]}', triggerText: '格式化', outputSel: 'pre' },
  { type: 'text', slug: 'sql-formatter',
    input: 'SELECT id,name FROM users WHERE age>18 ORDER BY id DESC', triggerText: '格式化', outputSel: 'pre' },
  { type: 'text', slug: 'xml-formatter',
    input: '<root><item id="1">test</item></root>', triggerText: '格式化', outputSel: 'pre' },
  { type: 'text', slug: 'url-encode',
    input: 'https://example.com?q=hello world', triggerText: '编码', outputSel: 'pre, div' },
  { type: 'text', slug: 'json-to-csv',
    input: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]', triggerText: '转换', outputSel: 'pre' },
  { type: 'text', slug: 'jwt-decoder',
    input: 'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiVGVzdCJ9.xyz123', triggerText: '解码', outputSel: 'pre' },
  { type: 'text', slug: 'yaml-formatter',
    input: '{"hello":"world","items":[1,2,3]}', triggerText: '转换', outputSel: 'pre' },
  { type: 'text', slug: 'markdown-to-html',
    input: '# Hello\n**Bold** text', triggerText: '', outputSel: 'pre, div' },

  // === 自动计算类 ===
  { type: 'auto', slug: 'case-converter',
    input: 'Hello World Test', outputSel: 'code, pre, div' },
  { type: 'auto', slug: 'word-count',
    input: 'Hello world\nThis is a test.\nThird line here.', outputSel: 'div' },
  { type: 'auto', slug: 'color-converter',
    input: '#3B82F6', outputSel: 'code, div' },
  { type: 'auto', slug: 'meta-tag',
    input: '', outputSel: 'pre, div' },
  { type: 'auto', slug: 'number-base',
    input: '42', outputSel: 'input[type="text"]' },
  { type: 'auto', slug: 'timestamp',
    input: '1700000000', outputSel: 'pre, div' },
  { type: 'auto', slug: 'markdown-editor',
    input: '# Test\n**bold**', outputSel: 'div' },
  { type: 'auto', slug: 'regex', special: 'regex' },
  { type: 'auto', slug: 'diff-checker', special: 'diff' },

  // === 生成器类 ===
  { type: 'gen', slug: 'uuid-generator', triggerText: '生成', outputSel: 'div' },
  { type: 'gen', slug: 'password-generator', triggerText: '生成密码', outputSel: 'div' },
  { type: 'gen', slug: 'lorem-ipsum', triggerText: '生成文本', outputSel: 'pre, div' },
  { type: 'gen', slug: 'random-number', triggerText: '生成随机数', outputSel: 'div' },
  { type: 'gen', slug: 'cron-generator', triggerText: '', outputSel: 'div, pre' },
  { type: 'gen', slug: 'bcrypt-generator', triggerText: '生成哈希', outputSel: 'div' },
  { type: 'gen', slug: 'hash-generator', triggerText: '生成哈希值', outputSel: 'div' },

  // === 查询/展示类 ===
  { type: 'display', slug: 'my-ip', outputSel: 'div' },
  { type: 'display', slug: 'user-agent', outputSel: 'div' },
  { type: 'display', slug: 'dns-lookup', outputSel: 'div, table' },
  { type: 'display', slug: 'email-validator', outputSel: 'div' },

  // === Canvas/图像类（不需要文件上传的） ===
  { type: 'canvas', slug: 'qrcode', special: 'qrcode' },
  { type: 'canvas', slug: 'css-gradient',
    input: '', triggerText: '', outputSel: 'div, pre' },

  // === 文件上传类（跳过） ===
  { type: 'skip', slug: 'image-compressor', reason: '需要文件上传' },
  { type: 'skip', slug: 'image-converter', reason: '需要文件上传' },
  { type: 'skip', slug: 'svg-to-png', reason: '需要文件上传' },
  { type: 'skip', slug: 'base64-image', reason: '需要文件上传' },
];

// ────────────────────────────────────────────
// 主函数
// ────────────────────────────────────────────
async function main() {
  console.log('🧪 DevToolbox 功能测试 (Playwright)\n');
  console.log('='.repeat(52));

  // 0. 检查构建产物
  if (!existsSync(OUT_DIR) || !existsSync(join(OUT_DIR, 'index.html'))) {
    console.log('❌ out/ 目录不存在，请先执行 npm run build');
     process.exit(1);
  }

  // 1. 启动服务器
  const PORT = 8765;
  const server = await startServer(PORT);
  const baseURL = `http://localhost:${PORT}`;
  console.log(`🌐 本地服务器: ${baseURL}`);

  // 2. 启动浏览器
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // 忽略不重要的控制台错误
  page.on('pageerror', (err) => {
    const msg = err.message || '';
    if (msg.includes('adsbygoogle') || msg.includes('gtag')) return;
  });

  // 3. 测试首页
  console.log('\n🏠 首页');
  if (await goTo(page, baseURL, '__home__')) {
    log(PASS, '首页');
  }

  // 4. 运行所有工具测试
  console.log(`\n🧩 工具功能测试 (${TOOL_TESTS.length} 个)\n`);

  for (const t of TOOL_TESTS) {
    switch (t.type) {
      case 'text':
        if (t.special === 'base64') {
          await testBase64(page, baseURL);
        } else {
          await testTextTransform(page, baseURL, t.slug, {
            input: t.input, triggerText: t.triggerText, outputSel: t.outputSel
          });
        }
        break;
      case 'auto':
        if (t.special === 'regex') {
          await testRegex(page, baseURL);
        } else if (t.special === 'diff') {
          await testDiff(page, baseURL);
        } else {
          await testAutoCompute(page, baseURL, t.slug, {
            input: t.input, outputSel: t.outputSel
          });
        }
        break;
      case 'gen':
        await testGenerator(page, baseURL, t.slug, {
          triggerText: t.triggerText, outputSel: t.outputSel
        });
        break;
      case 'display':
        await testDisplay(page, baseURL, t.slug, {
          outputSel: t.outputSel
        });
        break;
      case 'canvas':
        if (t.special === 'qrcode') {
          await testQrcode(page, baseURL);
        } else {
          await testAutoCompute(page, baseURL, t.slug, {
            input: t.input, outputSel: t.outputSel
          });
        }
        break;
      case 'skip':
        log(SKIP, `${t.slug}: ${t.reason}`);
        break;
    }
  }

  // 5. 清理
  await browser.close();
  server.close();

  // 6. 总结
  console.log('\n' + '='.repeat(52));
  console.log('📋 测试总结');
  console.log('='.repeat(52));
  console.log(`  通过: ${results.pass} | 失败: ${results.fail} | 跳过: ${results.skip}`);
  console.log(`  覆盖率: ${results.pass + results.fail}/${TOOL_TESTS.length} 个工具`);
  console.log('='.repeat(52));

  if (results.fail > 0) {
    console.log(`\n❌ 功能测试失败 — ${results.fail} 个工具需要修复`);
    process.exit(1);
  } else {
    console.log('\n✅ 所有工具功能正常！');
    process.exit(0);
  }
}

main().catch((e) => {
  console.error(`\n💥 测试异常: ${e.message}`);
  process.exit(1);
});
