
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-01',name:'Modern concept case 1',roomId:'demo-room-main',
 prompt:'Create a modern concept using modern-neutral palette guidance and a conversation layout. Preserve the source architecture.',
 styles:['modern'],palettes:['modern-neutral'],layoutGoals:['conversation'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.40,paletteSignal:.45,circulation:.52,confidence:.68};
