import { AestheticIntent } from '../../core/types';
export const JapandiTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Low-visual-noise Japandi concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'japandi',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
