import type {RoomContext,Scenario} from '../core/types';
import {simulate} from '../engine/simulation';

export interface BeamNode {
  scenario: Scenario;
  score: number;
  valid: boolean;
  depth: number;
  notes: string[];
}

export interface BeamOptions {
  width: number;
  depth: number;
  step: number;
  targets: string[];
}

const expand = (room: RoomContext, node: BeamNode, targets: string[], step: number): BeamNode[] => {
  return targets.flatMap((id) => [-step, 0, step].map((dx) => {
    const delta = {objectId:id, moveX:dx};
    const scenario: Scenario = {
      id: `${node.scenario.id}-${id}-${dx}`,
      name: `${node.scenario.name} ${id}`,
      description: 'Spatial beam-search candidate',
      deltas: [...node.scenario.deltas, delta],
      expectedOutcome: 'Improve the room objective'
    };
    const result = simulate(room, scenario);
    const score = result.circulation + (result.valid ? 15 : 0) - result.overlap;
    return {scenario, score, valid:result.valid, depth:node.depth+1, notes:result.notes};
  }));
};

export const search = (room: RoomContext, options: BeamOptions): BeamNode => {
  let beam: BeamNode[] = [{
    scenario:{id:'root',name:'Current room',description:'Baseline',deltas:[],expectedOutcome:'baseline'},
    score:room.circulationScore,
    valid:true,
    depth:0,
    notes:[]
  }];
  for(let depth=0; depth<options.depth; depth++){
    const children = beam
      .flatMap((node) => expand(room,node,options.targets,options.step))
      .sort((a,b)=>b.score-a.score);
    beam = children.slice(0,options.width);
  }
  return beam[0] ?? {scenario:{id:'empty',name:'No plan',description:'No candidate',deltas:[],expectedOutcome:'none'},score:0,valid:false,depth:0,notes:['No beam candidate produced']};
};
