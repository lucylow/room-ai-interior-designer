
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-08',name:'Organic Modern concept case 8',roomId:'demo-room-main',
 prompt:'Create a organic modern concept using industrial-charcoal palette guidance and a focus-zone layout. Preserve the source architecture.',
 styles:['organic-modern'],palettes:['industrial-charcoal'],layoutGoals:['focus-zone'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.48,paletteSignal:.59,circulation:.52,confidence:.86};
