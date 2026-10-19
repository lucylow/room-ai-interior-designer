export interface WallIntersectionDatasetModuleInput {
  values:number[];
  confidence:number;
  prior:number;
  tags:string[];
}

export interface WallIntersectionDatasetModuleOutput {
  name:"wall_intersection";
  score:number;
  confidence:number;
  severity:"info"|"review"|"block";
  flags:string[];
  metadata:Record<string,string|number|boolean>;
}

const LIMIT=1;

function finiteMean(values:number[]):number {
  const clean=values.filter(Number.isFinite);
  return clean.length ? clean.reduce((a,b)=>a+b,0)/clean.length : 0;
}

function normalize(value:number):number {
  return Math.max(0,Math.min(LIMIT,value));
}

export function runWallIntersectionDatasetModule(input:WallIntersectionDatasetModuleInput):WallIntersectionDatasetModuleOutput {
  const mean=Math.abs(Math.tanh(finiteMean(input.values)));
  const score=normalize(input.confidence*0.60+input.prior*0.20+mean*0.20);
  const severity=score>=0.82?"info":score>=0.55?"review":"block";
  const flags:string[]=score<0.55?["insufficient_evidence"]:[];
  if(input.tags.includes("hard_case")) flags.push("hard_case");
  return {name:"wall_intersection",score,confidence:score,severity,flags,metadata:{module:"wall_intersection",deterministic:true}};
}

export function summarizeWallIntersectionDatasetModule(output:WallIntersectionDatasetModuleOutput):string {
  return `${output.name}: ${output.severity} (${output.score.toFixed(3)})`;
}

export function resetWallIntersectionDatasetModule():WallIntersectionDatasetModuleOutput {
  return {name:"wall_intersection",score:0,confidence:0,severity:"block",flags:["not_initialized"],metadata:{module:"wall_intersection"}};
}
