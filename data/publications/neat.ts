import type { Publication } from './types'
import { me } from './types'

// NeAT: Neural Adaptive Tomography
const pub: Publication = {
  id: 'neat',
  title: 'NeAT: Neural Adaptive Tomography',
  authors: ['Darius Rückert', 'Yuanhao Wang', me, 'Ramzi Idoughi', 'Wolfgang Heidrich'],
  venue: 'ACM Transactions on Graphics (SIGGRAPH)',
  venueShort: 'SIGGRAPH 2022',
  year: 2022,
  type: 'journal',
  featured: true,
  ccf: 'A',
  csrankings: true,
  abstract:
    'NeAT is a neural adaptive tomography method that reconstructs 3D volumes from sparse and limited-angle CT projections using a learned, adaptive sampling strategy within a differentiable rendering framework.',
  pdf: '/uploads/resume.pdf',
  image: '/avatar.png',
  // teaser: '/uploads/teasers/neat.gif',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
