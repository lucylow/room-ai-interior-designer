
import type {CreativeScenario} from '../types';
export const creativeCase:CreativeScenario={
 id:'creative-case-05',name:'Japandi concept case 5',roomId:'demo-room-main',
 prompt:'Create a japandi concept using minimal-mist palette guidance and a work-triangle layout. Preserve the source architecture.',
 styles:['japandi'],palettes:['minimal-mist'],layoutGoals:['work-triangle'],
 revisionPrompts:['Try a warmer variant','Try a cleaner variant','Keep the layout but change the palette','Add more texture'],
 expectedViews:['2D plan','3D hero','palette board','before/after']
};
export const mockMetrics={styleSignal:.72,paletteSignal:.73,circulation:.76,confidence:.68};
