export const normalizeToken=(s:string):string=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export const tokens=(s:string):string[]=>normalizeToken(s).split(/\s+/).filter(Boolean);
export const overlap=(a:string[],b:string[]):number=>{const A=new Set(a.map(normalizeToken));const B=new Set(b.map(normalizeToken));if(!A.size&&!B.size)return 1;let hit=0;for(const x of A)if(B.has(x))hit++;return hit/Math.max(1,new Set([...A,...B]).size);};
export const includesAny=(text:string, needles:string[]):boolean=>needles.some(n=>normalizeToken(text).includes(normalizeToken(n)));
export const clampSentence=(s:string,max=180):string=>s.length<=max?s:s.slice(0,max-1).trimEnd()+'…';
export const joinNatural=(xs:string[]):string=>xs.length===0?'':xs.length===1?xs[0]:xs.length===2?`${xs[0]} and ${xs[1]}`:`${xs.slice(0,-1).join(', ')}, and ${xs.at(-1)}`;
