import type {Insight,Recommendation} from '../core/types';
export interface Trigger {id:string;when:(insight:Insight)=>boolean;message:string;category:Insight['category'];}
export const triggers:Trigger[]=[
 {id:'high-layout',category:'layout',when:i=>i.category==='layout'&&(i.severity==='high'||i.severity==='critical'),message:'Open the 2D plan and preview alternate furniture groupings.'},
 {id:'high-light',category:'lighting',when:i=>i.category==='lighting'&&i.severity==='high',message:'Open the 3D lighting preview and compare evening presets.'},
 {id:'storage-gap',category:'storage',when:i=>i.category==='storage'&&(i.severity==='high'||i.severity==='medium'),message:'Show storage candidates that fit the room envelope.'},
 {id:'style-gap',category:'style',when:i=>i.category==='style'&&i.severity!=='info',message:'Open the style comparison board and test two visual directions.'},
];
export const triggeredActions=(insights:Insight[])=>triggers.filter(t=>insights.some(t.when));
