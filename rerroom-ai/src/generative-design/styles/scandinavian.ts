import type {StyleProfile,DesignStyleId} from '../core/types';

export const scandinavianStyle:StyleProfile={
  id:'scandinavian' as DesignStyleId, name:'Scandinavian', summary:'Light, warm and functional design with pale wood, soft textiles and natural daylight.',
  keywords:['hygge', 'light wood', 'cozy', 'natural', 'functional'], avoidKeywords:['heavy ornament', 'dark clutter', 'glossy excess'], materials:['oak', 'birch', 'wool', 'linen', 'paper cord'],
  furnitureShapes:['rounded wood', 'tapered leg', 'soft rectangle'], lightingTerms:['paper pendant', 'warm floor lamp', 'daylight'], architecturalTerms:['white walls', 'light timber', 'simple casing'], decorTerms:['plants', 'woven baskets', 'soft art'],
  paletteFamilies:['nordic-sage', 'warm-white-sand', 'sky-oak'], preferredLayoutPatterns:['conversation', 'open-flow', 'reading-nook'], textureLevel:0.58, ornamentLevel:0.28,
  contrastLevel:0.44, warmth:0.76, softness:0.82, geometryTolerance:.08,
  imagePromptPrefix:'scandinavian interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'heavy ornament', 'dark clutter', 'glossy excess']
};
