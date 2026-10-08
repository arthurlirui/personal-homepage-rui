// 论文数据聚合入口 — 每篇论文单独维护在 data/publications/[id].ts，
// 此文件汇总所有论文并导出统一的 publications 数组、统计与辅助函数。
// 所有页面（列表、详情、首页精选、研究方向等）都从这里取数据，
// 保证全工程只有一份论文数据源。
//
// 新增论文：在 data/publications/ 下新建 [id].ts 文件（参照现有文件），
// 然后在下方 import 并加入 allPublications 数组即可。

export type { PubType, Publication } from './publications/types'

import adaptiveDiffGrids from './publications/adaptive-diff-grids-cryo-et'
import hapticTwin from './publications/haptic-twin-telecooperation'
import cwcDnerf from './publications/cwc-dnerf'
import pointLadderTuning from './publications/point-ladder-tuning'
import geometryAdaptivePolyhedron from './publications/geometry-adaptive-polyhedron'
import neat from './publications/neat'
import neuralAdaptiveSceneTracing from './publications/neural-adaptive-scene-tracing'
import shapeReflectanceDiffRendering from './publications/shape-reflectance-diff-rendering'
import intratomo from './publications/intratomo'
import reflectionSeparation from './publications/reflection-separation'
import lightFieldSegmentation from './publications/light-field-segmentation'
import uavTracking from './publications/uav-tracking'
import clusterSensingSuperpixel from './publications/cluster-sensing-superpixel'

import type { Publication } from './publications/types'

// 按年份降序排列
export const publications: Publication[] = [
  pointLadderTuning,
  geometryAdaptivePolyhedron,
  cwcDnerf,
  hapticTwin,
  adaptiveDiffGrids,
  neat,
  neuralAdaptiveSceneTracing,
  shapeReflectanceDiffRendering,
  intratomo,
  reflectionSeparation,
  lightFieldSegmentation,
  uavTracking,
  clusterSensingSuperpixel,
].sort((a, b) => b.year - a.year)

export const publicationStats = {
  total: publications.length,
  byYear: publications.reduce<Record<number, number>>((acc, p) => {
    acc[p.year] = (acc[p.year] || 0) + 1
    return acc
  }, {}),
  byType: {
    journal: publications.filter((p) => p.type === 'journal').length,
    conference: publications.filter((p) => p.type === 'conference').length,
    preprint: publications.filter((p) => p.type === 'preprint').length,
  },
  byLevel: {
    ccfA: publications.filter((p) => p.ccf === 'A').length,
    ccfB: publications.filter((p) => p.ccf === 'B').length,
    ccfC: publications.filter((p) => p.ccf === 'C').length,
    csrankings: publications.filter((p) => p.csrankings).length,
  },
}

// 给定一篇论文，返回其级别标签列表（用于 UI 渲染）
export function pubLevels(p: { ccf?: 'A' | 'B' | 'C'; csrankings?: boolean }) {
  const levels: { kind: 'ccf' | 'csrankings'; label: string }[] = []
  if (p.csrankings) levels.push({ kind: 'csrankings', label: 'CSRankings' })
  if (p.ccf) levels.push({ kind: 'ccf', label: `CCF ${p.ccf}` })
  return levels
}
