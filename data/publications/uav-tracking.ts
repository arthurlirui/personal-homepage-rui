import type { Publication } from './types'
import { me } from './types'

// Monocular Long-term Target Following on UAVs
const pub: Publication = {
  id: 'uav-tracking',
  title: 'Monocular Long-term Target Following on UAVs',
  authors: [me + '*', 'Minjian Pang', 'Cong Zhao', 'Guyue Zhou', 'Lu Fang'],
  venue: 'CVPR Workshop on Embedded Vision',
  venueShort: 'CVPRW 2016',
  year: 2016,
  type: 'conference',
  featured: true,
  doi: 'https://10.1109/CVPRW.2016.11',
  abstract:
    'Long-term visual tracking on UAVs. Exploits correlation between a frequency tracker and a spatial detector; novel FAST algorithm. Robustness (frequency tracker → spatial detector covers temporal variance/invariance) plus efficiency (coarse-to-fine redetection, no extra classifier / exhaustive search). Implemented on a quadrotor for indoor/outdoor real-time automatic smooth long-term target following.',
  // teaser: '/uploads/teasers/uav-tracking.gif',
  // pdf: '/uploads/papers/uav-tracking.pdf',
  // code: 'https://github.com/arthurlirui/xxx',
}

export default pub
