import type { Publication } from './types'
import { me } from './types'

// Neural Adaptive Scene Tracing
const pub: Publication = {
  id: 'neural-adaptive-scene-tracing',
  title: 'Neural Adaptive Scene Tracing',
  authors: [me + '*', 'Darius Rückert', 'Yuanhao Wang', 'Ramzi Idoughi', 'Wolfgang Heidrich'],
  venue: 'Symposium on Vision, Modeling, and Visualization (VMV)',
  venueShort: 'VMV 2022',
  year: 2022,
  type: 'conference',
  featured: true,
  ccf: 'C',
  // teaser: '/uploads/teasers/neural-adaptive-scene-tracing.gif',
  // pdf: '/uploads/papers/neural-adaptive-scene-tracing.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
