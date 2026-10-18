import { AestheticIntent } from '../../core/types';
export const ModernTraditionalTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Modern traditional concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'modern-traditional',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
