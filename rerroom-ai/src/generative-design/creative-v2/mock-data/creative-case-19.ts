
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-19',name:'Contemporary concept case 19',roomId:'demo-room-main',
 prompt:'Create a contemporary concept using travertine-ink palette guidance and a centered-table layout. Preserve the source architecture.',
 styles:['contemporary'],palettes:['travertine-ink'],layoutGoals:['centered-table'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.40,paletteSignal:.66,circulation:.76,confidence:.80};
