import type {FeatureVector} from '../core/types';
export interface FeatureSnapshot {roomId:string;vector:FeatureVector;at:number;fingerprint:string;}
export class FeatureStore {
 private rows:FeatureSnapshot[]=[];put(row:FeatureSnapshot){this.rows=[...this.rows.filter(x=>!(x.roomId===row.roomId&&x.fingerprint===row.fingerprint)),row];}
 latest(roomId:string){return [...this.rows.filter(x=>x.roomId===roomId)].sort((a,b)=>b.at-a.at)[0];}
 history(roomId:string,limit=20){return [...this.rows.filter(x=>x.roomId===roomId)].sort((a,b)=>b.at-a.at).slice(0,limit);}
 size(){return this.rows.length;}
}
