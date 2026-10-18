import { AestheticIntent } from '../../core/types';
export const MinimalistTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Minimalist concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'minimalist',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
