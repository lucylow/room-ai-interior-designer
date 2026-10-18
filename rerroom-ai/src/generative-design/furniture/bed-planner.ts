import type {RoomContext,DesignStyleId,FurnitureIdea,UserPreferences} from '../core/types';
import {clamp} from '../core/utils';
export const planBed=(room:RoomContext,style:DesignStyleId,prefs:UserPreferences):FurnitureIdea[]=>{
 const existing=room.objects.filter(o=>o.type.toLowerCase().includes('bed')).length;
 const baseW=0.95,baseD=0.63,baseH=0.52;
 const x=clamp(room.measurements.widthM*(.25+((2*17)%50)/100),.3,room.measurements.widthM-.3);
 const z=clamp(room.measurements.depthM*(.25+((2*13)%45)/100),.3,room.measurements.depthM-.3);
 if(existing>1) return [];
 return [{id:`idea-bed`,type:'bed',label:`AI ${style} bed`,dimensions:{width:baseW,height:baseH,depth:baseD},placement:{x,z,rotation:(2%4)*Math.PI/2},styleTags:[style],materialTags:[style==='industrial'?'steel':style==='bohemian'?'rattan':'oak'],colorTags:prefs.preferredColors.slice(0,2),confidence:clamp(.58+room.measurements.confidence*.3),reason:`Fits the ${style} language while preserving a ${.55+room.circulationScore*.2} circulation target.`,removable:true,source:'procedural'}];
};
