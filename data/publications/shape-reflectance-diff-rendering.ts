import type { Publication } from './types'
import { me } from './types'

// Shape and Reflectance Reconstruction in Uncontrolled Environments by Differentiable Rendering
const pub: Publication = {
  id: 'shape-reflectance-diff-rendering',
  title: 'Shape and Reflectance Reconstruction in Uncontrolled Environments by Differentiable Rendering',
  authors: [me + '*', 'Guangmin Zang', 'Miao Qi', 'Wolfgang Heidrich'],
  venue: 'arXiv:2110.12975',
  venueShort: 'Preprint 2022',
  year: 2022,
  type: 'preprint',
  featured: true,
  doi: 'https://arxiv.org/abs/2110.12975',
  abstract:
    'Simultaneous reconstruction of geometry and reflectance in uncontrolled environments from multi-view photography using hand-held cameras. Builds a virtual scene in a differentiable rendering system, optimized by alternating and stochastic photometric objectives, generating photo-realistic novel views. Superior to SOTA in novel view synthesis.',
  // teaser: '/uploads/teasers/shape-reflectance-diff-rendering.gif',
  // pdf: '/uploads/papers/shape-reflectance-diff-rendering.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
