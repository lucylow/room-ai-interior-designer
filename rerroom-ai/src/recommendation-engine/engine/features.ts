import type {RoomContext,UserPreferences,FeatureVector,Feature} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
export const buildFeatures=(room:RoomContext,prefs:UserPreferences,now=Date.now()):FeatureVector=>{
 const values:Feature[]=[];
 const push=(name:string,value:number,confidence:number,source:Feature['source']='model')=>values.push({name,value:clamp(value),confidence:clamp(confidence),source});
 push('room.width',room.measurements.widthM/8,.95,'measurement');push('room.depth',room.measurements.depthM/8,.95,'measurement');
 push('room.aspectRatio',Math.min(room.measurements.widthM,room.measurements.depthM)/Math.max(room.measurements.widthM,room.measurements.depthM),.95,'measurement');
 push('room.objectDensity',room.objects.length/Math.max(1,room.measurements.widthM*room.measurements.depthM/2),room.measurements.confidence,'object');
 push('room.circulation',room.circulationScore,room.measurements.confidence,'measurement');push('room.light',room.naturalLightScore,room.measurements.confidence,'measurement');
 push('room.clutter',room.clutterScore,room.measurements.confidence,'measurement');push('room.storage',room.storageScore,room.measurements.confidence,'measurement');
 push('room.balance',room.visualBalanceScore,room.measurements.confidence,'measurement');push('room.accessibility',room.accessibilityScore,room.measurements.confidence,'measurement');
 push('room.safety',room.safetyScore,room.measurements.confidence,'measurement');push('room.comfort',room.comfortScore,room.measurements.confidence,'measurement');
 push('room.sustainability',room.sustainabilityScore,room.measurements.confidence,'measurement');push('room.workflow',room.workflowScore,room.measurements.confidence,'measurement');
 for(const s of prefs.preferredStyles.slice(0,5))push(`style.${s}`,room.styleSignals[s]??.5,.72,'style');
 for(const c of prefs.preferredColors.slice(0,5))push(`color.${c}`,room.colorSignals[c]??.5,.72,'style');
 return {values,createdAt:now};
};
export const featureEvidence=(fv:FeatureVector):ReturnType<typeof makeEvidence>[]=>fv.values.slice(0,10).map(f=>makeEvidence(f.source,f.name,f.value.toFixed(3),f.confidence));
