export interface Touch{channel:string;weight:number}
export function linearAttribution(touches:string[]):Touch[]{if(touches.length===0)return [];const w=1/touches.length;return touches.map(channel=>({channel,weight:w}))}
export function lastTouch(touches:string[]):Touch[]{return touches.length?[{channel:touches[touches.length-1],weight:1}]:[]}
