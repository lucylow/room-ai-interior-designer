
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'japandi-quiet',name:'Japandi Quiet',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the japandi direction using japandi-clay. Preserve the existing architecture and measurements; use the reading-nook layout idea.',
  styles:['japandi'],palettes:['japandi-clay'],layoutGoals:['reading-nook'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['japandi'] as any,primary:'japandi' as any},colors:{...mockIntent.colors,paletteIds:['japandi-clay']}};
