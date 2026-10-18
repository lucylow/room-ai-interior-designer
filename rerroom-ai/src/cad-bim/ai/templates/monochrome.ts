import { AestheticIntent } from '../../core/types';
export const MonochromeTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Monochrome concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'monochrome',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
