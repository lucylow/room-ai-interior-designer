
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'organic-stone',name:'Organic Modern Stone',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the organic-modern direction using travertine-ink. Preserve the existing architecture and measurements; use the open-flow layout idea.',
  styles:['organic-modern'],palettes:['travertine-ink'],layoutGoals:['open-flow'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['organic-modern'] as any,primary:'organic-modern' as any},colors:{...mockIntent.colors,paletteIds:['travertine-ink']}};
