export interface StepEntity { expressId:number; keyword:string; args:string; raw:string; }
export function tokenizeStep(text:string):StepEntity[]{
  const out:StepEntity[]=[]; const re=/#(\d+)\s*=\s*([A-Z0-9_]+)\s*\(([^;]*?)\)\s*;/g; let m:RegExpExecArray|null;
  while((m=re.exec(text))){out.push({expressId:Number(m[1]),keyword:m[2],args:m[3],raw:m[0]});}
  return out;
}
export function parseStepRefs(args:string):number[]{ const out:number[]=[]; for(const m of args.matchAll(/#(\d+)/g)) out.push(Number(m[1])); return [...new Set(out)]; }
