
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-13',name:'Scandinavian concept case 13',roomId:'demo-room-main',
 prompt:'Create a scandinavian concept using midcentury-olive palette guidance and a conversation layout. Preserve the source architecture.',
 styles:['scandinavian'],palettes:['midcentury-olive'],layoutGoals:['conversation'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.40,paletteSignal:.59,circulation:.82,confidence:.68};
