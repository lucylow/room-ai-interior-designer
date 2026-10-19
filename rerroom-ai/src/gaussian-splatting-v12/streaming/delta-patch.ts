export type DeltaOp={index:number;from:number;to:number};
export function diff(prev:number[],next:number[],epsilon=.0001):DeltaOp[]{const n=Math.max(prev.length,next.length);const out:DeltaOp[]=[];for(let i=0;i<n;i++){const a=prev[i]??0,b=next[i]??0;if(Math.abs(a-b)>epsilon)out.push({index:i,from:a,to:b})}return out}
export function apply(base:number[],ops:DeltaOp[]){const out=[...base];for(const op of ops)out[op.index]=op.to;return out}
export function patchRatio(prev:number[],next:number[],epsilon=.0001){return diff(prev,next,epsilon).length/Math.max(1,Math.max(prev.length,next.length))}
