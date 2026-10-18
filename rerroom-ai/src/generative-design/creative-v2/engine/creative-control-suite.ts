import type {DesignConcept,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {evaluatestyle_intensity} from '../controls/style_intensity';
import {evaluatepalette_warmth} from '../controls/palette_warmth';
import {evaluatepalette_saturation} from '../controls/palette_saturation';
import {evaluatecontrast} from '../controls/contrast';
import {evaluatematerial_density} from '../controls/material_density';
import {evaluatetexture} from '../controls/texture';
import {evaluatelighting_temperature} from '../controls/lighting_temperature';
import {evaluatelighting_layering} from '../controls/lighting_layering';
import {evaluatefocal_point} from '../controls/focal_point';
import {evaluatesymmetry} from '../controls/symmetry';
import {evaluateopenness} from '../controls/openness';
import {evaluatestorage_visibility} from '../controls/storage_visibility';
import {evaluatefurniture_density} from '../controls/furniture_density';
import {evaluatefurniture_scale} from '../controls/furniture_scale';
import {evaluaterug_zoning} from '../controls/rug_zoning';
import {evaluategreenery} from '../controls/greenery';
import {evaluateart_density} from '../controls/art_density';
import {evaluatedecor_density} from '../controls/decor_density';
import {evaluatecamera_height} from '../controls/camera_height';
import {evaluatecamera_fov} from '../controls/camera_fov';
import {evaluatedaylight} from '../controls/daylight';
import {evaluateevening} from '../controls/evening';
import {evaluatebudget} from '../controls/budget';
import {evaluatefamily} from '../controls/family';
import {evaluatepet} from '../controls/pet';
export function evaluateCreativeControlSuite(room:RoomContext,concept:DesignConcept):CreativeSignal[]{
 const evaluations=[evaluatestyle_intensity(room,concept),evaluatepalette_warmth(room,concept),evaluatepalette_saturation(room,concept),evaluatecontrast(room,concept),evaluatematerial_density(room,concept),evaluatetexture(room,concept),evaluatelighting_temperature(room,concept),evaluatelighting_layering(room,concept),evaluatefocal_point(room,concept),evaluatesymmetry(room,concept),evaluateopenness(room,concept),evaluatestorage_visibility(room,concept),evaluatefurniture_density(room,concept),evaluatefurniture_scale(room,concept),evaluaterug_zoning(room,concept),evaluategreenery(room,concept),evaluateart_density(room,concept),evaluatedecor_density(room,concept),evaluatecamera_height(room,concept),evaluatecamera_fov(room,concept),evaluatedaylight(room,concept),evaluateevening(room,concept),evaluatebudget(room,concept),evaluatefamily(room,concept),evaluatepet(room,concept)];
 return evaluations.flatMap(e=>e.signals).sort((a,b)=>b.score-b.score);
}
export function summarizeCreativeControls(room:RoomContext,concept:DesignConcept){
 const signals=evaluateCreativeControlSuite(room,concept);const avg=signals.length?signals.reduce((s,x)=>s+x.score*x.confidence,0)/signals.reduce((s,x)=>s+x.confidence,0):0;
 return {signalCount:signals.length,averageScore:avg,top:signals.slice(0,8).map(x=>({label:x.label,score:x.score,confidence:x.confidence})),warnings:signals.filter(x=>x.score<.45).map(x=>x.explanation)};
}
