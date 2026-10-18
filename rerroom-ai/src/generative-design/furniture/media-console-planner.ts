import type {RoomContext,DesignStyleId,FurnitureIdea,UserPreferences} from '../core/types';
import {clamp} from '../core/utils';
export const planMediaConsole=(room:RoomContext,style:DesignStyleId,prefs:UserPreferences):FurnitureIdea[]=>{
 const existing=room.objects.filter(o=>o.type.toLowerCase().includes('media')).length;
 const baseW=0.95,baseD=0.55,baseH=0.64;
 const x=clamp(room.measurements.widthM*(.25+((13*17)%50)/100),.3,room.measurements.widthM-.3);
 const z=clamp(room.measurements.depthM*(.25+((13*13)%45)/100),.3,room.measurements.depthM-.3);
 if(existing>1) return [];
 return [{id:`idea-media-console`,type:'media console',label:`AI ${style} media console`,dimensions:{width:baseW,height:baseH,depth:baseD},placement:{x,z,rotation:(13%4)*Math.PI/2},styleTags:[style],materialTags:[style==='industrial'?'steel':style==='bohemian'?'rattan':'oak'],colorTags:prefs.preferredColors.slice(0,2),confidence:clamp(.58+room.measurements.confidence*.3),reason:`Fits the ${style} language while preserving a ${.55+room.circulationScore*.2} circulation target.`,removable:true,source:'procedural'}];
};
