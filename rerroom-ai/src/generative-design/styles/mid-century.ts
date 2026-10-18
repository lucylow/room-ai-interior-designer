import type {StyleProfile,DesignStyleId} from '../core/types';

export const mid_centuryStyle:StyleProfile={
  id:'mid-century' as DesignStyleId, name:'Mid Century', summary:'Warm modernism with expressive wood, tapered forms and carefully placed color accents.',
  keywords:['mid-century', 'walnut', 'tapered', 'retro-modern', 'graphic'], avoidKeywords:['ornate', 'ultra-minimal', 'industrial rawness'], materials:['walnut', 'teak', 'brass', 'wool', 'leather'],
  furnitureShapes:['tapered leg', 'curved shell', 'credenced'], lightingTerms:['starburst pendant', 'arc lamp', 'globe lamp'], architecturalTerms:['wood slat', 'simple casing', 'warm panel'], decorTerms:['graphic art', 'sculptural vase', 'record console'],
  paletteFamilies:['midcentury-olive', 'terracotta-cream', 'walnut-ink'], preferredLayoutPatterns:['conversation', 'symmetry', 'gallery'], textureLevel:0.5, ornamentLevel:0.46,
  contrastLevel:0.7, warmth:0.72, softness:0.55, geometryTolerance:.08,
  imagePromptPrefix:'mid century interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'ornate', 'ultra-minimal', 'industrial rawness']
};
