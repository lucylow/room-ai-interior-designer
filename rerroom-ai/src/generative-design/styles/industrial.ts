import type {StyleProfile,DesignStyleId} from '../core/types';

export const industrialStyle:StyleProfile={
  id:'industrial' as DesignStyleId, name:'Industrial', summary:'Urban material honesty balancing metal, timber, concrete texture and utilitarian forms.',
  keywords:['industrial', 'raw', 'steel', 'concrete', 'workshop'], avoidKeywords:['overly ornate', 'pastel overload', 'precious detailing'], materials:['steel', 'oak', 'concrete', 'leather', 'brick'],
  furnitureShapes:['steel frame', 'modular', 'utility shelving', 'track'], lightingTerms:['track lighting', 'pendant cluster', 'task lamp'], architecturalTerms:['exposed texture', 'black framing', 'open services'], decorTerms:['vintage print', 'workshop object', 'leather accent'],
  paletteFamilies:['industrial-charcoal', 'brick-sand', 'graphite-olive'], preferredLayoutPatterns:['focal-wall', 'open-flow', 'flexible'], textureLevel:0.82, ornamentLevel:0.34,
  contrastLevel:0.8, warmth:0.42, softness:0.3, geometryTolerance:.08,
  imagePromptPrefix:'industrial interior design, photorealistic architectural visualization',
  negativePrompt:['warped geometry', 'duplicate furniture', 'floating objects', 'blocked doors', 'changed windows', 'unrealistic scale', 'overly ornate', 'pastel overload', 'precious detailing']
};
