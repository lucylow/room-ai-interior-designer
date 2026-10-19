export function clamp(v:number,a=0,b=1){return Math.max(a,Math.min(b,v));}
export function lerp(a:number,b:number,t:number){return a+(b-a)*clamp(t);}
export function mean(v:number[]){return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;}
export function median(v:number[]){if(!v.length)return 0;const a=[...v].sort((x,y)=>x-y);const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2;}
export function percentile(v:number[],p:number){if(!v.length)return 0;const a=[...v].sort((x,y)=>x-y);const i=(a.length-1)*clamp(p,0,1);const lo=Math.floor(i),hi=Math.ceil(i);return lo===hi?a[lo]:a[lo]+(a[hi]-a[lo])*(i-lo);}
export function distance(a:{x:number;y:number;z?:number},b:{x:number;y:number;z?:number}){return Math.hypot(a.x-b.x,a.y-b.y,(a.z??0)-(b.z??0));}
export function hashSeed(seed:number,text:string){let h=seed|0;for(let i=0;i<text.length;i++)h=(h*31+text.charCodeAt(i))|0;return Math.abs(h);}
