import type {StyleProfile,DesignStyleId} from '../core/types';

export const organic_modernStyle:StyleProfile={
  id:'organic-modern' as DesignStyleId, name:'Organic Modern', summary:'Contemporary forms softened by natural materials, curved profiles, stone and warm earthy tones.',
  keywords:['organic modern', 'curved', 'natural', 'quiet luxury', 'earthy'], avoidKeywords:['harsh contrast', 'ornate clutter', 'cheap gloss'], materials:['oak', 'travertine', 'linen', 'boucle', 'aged brass'],
  furnitureShapes:['curved sofa', 'pedestal', 'rounded table', 'arched'], lightingTerms:['sculptural pendant', 'wall wash', 'warm cove'], architecturalTerms:['arched niche', 'stone plane', 'soft reveals'], decorTerms:['large branch', 'stone object', 'textural art'],
  paletteFamilies:['sand-olive', 'travertine-ink', 'japandi-clay'], preferredLayoutPatterns:['asymmetry', 'conversation', 'focal-wall'], textureLevel:0.72, ornamentLevel:0.4,
  contrastLevel:0.48, warmth:0.8, softness:0.88, geometryTolerance:.08,
  imagePromptPrefix:'organic modern interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'harsh contrast', 'ornate clutter', 'cheap gloss']
};
