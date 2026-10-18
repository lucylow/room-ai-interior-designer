
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-07',name:'Bohemian concept case 7',roomId:'demo-room-main',
 prompt:'Create a bohemian concept using sky-oak palette guidance and a centered-table layout. Preserve the source architecture.',
 styles:['bohemian'],palettes:['sky-oak'],layoutGoals:['centered-table'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.40,paletteSignal:.52,circulation:.88,confidence:.80};
