
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'midcentury-warm',name:'Mid-century Warm',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the mid-century direction using midcentury-olive. Preserve the existing architecture and measurements; use the conversation layout idea.',
  styles:['mid-century'],palettes:['midcentury-olive'],layoutGoals:['conversation'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['mid-century'] as any,primary:'mid-century' as any},colors:{...mockIntent.colors,paletteIds:['midcentury-olive']}};
