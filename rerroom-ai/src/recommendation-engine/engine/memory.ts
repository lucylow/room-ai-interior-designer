import type {Recommendation,Feedback,RoomContext} from '../core/types';
export interface MemoryEntry {id:string;roomId:string;recommendationId:string;category:string;action:string;at:number;tags:string[];score:number;}
export class RecommendationMemory {
  private entries:MemoryEntry[]=[];
  constructor(seed:MemoryEntry[]=[]){this.entries=[...seed];}
  record(room:RoomContext,r:Recommendation,feedback:Feedback){this.entries.push({id:`mem-${Date.now()}-${this.entries.length}`,roomId:room.roomId,recommendationId:r.id,category:r.category,action:feedback.action,at:feedback.createdAt,tags:r.tags,score:r.score});}
  recent(roomId:string,limit=20){return this.entries.filter(e=>e.roomId===roomId).sort((a,b)=>b.at-a.at).slice(0,limit);}
  acceptanceRate(roomId:string):number{const xs=this.recent(roomId,100);if(!xs.length)return .5;return xs.filter(x=>x.action==='accepted'||x.action==='edited').length/xs.length;}
  categoryBias(roomId:string,category:string):number{const xs=this.recent(roomId,100).filter(x=>x.category===category);if(!xs.length)return 0;return xs.reduce((s,x)=>s+(x.action==='accepted'?.08:x.action==='rejected'?-.1:0),0)/Math.max(1,xs.length);}
  snapshot(){return this.entries.map(e=>({...e,tags:[...e.tags]}));}
}
