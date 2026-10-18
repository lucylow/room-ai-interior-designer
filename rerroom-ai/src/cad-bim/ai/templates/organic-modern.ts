import { AestheticIntent } from '../../core/types';
export const OrganicModernTemplate=(overrides:Partial<AestheticIntent>={}):AestheticIntent=>({
  prompt:'Organic modern concept: preserve the existing CAD/BIM geometry and refine only the visual design layer.',
  style:'organic-modern',
  palette:['warm white','natural wood','charcoal'],
  materials:['oak','stone','linen'],
  preserveFeatures:[],
  constraints:['Do not move authoritative walls or openings.','Keep dimensions anchored to source model.'],
  clientPreferences:{},
  ...overrides,
});
