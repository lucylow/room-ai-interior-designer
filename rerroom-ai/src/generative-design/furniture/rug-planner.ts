import type {RoomContext,DesignStyleId,FurnitureIdea,UserPreferences} from '../core/types';
import {clamp} from '../core/utils';
export const planRug=(room:RoomContext,style:DesignStyleId,prefs:UserPreferences):FurnitureIdea[]=>{
 const existing=room.objects.filter(o=>o.type.toLowerCase().includes('rug')).length;
 const baseW=1.00,baseD=0.55,baseH=0.88;
 const x=clamp(room.measurements.widthM*(.25+((17*17)%50)/100),.3,room.measurements.widthM-.3);
 const z=clamp(room.measurements.depthM*(.25+((17*13)%45)/100),.3,room.measurements.depthM-.3);
 if(existing>1) return [];
 return [{id:`idea-rug`,type:'rug',label:`AI ${style} rug`,dimensions:{width:baseW,height:baseH,depth:baseD},placement:{x,z,rotation:(17%4)*Math.PI/2},styleTags:[style],materialTags:[style==='industrial'?'steel':style==='bohemian'?'rattan':'oak'],colorTags:prefs.preferredColors.slice(0,2),confidence:clamp(.58+room.measurements.confidence*.3),reason:`Fits the ${style} language while preserving a ${.55+room.circulationScore*.2} circulation target.`,removable:true,source:'procedural'}];
};
