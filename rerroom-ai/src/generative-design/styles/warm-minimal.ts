import type {StyleProfile,DesignStyleId} from '../core/types';

export const warm_minimalStyle:StyleProfile={
  id:'warm-minimal' as DesignStyleId, name:'Warm Minimal', summary:'Minimal structure with warm tactile materials, soft contrast and cozy layered lighting.',
  keywords:['warm minimal', 'cozy', 'calm', 'tactile', 'soft modern'], avoidKeywords:['clinical', 'cold gray', 'visual clutter'], materials:['oak', 'linen', 'wool', 'plaster', 'brushed brass'],
  furnitureShapes:['soft rectangle', 'rounded edge', 'low profile'], lightingTerms:['cove light', 'warm table lamp', 'wall wash'], architecturalTerms:['plaster wall', 'simple trim', 'integrated millwork'], decorTerms:['ceramics', 'books', 'soft art'],
  paletteFamilies:['warm-white-sand', 'sand-olive', 'terracotta-cream'], preferredLayoutPatterns:['conversation', 'reading-nook', 'open-flow'], textureLevel:0.68, ornamentLevel:0.26,
  contrastLevel:0.38, warmth:0.86, softness:0.9, geometryTolerance:.08,
  imagePromptPrefix:'warm minimal interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'clinical', 'cold gray', 'visual clutter']
};
