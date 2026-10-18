
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-09',name:'Contemporary concept case 9',roomId:'demo-room-main',
 prompt:'Create a contemporary concept using brick-sand palette guidance and a wet-dry layout. Preserve the source architecture.',
 styles:['contemporary'],palettes:['brick-sand'],layoutGoals:['wet-dry'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.56,paletteSignal:.66,circulation:.58,confidence:.68};
