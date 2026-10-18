import type { SpatialScene } from '../core/types';
import { commandLabel, executeCommand, type VisualizationCommand } from './commands';

export interface CommandBatch {
  id: string;
  label: string;
  commands: VisualizationCommand[];
}

export interface BatchResult {
  scene: SpatialScene;
  labels: string[];
  applied: number;
}

export function createBatch(id: string, commands: VisualizationCommand[], label = 'Batch edit'): CommandBatch {
  return { id, commands: [...commands], label };
}

export function executeBatch(scene: SpatialScene, batch: CommandBatch): BatchResult {
  let current=scene;
  const labels:string[]=[];
  let applied=0;
  for(const command of batch.commands){
    const next=executeCommand(current,command);
    if(next !== current){
      current=next;
      applied+=1;
      labels.push(commandLabel(command));
    }
  }
  return {scene:current,labels,applied};
}

export function compactBatch(commands: VisualizationCommand[]): VisualizationCommand[] {
  const lastByObject=new Map<string,VisualizationCommand>();
  const passthrough:VisualizationCommand[]=[];
  for(const command of commands){
    if('objectId' in command && command.type !== 'remove'){
      lastByObject.set(command.objectId,command);
    } else {
      passthrough.push(command);
    }
  }
  return [...passthrough,...lastByObject.values()];
}
