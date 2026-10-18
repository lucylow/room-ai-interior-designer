import type { Recommendation } from '../core/types';
export interface DependencyNode { id:string; dependsOn:string[]; unlocks:string[]; }
export const buildDependencyGraph = (rows: Recommendation[]): DependencyNode[] => rows.map((row) => {
  const dependsOn:string[]=[]; const unlocks:string[]=[];
  for(const other of rows){
    if(other.id===row.id) continue;
    if(other.category==='layout' && row.category==='shopping') dependsOn.push(other.id);
    if(row.category==='spatial' && other.category==='layout') unlocks.push(other.id);
    if(row.tags.includes('lighting') && other.category==='shopping') dependsOn.push(other.id);
  }
  return {id:row.id,dependsOn:[...new Set(dependsOn)],unlocks:[...new Set(unlocks)]};
});
export const roots = (graph: DependencyNode[]): string[] => graph.filter((n:DependencyNode)=>n.dependsOn.length===0).map((n:DependencyNode)=>n.id);
export const downstream = (graph: DependencyNode[], id:string): string[] => graph.filter((n:DependencyNode)=>n.dependsOn.includes(id)).map((n:DependencyNode)=>n.id);
