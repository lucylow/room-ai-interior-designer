
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-15',name:'Japandi concept case 15',roomId:'demo-room-main',
 prompt:'Create a japandi concept using walnut-ink palette guidance and a rest-first layout. Preserve the source architecture.',
 styles:['japandi'],palettes:['walnut-ink'],layoutGoals:['rest-first'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.56,paletteSignal:.73,circulation:.52,confidence:.80};
