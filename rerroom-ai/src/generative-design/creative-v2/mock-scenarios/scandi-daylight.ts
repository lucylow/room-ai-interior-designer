
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'scandi-daylight',name:'Scandinavian Daylight',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the scandinavian direction using nordic-sage. Preserve the existing architecture and measurements; use the conversation layout idea.',
  styles:['scandinavian'],palettes:['nordic-sage'],layoutGoals:['conversation'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['scandinavian'] as any,primary:'scandinavian' as any},colors:{...mockIntent.colors,paletteIds:['nordic-sage']}};
