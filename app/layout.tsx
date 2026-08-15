import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ClientLayout from '@/components/layout/ClientLayout'
import { profile } from '@/data/profile'
import './globals.css'

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.nameZh} — ${profile.titleZh}`,
  description: `${profile.nameZh}，${profile.affiliationZh}。研究方向：计算摄影、3D 重建、神经渲染。`,
  keywords: ['Rui Li', '李睿', 'Computational Photography', '3D Reconstruction', 'Neural Rendering', 'KAUST'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface">
        <Header />
        <main className="flex-1">
          <ClientLayout>{children}</ClientLayout>
        </main>
        <Footer />
      </body>
    </html>
  )
}
