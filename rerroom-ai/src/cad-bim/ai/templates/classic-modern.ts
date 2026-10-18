import { AestheticIntent } from '../../core/types';
export const ClassicModernTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Classic modern concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'classic-modern',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
