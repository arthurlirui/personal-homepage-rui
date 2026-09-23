//
// ─── 轻量级 Markdown 渲染器 ─────────────────────────────────────
// 无第三方依赖，覆盖 README 常见结构：标题 / 段落 / 列表 / 代码块 /
// 行内代码 / 表格 / 引用 / 分隔线 / 链接 / 图片 / 徽章。
//
import type { ReactNode } from 'react'

type Block =
  | { type: 'heading'; level: number; inline: Inline[] }
  | { type: 'paragraph'; inline: Inline[] }
  | { type: 'ul'; items: Inline[][] }
  | { type: 'ol'; items: Inline[][] }
  | { type: 'code'; lang: string; content: string }
  | { type: 'quote'; inline: Inline[] }
  | { type: 'hr' }
  | { type: 'table'; header: Inline[][]; rows: Inline[][][] }
  | { type: 'blank' }

type Inline =
  | { kind: 'text'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'bold'; children: Inline[] }
  | { kind: 'italic'; children: Inline[] }
  | { kind: 'link'; href: string; children: Inline[] }
  | { kind: 'image'; alt: string; src: string; href?: string }
  | { kind: 'badge'; alt: string; href: string; imgSrc: string }

// ─── 行内解析 ──────────────────────────────────────────────────
// 递归下降：处理 **bold**、*italic*、`code`、![alt](src)、[text](href)。
function parseInline(src: string): Inline[] {
  const out: Inline[] = []
  let i = 0
  let buf = ''
  const flush = () => {
    if (buf) {
      out.push({ kind: 'text', value: buf })
      buf = ''
    }
  }

  while (i < src.length) {
    const rest = src.slice(i)

    // 链接包裹的图片/徽章 [![alt](img)](href)
    const linkedImg = rest.match(/^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/)
    if (linkedImg) {
      flush()
      const alt = linkedImg[1]
      const imgSrc = linkedImg[2]
      const href = linkedImg[3]
      if (/img\.shields\.io|badge/.test(imgSrc)) {
        out.push({ kind: 'badge', alt, href, imgSrc })
      } else {
        out.push({ kind: 'image', alt, src: imgSrc, href })
      }
      i += linkedImg[0].length
      continue
    }

    // 图片 ![alt](src) — 也可能是徽章图片 (img.shields.io)
    const img = rest.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (img) {
      flush()
      const alt = img[1]
      const srcUrl = img[2]
      if (/img\.shields\.io|badge/.test(srcUrl)) {
        // 徽章：渲染为紧凑的小标签
        out.push({ kind: 'badge', alt, href: '', imgSrc: srcUrl })
      } else {
        out.push({ kind: 'image', alt, src: srcUrl })
      }
      i += img[0].length
      continue
    }

    // 链接 [text](href) — 若前缀是 ! 已被上面消费
    const link = rest.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (link) {
      flush()
      out.push({ kind: 'link', href: link[2], children: parseInline(link[1]) })
      i += link[0].length
      continue
    }

    // 行内代码 `code`
    if (src[i] === '`') {
      const end = src.indexOf('`', i + 1)
      if (end !== -1) {
        flush()
        out.push({ kind: 'code', value: src.slice(i + 1, end) })
        i = end + 1
        continue
      }
    }

    // 粗体 **text**
    if (src[i] === '*' && src[i + 1] === '*') {
      const end = src.indexOf('**', i + 2)
      if (end !== -1) {
        flush()
        out.push({ kind: 'bold', children: parseInline(src.slice(i + 2, end)) })
        i = end + 2
        continue
      }
    }

    // 斜体 *text* (避免与 ** 冲突)
    if (src[i] === '*') {
      const end = src.indexOf('*', i + 1)
      if (end !== -1 && end > i + 1) {
        flush()
        out.push({ kind: 'italic', children: parseInline(src.slice(i + 1, end)) })
        i = end + 1
        continue
      }
    }

    buf += src[i]
    i++
  }
  flush()
  return out
}

// ─── 块级解析 ──────────────────────────────────────────────────
function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // 空行
    if (line.trim() === '') {
      i++
      continue
    }

    // 围栏代码块 ```lang
    const fence = line.match(/^```\s*(\w*)/)
    if (fence) {
      const lang = fence[1] || ''
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++ // 跳过闭合 ```
      blocks.push({ type: 'code', lang, content: code.join('\n') })
      continue
    }

    // 标题 # ~ ######
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, inline: parseInline(heading[2].trim()) })
      i++
      continue
    }

    // 水平线 --- / ***
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push({ type: 'hr' })
      i++
      continue
    }

    // 引用 >
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''))
        i++
      }
      blocks.push({ type: 'quote', inline: parseInline(quoteLines.join(' ')) })
      continue
    }

    // 表格（含分隔行 |---|）
    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:-]+\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const splitRow = (r: string) =>
        r.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim())
      const header = splitRow(line).map(parseInline)
      i += 2
      const rows: Inline[][][] = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
        rows.push(splitRow(lines[i]).map(parseInline))
        i++
      }
      blocks.push({ type: 'table', header, rows })
      continue
    }

    // 无序列表 - / *
    if (/^\s*[-*]\s+/.test(line)) {
      const items: Inline[][] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*[-*]\s+/, '')))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }

    // 有序列表 1.
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: Inline[][] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*\d+\.\s+/, '')))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }

    // 段落（连续非空行合并）
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('>') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      para.push(lines[i])
      i++
    }
    blocks.push({ type: 'paragraph', inline: parseInline(para.join(' ')) })
  }

  return blocks
}

