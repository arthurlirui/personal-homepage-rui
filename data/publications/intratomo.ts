import type { Publication } from './types'
import { me } from './types'

// IntraTomo: Self-supervised Learning-based Tomography via Sinogram Synthesis and Prediction
const pub: Publication = {
  id: 'intratomo',
  title: 'IntraTomo: Self-supervised Learning-based Tomography via Sinogram Synthesis and Prediction',
  authors: ['Guangming Zang', 'Ramzi Idoughi', me, 'Peter Wonka', 'Wolfgang Heidrich'],
  venue: 'International Conference on Computer Vision (ICCV)',
  venueShort: 'ICCV 2021',
  year: 2021,
  type: 'conference',
  featured: true,
  ccf: 'A',
  csrankings: true,
  abstract:
    'Combines learning-based and model-based approaches for ill-posed CT inverse problems. Two modules: sinogram prediction (density field as continuous differentiable NN function, self-supervised from incomplete/degraded sinogram) and geometry refinement (local & non-local geometrical priors), applied iteratively. Outperforms on limited-angle tomography (45°), sparse view (as few as 8 views), super-resolution (8×).',
  // teaser: '/uploads/teasers/intratomo.gif',
  // pdf: '/uploads/papers/intratomo.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
