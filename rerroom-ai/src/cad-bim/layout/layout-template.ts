import { FurnitureSpec, LayoutPlan, PlacementCandidate, Zone } from '../planning/types';
export interface LayoutTemplate { id:string; name:string; roomTypes:string[]; priorities:string[]; create:(zones:Zone[], furniture:FurnitureSpec[])=>LayoutPlan; }
export function makeTemplate(id:string,name:string,priorities:string[],roomTypes:string[]):LayoutTemplate{
  return {id,name,priorities,roomTypes,create(zones,furniture){
    const placements:PlacementCandidate[]=[];
    zones.forEach((z,i)=>{ const f=furniture.find(x=>x.roomTypes.includes((roomTypes[0]||'other') as any))||furniture[0]; if(!f)return;
      const cx=(Math.min(...z.polygon.map(p=>p.x))+Math.max(...z.polygon.map(p=>p.x)))/2; const cz=(Math.min(...z.polygon.map(p=>p.z))+Math.max(...z.polygon.map(p=>p.z)))/2;
      placements.push({id:`tpl-${id}-${i}`,furnitureId:f.id,position:{x:cx,y:f.dimensions.height/2,z:cz},rotationY:i%2?Math.PI/2:0,score:.7,feasibility:.9,objectives:{template:.8},conflicts:[],reasons:[`Template priority: ${priorities[i%priorities.length]||'balanced'}`]});
    });
    return {id:`layout-${id}`,name,roomId:'template-room',zoneIds:zones.map(z=>z.id),placements,score:.72,circulationScore:.78,visibilityScore:.73,usabilityScore:.75,styleScore:.8,confidence:.7,createdAt:new Date().toISOString()};
  }};
}
