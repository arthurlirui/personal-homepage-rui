import type { Publication } from './types'
import { me } from './types'

// Cluster Sensing Superpixel and Grouping
const pub: Publication = {
  id: 'cluster-sensing-superpixel',
  title: 'Cluster Sensing Superpixel and Grouping',
  authors: [me + '*', 'Lu Fang'],
  venue: 'CVPR Workshop',
  venueShort: 'CVPRW 2016',
  year: 2016,
  type: 'conference',
  featured: true,
  abstract:
    'Cluster Sensing Superpixel (CSS) method. Cluster centers have representativeness (local max pixel density) and isolation; CSS identifies centers via pixel density. Integrates superpixel cues into a bipartite graph segmentation framework, applied to microscopy image segmentation. ~5× faster than SOTA with comparable performance.',
  // teaser: '/uploads/teasers/cluster-sensing-superpixel.gif',
  // pdf: '/uploads/papers/cluster-sensing-superpixel.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
