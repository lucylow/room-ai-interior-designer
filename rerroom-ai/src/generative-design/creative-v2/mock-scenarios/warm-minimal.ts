
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'warm-minimal',name:'Warm Minimal Retreat',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the warm-minimal direction using warm-white-sand. Preserve the existing architecture and measurements; use the flexible layout idea.',
  styles:['warm-minimal'],palettes:['warm-white-sand'],layoutGoals:['flexible'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['warm-minimal'] as any,primary:'warm-minimal' as any},colors:{...mockIntent.colors,paletteIds:['warm-white-sand']}};
