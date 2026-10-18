
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-11',name:'Modern concept case 11',roomId:'demo-room-main',
 prompt:'Create a modern concept using japandi-clay palette guidance and a care-zone layout. Preserve the source architecture.',
 styles:['modern'],palettes:['japandi-clay'],layoutGoals:['care-zone'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.72,paletteSignal:.45,circulation:.70,confidence:.80};
