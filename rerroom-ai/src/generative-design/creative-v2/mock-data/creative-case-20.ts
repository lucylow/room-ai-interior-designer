
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-20',name:'Warm Minimal concept case 20',roomId:'demo-room-main',
 prompt:'Create a warm minimal concept using contemporary-sand palette guidance and a focus-zone layout. Preserve the source architecture.',
 styles:['warm-minimal'],palettes:['contemporary-sand'],layoutGoals:['focus-zone'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.48,paletteSignal:.73,circulation:.82,confidence:.86};
