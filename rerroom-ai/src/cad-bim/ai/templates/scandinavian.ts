import { AestheticIntent } from '../../core/types';
export const ScandinavianTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Scandinavian concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'scandinavian',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
