import type {StyleProfile,DesignStyleId} from '../core/types';

export const minimalistStyle:StyleProfile={
  id:'minimalist' as DesignStyleId, name:'Minimalist', summary:'Calm, edited composition with generous negative space and few high-quality objects.',
  keywords:['quiet', 'minimal', 'edited', 'airy', 'monochrome'], avoidKeywords:['clutter', 'ornate', 'busy'], materials:['ash', 'oak', 'microcement', 'linen', 'matte metal'],
  furnitureShapes:['simple block', 'thin frame', 'floating shelf', 'soft rectangle'], lightingTerms:['diffused daylight', 'concealed light', 'soft wall wash'], architecturalTerms:['flush doors', 'clean reveals', 'minimal trim'], decorTerms:['single artwork', 'ceramic accent', 'textured throw'],
  paletteFamilies:['warm-white-sand', 'minimal-mist', 'stone-olive'], preferredLayoutPatterns:['open-flow', 'symmetry', 'gallery'], textureLevel:0.3, ornamentLevel:0.12,
  contrastLevel:0.42, warmth:0.62, softness:0.72, geometryTolerance:.08,
  imagePromptPrefix:'minimalist interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'clutter', 'ornate', 'busy']
};
