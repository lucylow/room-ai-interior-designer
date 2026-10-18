
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-14',name:'Industrial concept case 14',roomId:'demo-room-main',
 prompt:'Create a industrial concept using terracotta-cream palette guidance and a focal-wall layout. Preserve the source architecture.',
 styles:['industrial'],palettes:['terracotta-cream'],layoutGoals:['focal-wall'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.48,paletteSignal:.66,circulation:.88,confidence:.74};
