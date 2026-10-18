
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'boho-layered',name:'Bohemian Layered',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the bohemian direction using boho-rust. Preserve the existing architecture and measurements; use the gallery layout idea.',
  styles:['bohemian'],palettes:['boho-rust'],layoutGoals:['gallery'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['bohemian'] as any,primary:'bohemian' as any},colors:{...mockIntent.colors,paletteIds:['boho-rust']}};
