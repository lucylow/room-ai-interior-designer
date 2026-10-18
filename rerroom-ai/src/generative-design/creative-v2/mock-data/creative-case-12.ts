
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-12',name:'Minimalist concept case 12',roomId:'demo-room-main',
 prompt:'Create a minimalist concept using moss-stone palette guidance and a flex-grid layout. Preserve the source architecture.',
 styles:['minimalist'],palettes:['moss-stone'],layoutGoals:['flex-grid'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.80,paletteSignal:.52,circulation:.76,confidence:.86};
