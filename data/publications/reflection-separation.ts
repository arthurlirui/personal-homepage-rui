import type { Publication } from './types'
import { me } from './types'

// Reflection Separation via Multi-bounce Polarization State Tracing
const pub: Publication = {
  id: 'reflection-separation',
  title: 'Reflection Separation via Multi-bounce Polarization State Tracing',
  authors: [me + '*', 'Simeng Qiu*', 'Guangming Zang', 'Wolfgang Heidrich'],
  venue: 'European Conference on Computer Vision (ECCV)',
  venueShort: 'ECCV 2020',
  year: 2020,
  type: 'conference',
  featured: true,
  ccf: 'B',
  csrankings: true,
  doi: 'https://doi.org/10.1007/978-3-030-58601-0_46',
  abstract:
    'Generalizes reflection removal to real-world complex light interactions. Learning framework for supervised reflection separation with a polarization-guided ray-tracing model. Uses a polarization sensor capturing 4 linearly polarized photos simultaneously. A new polarization-guided image formation model plus supervised learning for the ray-tracing model yields unprecedented reconstruction quality on real and synthetic data. († equal contribution)',
  // teaser: '/uploads/teasers/reflection-separation.gif',
  // pdf: '/uploads/papers/reflection-separation.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
