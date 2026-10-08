import type { Publication } from './types'
import { me } from './types'

// CWC-DNERF: Compact Dynamic Neural Radiance Field VIA Discrete Wavelet Transform And Learnable Codebooks
const pub: Publication = {
  id: 'cwc-dnerf',
  title: 'CWC-DNERF: Compact Dynamic Neural Radiance Field VIA Discrete Wavelet Transform And Learnable Codebooks',
  authors: ['Yaojian Xu', me + '†', 'Q. Zhang', 'L. Zou', 'Q. Liu', 'Xu Wang'],
  venue: 'IEEE International Conference on Image Processing (ICIP)',
  venueShort: 'ICIP 2025',
  year: 2025,
  type: 'conference',
  featured: true,
  ccf: 'C',
  // teaser: '/uploads/teasers/cwc-dnerf.gif',
  // pdf: '/uploads/papers/cwc-dnerf.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
