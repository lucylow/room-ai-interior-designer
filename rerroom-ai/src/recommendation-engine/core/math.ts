export const clamp=(value:number,min=0,max=1):number=>Math.min(max,Math.max(min,value));
export const safeDiv=(a:number,b:number,fallback=0):number=>Math.abs(b)<1e-9?fallback:a/b;
export const mean=(xs:number[]):number=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:0;
export const weightedMean=(pairs:Array<{value:number;weight:number}>):number=>{
  const total=pairs.reduce((s,p)=>s+p.weight,0); return total?safeDiv(pairs.reduce((s,p)=>s+p.value*p.weight,0),total):0;
};
export const variance=(xs:number[]):number=>{ const m=mean(xs); return mean(xs.map(x=>(x-m)**2)); };
export const std=(xs:number[]):number=>Math.sqrt(variance(xs));
export const sigmoid=(x:number):number=>1/(1+Math.exp(-Math.max(-30,Math.min(30,x))));
export const softmax=(xs:number[],temperature=1):number[]=>{
  const t=Math.max(.05,temperature), m=Math.max(...xs); const ex=xs.map(x=>Math.exp((x-m)/t)); const z=ex.reduce((a,b)=>a+b,0); return ex.map(v=>v/z);
};
export const lerp=(a:number,b:number,t:number):number=>a+(b-a)*clamp(t);
export const round=(x:number,d=2):number=>{const k=10**d; return Math.round(x*k)/k;};
export const percentile=(xs:number[],p:number):number=>{if(!xs.length)return 0;const s=[...xs].sort((a,b)=>a-b);const i=(s.length-1)*clamp(p);const lo=Math.floor(i);const hi=Math.ceil(i);return s[lo]+(s[hi]-s[lo])*(i-lo);};
export const entropy=(probs:number[]):number=>-probs.filter(p=>p>0).reduce((s,p)=>s+p*Math.log2(p),0);
export const normalize=(value:number,min:number,max:number):number=>safeDiv(value-min,max-min,.5);
