
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-03',name:'Scandinavian concept case 3',roomId:'demo-room-main',
 prompt:'Create a scandinavian concept using stone-olive palette guidance and a rest-first layout. Preserve the source architecture.',
 styles:['scandinavian'],palettes:['stone-olive'],layoutGoals:['rest-first'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.56,paletteSignal:.59,circulation:.64,confidence:.80};
