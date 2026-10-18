
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-04',name:'Industrial concept case 4',roomId:'demo-room-main',
 prompt:'Create a industrial concept using warm-white-sand palette guidance and a storage-edge layout. Preserve the source architecture.',
 styles:['industrial'],palettes:['warm-white-sand'],layoutGoals:['storage-edge'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.64,paletteSignal:.66,circulation:.70,confidence:.86};
