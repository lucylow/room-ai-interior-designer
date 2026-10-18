import type {StyleProfile,DesignStyleId} from '../core/types';

export const japandiStyle:StyleProfile={
  id:'japandi' as DesignStyleId, name:'Japandi', summary:'Balanced Japanese restraint and Scandinavian warmth with natural textures and quiet asymmetry.',
  keywords:['japandi', 'wabi', 'calm', 'oak', 'organic'], avoidKeywords:['visual noise', 'high gloss', 'ornate'], materials:['oak', 'ash', 'linen', 'ceramic', 'rattan'],
  furnitureShapes:['low profile', 'rounded edge', 'organic block'], lightingTerms:['lantern', 'soft wash', 'paper pendant'], architecturalTerms:['flush timber', 'quiet walls', 'simple openings'], decorTerms:['branch arrangement', 'ceramic vessel', 'textured art'],
  paletteFamilies:['japandi-clay', 'warm-white-sand', 'moss-stone'], preferredLayoutPatterns:['asymmetry', 'reading-nook', 'open-flow'], textureLevel:0.64, ornamentLevel:0.22,
  contrastLevel:0.38, warmth:0.7, softness:0.78, geometryTolerance:.08,
  imagePromptPrefix:'japandi interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'visual noise', 'high gloss', 'ornate']
};
