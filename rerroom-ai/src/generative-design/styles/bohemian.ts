import type {StyleProfile,DesignStyleId} from '../core/types';

export const bohemianStyle:StyleProfile={
  id:'bohemian' as DesignStyleId, name:'Bohemian', summary:'Layered, collected and expressive composition using natural textiles, pattern and artisanal objects.',
  keywords:['bohemian', 'layered', 'artisan', 'pattern', 'collected'], avoidKeywords:['sterile', 'empty', 'overly corporate'], materials:['rattan', 'linen', 'jute', 'wood', 'ceramic'],
  furnitureShapes:['low seating', 'woven', 'organic', 'mixed scale'], lightingTerms:['lantern', 'string light', 'warm floor lamp'], architecturalTerms:['plaster texture', 'arched detail', 'natural wood'], decorTerms:['textiles', 'plants', 'handmade objects', 'gallery wall'],
  paletteFamilies:['boho-rust', 'clay-sage', 'sand-indigo'], preferredLayoutPatterns:['conversation', 'gallery', 'flexible'], textureLevel:0.9, ornamentLevel:0.78,
  contrastLevel:0.65, warmth:0.88, softness:0.77, geometryTolerance:.08,
  imagePromptPrefix:'bohemian interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'sterile', 'empty', 'overly corporate']
};
