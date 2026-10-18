import type {StyleProfile,DesignStyleId} from '../core/types';

export const modernStyle:StyleProfile={
  id:'modern' as DesignStyleId, name:'Modern', summary:'Crisp contemporary interiors with restrained detailing and strong proportion.',
  keywords:['clean lines', 'architectural', 'sleek', 'tonal', 'refined'], avoidKeywords:['ornate', 'fussy', 'shabby'], materials:['oak', 'walnut', 'steel', 'glass', 'stone'],
  furnitureShapes:['low profile', 'rectilinear', 'slab-front', 'monolithic'], lightingTerms:['linear light', 'layered ambient', 'architectural sconces'], architecturalTerms:['flush details', 'large openings', 'simple trim'], decorTerms:['sculptural objects', 'abstract art', 'structured textiles'],
  paletteFamilies:['modern-neutral', 'graphite-oak', 'stone-olive'], preferredLayoutPatterns:['open-flow', 'focal-wall', 'asymmetry'], textureLevel:0.35, ornamentLevel:0.2,
  contrastLevel:0.72, warmth:0.5, softness:0.45, geometryTolerance:.08,
  imagePromptPrefix:'modern interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'ornate', 'fussy', 'shabby']
};
