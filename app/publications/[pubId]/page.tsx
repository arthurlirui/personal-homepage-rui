import { notFound } from 'next/navigation'
import { publications } from '@/data/publications'
import PublicationDetailClient from '@/components/pages/PublicationDetailClient'

// 预渲染所有论文详情页。
export function generateStaticParams() {
  return publications.map((p) => ({ pubId: p.id }))
}

// 为每篇论文生成标题。
export function generateMetadata({ params }: { params: Promise<{ pubId: string }> }) {
  return params.then((p) => {
    const pub = publications.find((pub) => pub.id === p.pubId)
    return { title: pub ? `${pub.title} · Rui Li` : 'Publication · Rui Li' }
  })
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ pubId: string }>
}) {
  const { pubId } = await params
  const pub = publications.find((p) => p.id === pubId)
  if (!pub) {
    notFound()
  }

  return <PublicationDetailClient pub={pub} />
}
