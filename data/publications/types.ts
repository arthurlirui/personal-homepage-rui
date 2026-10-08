// 论文数据类型定义 — 被 data/publications.ts 和各论文文件共享。

export type PubType = 'journal' | 'conference' | 'preprint'

// 论文级别（可选）：
//   ccf:         CCF 推荐等级 'A' | 'B' | 'C'，参考中国计算机学会推荐目录
//   csrankings:  是否被 CSRankings 收录（仅统计顶级会议/期刊）
// 留空（不写）表示无级别收录。编辑时可按需调整。
export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  venueShort: string
  year: number
  type: PubType
  featured: boolean
  ccf?: 'A' | 'B' | 'C'
  csrankings?: boolean
  abstract?: string
  doi?: string
  pdf?: string
  code?: string
  teaser?: string // teaser image or GIF path, e.g. '/uploads/teasers/neat.gif'
  projectSlug?: string
  image?: string
}

// 作者列表中 "admin" 代表本人 Rui Li
export const me = 'Rui Li'
