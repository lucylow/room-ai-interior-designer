import { AuthoritativeModel, SourceFeature } from '../core/types';
export type Relation='hosts'|'hosted-by'|'opens-into'|'contains'|'adjacent-to'|'near';
export interface SpatialRelation { from:string; to:string; relation:Relation; confidence:number; source:'cad'|'bim'|'derived'; }
export class SpatialRelationEngine {
  derive(model:AuthoritativeModel):SpatialRelation[]{const out:SpatialRelation[]=[];const rooms=model.features.filter(f=>f.kind==='room'&&f.geometry2d);for(const f of model.features){if(f.kind==='door'||f.kind==='window'||f.kind==='opening'){const host=this.nearestRoom(f,rooms);if(host)out.push({from:f.id,to:host.id,relation:'hosted-by',confidence:.8,source:'derived'});}if(f.kind==='furniture'&&f.center){const host=this.nearestRoomPoint(f,rooms);if(host)out.push({from:f.id,to:host.id,relation:'contains',confidence:.65,source:'derived'});}}return out;}
  private nearestRoom(f:SourceFeature,rooms:SourceFeature[]){return f.center?this.nearestRoomPoint(f,rooms):undefined;}
  private nearestRoomPoint(f:SourceFeature,rooms:SourceFeature[]){let best:SourceFeature|undefined,bd=Infinity;for(const r of rooms){const c=r.center||{x:0,y:0,z:0};const p=f.center||c;const d=Math.hypot(p.x-c.x,p.y-c.y);if(d<bd){bd=d;best=r;}}return best;}
}
