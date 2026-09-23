#!/usr/bin/env node
//
// sync-readmes.js — 将外部仓库的 README 同步到本仓库 data/readmes/ 下，
// 供 /projects/[subId] 子页面在构建时读取（Vercel 构建服务器无法访问本机绝对路径）。
//
// 用法：
//   node scripts/sync-readmes.js
//
// 同步映射在下方 SOURCES 中维护：key = data/readmes/ 下的目标文件名，
// value = 外部 README 的绝对路径。
//
const fs = require('node:fs')
const path = require('node:path')

const SOURCES = {
  'quant-trading.md': 'D:/Code/quant-trading/README.md',
}

const outDir = path.join(__dirname, '..', 'data', 'readmes')
fs.mkdirSync(outDir, { recursive: true })

let changed = 0
for (const [dest, src] of Object.entries(SOURCES)) {
  try {
    const content = fs.readFileSync(src, 'utf8')
    const destPath = path.join(outDir, dest)
    const existing = fs.existsSync(destPath) ? fs.readFileSync(destPath, 'utf8') : null
    if (existing === content) {
      console.log(`  ✓ ${dest} (unchanged)`)
    } else {
      fs.writeFileSync(destPath, content, 'utf8')
      console.log(`  ↻ ${dest} (updated from ${src})`)
      changed++
    }
  } catch (e) {
    console.error(`  ✗ ${dest}: cannot read ${src} — ${e.message}`)
  }
}

console.log(changed > 0 ? `\nDone. ${changed} file(s) updated.` : '\nDone. All up to date.')
