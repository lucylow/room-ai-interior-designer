
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-02',name:'Minimalist concept case 2',roomId:'demo-room-main',
 prompt:'Create a minimalist concept using graphite-oak palette guidance and a focal-wall layout. Preserve the source architecture.',
 styles:['minimalist'],palettes:['graphite-oak'],layoutGoals:['focal-wall'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.48,paletteSignal:.52,circulation:.58,confidence:.74};
