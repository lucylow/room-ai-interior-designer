
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-10',name:'Warm Minimal concept case 10',roomId:'demo-room-main',
 prompt:'Create a warm minimal concept using graphite-olive palette guidance and a arrival-zone layout. Preserve the source architecture.',
 styles:['warm-minimal'],palettes:['graphite-olive'],layoutGoals:['arrival-zone'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.64,paletteSignal:.73,circulation:.64,confidence:.74};
