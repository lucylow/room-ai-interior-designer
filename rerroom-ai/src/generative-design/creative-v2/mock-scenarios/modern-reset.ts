
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'modern-reset',name:'Modern Reset',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the modern direction using modern-neutral. Preserve the existing architecture and measurements; use the focal-wall layout idea.',
  styles:['modern'],palettes:['modern-neutral'],layoutGoals:['focal-wall'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['modern'] as any,primary:'modern' as any},colors:{...mockIntent.colors,paletteIds:['modern-neutral']}};
