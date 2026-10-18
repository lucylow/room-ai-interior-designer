import type {CreativeConceptMock,RoomType} from './types';
import {MOCK_CREATIVE_STYLES,getMockStyle} from './style-library';
import {MOCK_PALETTES,getMockPalette,palettesForRoom} from './palette-library';
import {conceptsFor} from './concept-library';
import {layoutAdviceFor} from './layout-advice-library';
import {MOCK_REFINEMENTS} from './refinement-library';
import {MOCK_FURNITURE_AESTHETICS} from './furniture-aesthetic-library';

export interface MockDesignRequest{room:RoomType;style?:string;palette?:string;budget?:number;requestedChanges?:string[];limit?:number;}
export interface MockGenerationResult{concepts:CreativeConceptMock[];styles:{id:string;name:string}[];palettes:{id:string;name:string}[];advice:string[];refinements:string[];confidence:number;demo:true;}

function rank(c:CreativeConceptMock,r:MockDesignRequest):number{let s=.45;if(r.style===c.style)s+=.35;if(r.palette===c.palette)s+=.18;if(r.budget!==undefined)s+=Math.min(.04,r.budget/50000);const q=(r.requestedChanges||[]).join(' ').toLowerCase();if(q.includes('bright')&&c.mood==='airy')s+=.05;if(q.includes('cozy')&&c.mood==='welcoming')s+=.05;return Math.min(1,s);}
export function generateMockCreativeDesign(r:MockDesignRequest):MockGenerationResult{const pool=conceptsFor(r.room,r.style);const source=pool.length?pool:conceptsFor(r.room);const concepts=[...source].sort((a,b)=>rank(b,r)-rank(a,r)).slice(0,r.limit??6);const selected=r.style||concepts[0]?.style||MOCK_CREATIVE_STYLES[0].id;const advice=layoutAdviceFor(r.room,selected).slice(0,6).map(x=>x.advice);const refinements=MOCK_REFINEMENTS.filter(x=>(r.requestedChanges||[]).join(' ').toLowerCase().split(' ').some(w=>w.length>3&&x.command.toLowerCase().includes(w))).slice(0,10).map(x=>x.label);return{concepts,styles:MOCK_CREATIVE_STYLES.map(x=>({id:x.id,name:x.name})),palettes:palettesForRoom(r.room).map(x=>({id:x.id,name:x.name})),advice,refinements,confidence:concepts.length?.9:.65,demo:true};}
export function validateRequest(r:MockDesignRequest):string[]{const e:string[]=[];if(r.style&&!getMockStyle(r.style))e.push('unknown style');if(r.palette&&!getMockPalette(r.palette))e.push('unknown palette');if(r.budget!==undefined&&r.budget<0)e.push('budget cannot be negative');return e;}
export function explainConcept(c:CreativeConceptMock):string[]{return [`${c.title} keeps the architectural shell unchanged.`,'The style is expressed through repeated materials, silhouettes and lighting cues.',`The ${c.palette} palette is distributed from base surfaces to focal accents.`,`Layout guidance is applied before decorative density.`,`The concept is intended to be revised in place rather than rebuilt.`];}
export function styleFilter(query:string):string[]{const q=query.trim().toLowerCase();return MOCK_CREATIVE_STYLES.filter(x=>!q||x.name.toLowerCase().includes(q)||x.id.includes(q)).map(x=>x.id);}
export function paletteFilter(room:RoomType,query:string):string[]{const q=query.trim().toLowerCase();return palettesForRoom(room).filter(x=>!q||x.name.toLowerCase().includes(q)||x.mood.includes(q)).map(x=>x.id);}
export function furnitureRoleSuggestions(style:string,role:string):string[]{return MOCK_FURNITURE_AESTHETICS.filter(x=>x.style===style&&x.role===role).slice(0,12).map(x=>x.id);}
