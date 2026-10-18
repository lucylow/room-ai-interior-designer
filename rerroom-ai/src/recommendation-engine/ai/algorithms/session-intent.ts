export interface SessionTurn{role:'user'|'assistant';text:string;timestamp:number;}
export interface SessionIntent{labels:string[];confidence:number;recency:number;}
export const inferSessionIntent=(turns:SessionTurn[]):SessionIntent=>{const recent=turns.slice(-6);const text=recent.map(t=>t.text.toLowerCase()).join(' ');const labels=['layout','style','lighting','storage','budget','shopping','construction','comfort','color'].filter(k=>text.includes(k));const recency=recent.length?1:0;return {labels:labels.length?labels:['layout'],confidence:Math.min(1,.45+labels.length*.09),recency};};
