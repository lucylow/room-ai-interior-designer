export interface UtilityResult { score:number; warnings:string[]; values:Array<Record<string,string|number>>; }
export class PathSegmentReader {
  run(input:string):UtilityResult {
    const warnings:string[]=[]; const values:Array<Record<string,string|number>>=[];
    const lines=input.split(/\r?\n/).filter(Boolean);
    for(let i=0;i<Math.min(lines.length,40);i++) values.push({index:i,length:lines[i].length,kind:'source'});
    const score=lines.length?Math.min(1,.5+Math.min(.5,lines.length/200)):0;
    if(!lines.length) warnings.push('Input contained no readable lines.');
    return {score,warnings,values};
  }
}
