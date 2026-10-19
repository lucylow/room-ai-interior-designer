import { EditPlan } from '../core/types';
import { hashString } from '../core/types';
const intents=[['warmer','recolor','palette'],['brighter','relight','lighting'],['remove clutter','delete','declutter'],['more natural','material','material'],['more modern','style','style'],['larger sofa','replace','furniture']];
export function compilePrompt(prompt:string):EditPlan{const p=prompt.toLowerCase();const hits=intents.filter(x=>p.includes(x[0]));const kind=hits[0]?.[1]||'inspect';const actions=hits.length?hits.map(x=>x[2]):['review'];return{id:`plan-${hashString(prompt).toString(16)}`,kind,regionIds:[],actions,geometryLocked:true,risk:kind==='delete'?.5:.2,confidence:hits.length?.88:.55}}
export function unsupportedPrompts(prompt:string){return ['change wall position','move structural beam','increase ceiling height'].some(x=>prompt.toLowerCase().includes(x))}
