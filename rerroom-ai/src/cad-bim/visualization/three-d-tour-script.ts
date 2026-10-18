export interface TourStop { id:string; label:string; camera:{x:number;y:number;z:number;targetX:number;targetY:number;targetZ:number}; seconds:number; narration:string; } 
export interface ThreeDTourScript { id:string; name:string; stops:TourStop[]; loop:boolean; totalSeconds:number; }
export function buildThreeDTourScript(name:string,roomWidth:number,roomDepth:number):ThreeDTourScript{
 const centerX=roomWidth/2,centerZ=roomDepth/2; const stops:TourStop[]=[
  {id:'entry',label:'Entry overview',camera:{x:roomWidth*.15,y:2.2,z:roomDepth*.15,targetX:centerX,targetY:1,targetZ:centerZ},seconds:4,narration:'Start with the existing room geometry and the main circulation path.'},
  {id:'focal',label:'Focal experience',camera:{x:centerX+roomWidth*.42,y:1.7,z:centerZ+roomDepth*.25,targetX:centerX,targetY:1,targetZ:centerZ},seconds:5,narration:'Show the proposed focal arrangement without changing source dimensions.'},
  {id:'materials',label:'Material story',camera:{x:centerX-roomWidth*.3,y:1.5,z:centerZ-roomDepth*.35,targetX:centerX,targetY:1.1,targetZ:centerZ},seconds:5,narration:'Review materials, lighting, and furniture choices on top of the authoritative model.'},
  {id:'handoff',label:'Construction view',camera:{x:centerX,y:4.8,z:centerZ,targetX:centerX,targetY:0,targetZ:centerZ},seconds:4,narration:'End on a clear scene that keeps construction-relevant dimensions anchored to source data.'}
 ];
 return {id:`tour-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,name,stops,loop:false,totalSeconds:stops.reduce((s,x)=>s+x.seconds,0)};
}
