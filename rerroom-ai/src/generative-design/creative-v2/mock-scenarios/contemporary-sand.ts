
import type {CreativeScenario} from '../types';
import {mockIntent,MOCK_ROOM} from '../../mock/data';

export const scenario:CreativeScenario={
  id:'contemporary-sand',name:'Contemporary Sand',roomId:MOCK_ROOM.roomId,
  prompt:'Design this room in the contemporary direction using contemporary-sand. Preserve the existing architecture and measurements; use the symmetry layout idea.',
  styles:['contemporary'],palettes:['contemporary-sand'],layoutGoals:['symmetry'],
  revisionPrompts:['Make it warmer','Reduce clutter','Add a stronger focal point','Keep the same layout but try another palette'],
  expectedViews:['2D floor plan','hero 3D view','before/after','palette board']
};
export const seededIntent={...mockIntent,style:{...mockIntent.style,enabled:['contemporary'] as any,primary:'contemporary' as any},colors:{...mockIntent.colors,paletteIds:['contemporary-sand']}};