// ─── 行内渲染 ──────────────────────────────────────────────────
function renderInline(nodes: Inline[]): ReactNode[] {
  return nodes.map((n, idx) => {
    switch (n.kind) {
      case 'text':
        return <span key={idx}>{n.value}</span>
      case 'code':
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-slate-100 text-accent text-[0.85em] font-mono"
          >
            {n.value}
          </code>
        )
      case 'bold':
        return (
          <strong key={idx} className="font-semibold text-slate-900">
            {renderInline(n.children)}
          </strong>
        )
      case 'italic':
        return (
          <em key={idx} className="italic text-slate-700">
            {renderInline(n.children)}
          </em>
        )
      case 'link': {
        const isExternal = n.href.startsWith('http')
        return (
          <a
            key={idx}
            href={n.href}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-accent hover:text-accent-light underline decoration-accent-subtle underline-offset-2"
          >
            {renderInline(n.children)}
          </a>
        )
      }
      case 'image': {
        const imgEl = (
          <img
            src={n.src}
            alt={n.alt}
            className="my-2 max-w-full rounded-lg border border-slate-200"
          />
        )
        if (n.href) {
          const isExternal = n.href.startsWith('http')
          return (
            <a
              key={idx}
              href={n.href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {imgEl}
            </a>
          )
        }
        return imgEl
      }
      case 'badge': {
        const imgEl = (
          <img
            src={n.imgSrc}
            alt={n.alt}
            className="inline-block h-5 mx-0.5 align-middle"
          />
        )
        // 徽章图片：若有链接则包一层 a，否则直接渲染图片
        if (n.href) {
          const isExternal = n.href.startsWith('http')
          return (
            <a
              key={idx}
              href={n.href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {imgEl}
            </a>
          )
        }
        return imgEl
      }
      default:
        return null
    }
  })
}

// ─── 块级渲染 ──────────────────────────────────────────────────
function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((b, idx) => {
    switch (b.type) {
      case 'heading': {
        const sizes: Record<number, string> = {
          1: 'text-2xl md:text-3xl font-bold mt-8 mb-4',
          2: 'text-xl md:text-2xl font-bold mt-7 mb-3',
          3: 'text-lg md:text-xl font-semibold mt-6 mb-2',
          4: 'text-base md:text-lg font-semibold mt-5 mb-2',
          5: 'text-base font-semibold mt-4 mb-1.5',
          6: 'text-sm font-semibold mt-4 mb-1.5',
        }
        const className = `font-serif text-slate-900 ${sizes[b.level] ?? sizes[6]}`
        const content = renderInline(b.inline)
        if (b.level === 1) return <h1 key={idx} className={className}>{content}</h1>
        if (b.level === 2) return <h2 key={idx} className={className}>{content}</h2>
        if (b.level === 3) return <h3 key={idx} className={className}>{content}</h3>
        if (b.level === 4) return <h4 key={idx} className={className}>{content}</h4>
        if (b.level === 5) return <h5 key={idx} className={className}>{content}</h5>
        return <h6 key={idx} className={className}>{content}</h6>
      }
      case 'paragraph':
        return (
          <p key={idx} className="my-3 text-slate-700 leading-relaxed">
            {renderInline(b.inline)}
          </p>
        )
      case 'ul':
        return (
          <ul key={idx} className="my-3 space-y-1.5 pl-6 list-disc text-slate-700">
            {b.items.map((it, j) => (
              <li key={j} className="leading-relaxed">
                {renderInline(it)}
              </li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={idx} className="my-3 space-y-1.5 pl-6 list-decimal text-slate-700">
            {b.items.map((it, j) => (
              <li key={j} className="leading-relaxed">
                {renderInline(it)}
              </li>
            ))}
          </ol>
        )
      case 'code':
        return (
          <pre
            key={idx}
            className="my-4 p-4 rounded-lg bg-slate-900 text-slate-100 text-sm overflow-x-auto font-mono"
          >
            <code>{b.content}</code>
          </pre>
        )
      case 'quote':
        return (
          <blockquote
            key={idx}
            className="my-4 pl-4 border-l-4 border-accent-subtle bg-surface-muted/50 py-2 pr-3 rounded-r text-slate-700 italic"
          >
            {renderInline(b.inline)}
          </blockquote>
        )
      case 'hr':
        return <hr key={idx} className="my-6 border-slate-200" />
      case 'table':
        return (
          <div key={idx} className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-muted">
                  {b.header.map((h, j) => (
                    <th key={j} className="px-3 py-2 text-left font-semibold text-slate-800 border border-slate-200">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r} className="even:bg-surface-muted/30">
                    {row.map((cell, c) => (
                      <td key={c} className="px-3 py-2 text-slate-700 border border-slate-200">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'blank':
      default:
        return null
    }
  })
}

// ─── 对外组件 ──────────────────────────────────────────────────
export function Markdown({ source }: { source: string }) {
  const blocks = parseBlocks(source)
  return <div className="prose max-w-none">{renderBlocks(blocks)}</div>
}
