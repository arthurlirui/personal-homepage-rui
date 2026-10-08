import type { Publication } from './types'
import { me } from './types'

// Adaptive differentiable grids for cryo-electron tomography reconstruction and denoising
// 编辑指南：
//   teaser: 论文配图/GIF 动图路径，放在 public/uploads/teasers/ 目录下
//   pdf:    论文 PDF 链接，可填本地路径 '/uploads/papers/xxx.pdf' 或外部链接
//   code:   GitHub 代码仓库链接，如 'https://github.com/arthurlirui/xxx'
//   doi:    DOI 链接
const pub: Publication = {
  id: 'adaptive-diff-grids-cryo-et',
  title: 'Adaptive differentiable grids for cryo-electron tomography reconstruction and denoising',
  authors: ['Y. Wang', 'R. Idoughi', 'D. Rückert', me, 'W. Heidrich'],
  venue: 'Bioinformatics Advances',
  venueShort: 'Bioinform. Adv. 2023',
  year: 2023,
  type: 'journal',
  featured: true,
  ccf: 'C',
  // teaser: '/uploads/teasers/adaptive-diff-grids-cryo-et.gif',
  // pdf: '/uploads/papers/adaptive-diff-grids-cryo-et.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
