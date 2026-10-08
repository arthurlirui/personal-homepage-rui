import type { Publication } from './types'
import { me } from './types'

// Hierarchical and View-invariant Light Field Segmentation by Maximizing Entropy Rate on 4D Ray Graphs
const pub: Publication = {
  id: 'light-field-segmentation',
  title: 'Hierarchical and View-invariant Light Field Segmentation by Maximizing Entropy Rate on 4D Ray Graphs',
  authors: [me + '*', 'Wolfgang Heidrich'],
  venue: 'ACM Transactions on Graphics (SIGGRAPH Asia)',
  venueShort: 'SIGGRAPH Asia 2019',
  year: 2019,
  type: 'journal',
  featured: true,
  ccf: 'A',
  csrankings: true,
  doi: 'https://doi.org/10.1145/3355089.3356521',
  abstract:
    'A new light field segmentation method respecting texture appearance, depth consistency, and occlusion. Creates well-shaped segments robust to viewpoint changes; hierarchical — a single optimization yields a whole hierarchy of segmentations. Uses a submodular objective function optimized greedily; introduces a "disjoint tree" data structure for efficient submodular optimization on very large graphs.',
  // teaser: '/uploads/teasers/light-field-segmentation.gif',
  // pdf: '/uploads/papers/light-field-segmentation.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
