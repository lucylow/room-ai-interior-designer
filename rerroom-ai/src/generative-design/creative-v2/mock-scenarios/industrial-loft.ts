
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'industrial-loft',name:'Industrial Loft',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the industrial direction using industrial-charcoal. Preserve the existing architecture and measurements; use the open-flow layout idea.',
  styles:['industrial'],palettes:['industrial-charcoal'],layoutGoals:['open-flow'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['industrial'] as any,primary:'industrial' as any},colors:{...mockIntent.colors,paletteIds:['industrial-charcoal']}};
