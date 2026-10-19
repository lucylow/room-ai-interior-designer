import { demoScene } from '../demo/scene-factory';
import { GaussianQueryEngine } from '../ai/query-engine';
export interface RegressionCase {id:string;expectedMinHits:number;query:string;}
export const CASES:RegressionCase[]=[{id:'sofa',expectedMinHits:1,query:'sofa'},{id:'wood',expectedMinHits:1,query:'wood'},{id:'window',expectedMinHits:1,query:'window'},{id:'plant',expectedMinHits:1,query:'plant'}];
export function runRegression():{passed:number;failed:number;details:{id:string,actual:number,expected:number}[]} {const engine=new GaussianQueryEngine(demoScene(900).splats);const details=CASES.map(c=>({id:c.id,actual:engine.query({text:c.query,roomId:'room-demo-01',maxResults:20,minConfidence:0}).length,expected:c.expectedMinHits}));const passed=details.filter(d=>d.actual>=d.expected).length;return {passed,failed:details.length-passed,details};}
