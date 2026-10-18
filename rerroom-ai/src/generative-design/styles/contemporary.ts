import type {StyleProfile,DesignStyleId} from '../core/types';

export const contemporaryStyle:StyleProfile={
  id:'contemporary' as DesignStyleId, name:'Contemporary', summary:'Current, flexible design language balancing clean structure with selective statement pieces.',
  keywords:['contemporary', 'current', 'layered', 'refined', 'flexible'], avoidKeywords:['period-pure', 'heavy ornament'], materials:['oak', 'stone', 'metal', 'linen', 'glass'],
  furnitureShapes:['mixed curves', 'clean slab', 'soft geometry'], lightingTerms:['layered lighting', 'statement pendant', 'wall wash'], architecturalTerms:['simple trim', 'large art wall', 'integrated storage'], decorTerms:['statement art', 'books', 'sculptural object'],
  paletteFamilies:['contemporary-sand', 'graphite-oak', 'ink-sage'], preferredLayoutPatterns:['conversation', 'open-flow', 'focal-wall'], textureLevel:0.55, ornamentLevel:0.38,
  contrastLevel:0.62, warmth:0.58, softness:0.62, geometryTolerance:.08,
  imagePromptPrefix:'contemporary interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'period-pure', 'heavy ornament']
};
