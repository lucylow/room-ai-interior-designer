
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-06',name:'Mid Century concept case 6',roomId:'demo-room-main',
 prompt:'Create a mid century concept using nordic-sage palette guidance and a social-island layout. Preserve the source architecture.',
 styles:['mid-century'],palettes:['nordic-sage'],layoutGoals:['social-island'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.80,paletteSignal:.45,circulation:.82,confidence:.74};
