import { promises as fs } from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { startups } from '@/data/startups'
import SubProjectReadmeClient from '@/components/pages/SubProjectReadmeClient'

// 预渲染所有带 README 的子项目；其余按需动态生成。
export function generateStaticParams() {
  return startups
    .filter((s) => s.parentId)
    .map((s) => ({ subId: s.id }))
}

// 为每个子项目生成标题。
export function generateMetadata({ params }: { params: Promise<{ subId: string }> }) {
  return params.then((p) => {
    const sub = startups.find((s) => s.id === p.subId && s.parentId)
    return { title: sub ? `${sub.name} · Rui Li` : 'Sub-project · Rui Li' }
  })
}

export default async function SubProjectReadmePage({
  params,
}: {
  params: Promise<{ subId: string }>
}) {
  const { subId } = await params
  const sub = startups.find((s) => s.id === subId && s.parentId)
  if (!sub) {
    notFound()
  }
  const parent = startups.find((s) => s.id === sub.parentId)

  // 读取 README（readmePath 为仓库内相对路径，如 data/readmes/quant-trading.md；
  // 在 Vercel 构建时 process.cwd() 即仓库根，文件存在可读取）。
  let readme: string | null = null
  if (sub.readmePath) {
    try {
      readme = await fs.readFile(path.join(process.cwd(), sub.readmePath), 'utf8')
    } catch {
      readme = null
    }
  }

  return <SubProjectReadmeClient sub={sub} parent={parent} readme={readme} />
}
