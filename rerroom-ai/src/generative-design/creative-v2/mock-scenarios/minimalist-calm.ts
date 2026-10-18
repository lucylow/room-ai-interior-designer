
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'minimalist-calm',name:'Minimalist Calm',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the minimalist direction using minimal-mist. Preserve the existing architecture and measurements; use the conversation layout idea.',
  styles:['minimalist'],palettes:['minimal-mist'],layoutGoals:['conversation'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['minimalist'] as any,primary:'minimalist' as any},colors:{...mockIntent.colors,paletteIds:['minimal-mist']}};
