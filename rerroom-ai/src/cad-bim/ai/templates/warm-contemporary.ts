import { AestheticIntent } from '../../core/types';
export const WarmContemporaryTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Warm contemporary remodel: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'warm-contemporary',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
