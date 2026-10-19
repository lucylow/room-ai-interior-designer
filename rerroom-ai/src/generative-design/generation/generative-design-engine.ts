import type {GenerationRequest,GenerationResult,DesignConcept,DesignInsight,GenerativePolicy} from '../core/types';
import {StyleFilterEngine} from '../filters/style-filter-engine';
import {ColorFilterEngine} from '../filters/color-filter-engine';
import {STYLE_BY_ID} from '../styles';
import {PALETTE_BY_ID} from '../palettes';
import {PaletteHarmonizer} from '../palettes/palette-harmonizer';
import {materialsForStyle} from '../core/materials';
import {buildConcept} from './concept-builder';
import {candidateScore} from './candidate-score';
import {StyleReasoning} from '../styles/style-reasoner';
import {LayoutAdviceEngine} from '../layout/layout-advice-engine';
import {IterativeRefinementEngine} from '../refinement/iterative-refinement-engine';
import {clamp,stableSort} from '../core/utils';
import type {LayoutAdvice,FurnitureIdea,ColorPalette} from '../core/types';
import {adviseLivingRoom} from '../layout/living_room-advisor';
import {adviseBedroom} from '../layout/bedroom-advisor';
import {adviseKitchen} from '../layout/kitchen-advisor';
import {adviseDiningRoom} from '../layout/dining_room-advisor';
import {adviseOffice} from '../layout/office-advisor';
import {adviseBathroom} from '../layout/bathroom-advisor';
import {adviseEntryway} from '../layout/entryway-advisor';
import {adviseNursery} from '../layout/nursery-advisor';
import {adviseStudio} from '../layout/studio-advisor';
import {adviseOther} from '../layout/other-advisor';

const layoutTemplates=(roomType:string,room:any,prefs:any):LayoutAdvice[]=>{
 switch(roomType){
  case 'living-room':return adviseLivingRoom(room,prefs); case 'bedroom':return adviseBedroom(room,prefs); case 'kitchen':return adviseKitchen(room,prefs);
  case 'dining-room':return adviseDiningRoom(room,prefs); case 'office':return adviseOffice(room,prefs); case 'bathroom':return adviseBathroom(room,prefs);
  case 'entryway':return adviseEntryway(room,prefs); case 'nursery':return adviseNursery(room,prefs); case 'studio':return adviseStudio(room,prefs); default:return adviseOther(room,prefs);
 }
};
const defaultPolicy:GenerativePolicy={maxBudgetRatio:.65,maxStyleBlend:3,minGeometryConfidence:.55,maxFurnitureAdditions:6,permitStructuralChanges:false,permitFurnitureChanges:true,requireSourceLock:true};
export class GenerativeDesignEngine{
 constructor(private policy=defaultPolicy){}
 async generate(req:GenerationRequest):Promise<GenerationResult>{
  const started=Date.now(); const now=req.now??Date.now(); const trace:string[]=[]; const warnings:string[]=[];
  if(this.policy.requireSourceLock&&!req.intent.preserveArchitecture)warnings.push('Source-lock policy prefers geometry-preserving concepts.');
  if(req.room.measurements.confidence<this.policy.minGeometryConfidence)warnings.push('Room measurements are below the preferred confidence threshold.');
  const styleMatches=new StyleFilterEngine().top(req.room,req.intent.style,req.intent.userPrompt,8); trace.push(`style candidates=${styleMatches.length}`);
  const colorMatches=new ColorFilterEngine().match(req.room,req.intent.colors).slice(0,10); trace.push(`palette candidates=${colorMatches.length}`);
  const paletteEngine=new PaletteHarmonizer(); const templates=layoutTemplates(req.room.roomType,req.room,({priorities:req.intent.priorities}));
  const layoutEngine=new LayoutAdviceEngine();
  const layouts=layoutEngine.recommend(req.room,({priorities:req.intent.priorities} as any),styleMatches[0]?.styleId??'modern',templates); trace.push(`layout candidates=${layouts.length}`);
  const furniture:FurnitureIdea[]=req.room.objects.map(o=>({id:`existing-${o.id}`,type:o.type,label:o.label,dimensions:o.size,placement:{x:o.position.x,z:o.position.z,rotation:o.rotationY},styleTags:o.styleTags??[],materialTags:o.material?[o.material]:['unknown'],colorTags:o.colorTags??[],confidence:o.confidence??.8,reason:'Existing furniture retained as a visual anchor.',removable:false,source:'existing'}));
  const concepts:DesignConcept[]=[];
  for(let i=0;i<styleMatches.length;i++){
    const sm=styleMatches[i]; const style=STYLE_BY_ID[sm.styleId];
    for(let j=0;j<Math.min(3,colorMatches.length);j++){
      const pm=colorMatches[(j+i)%colorMatches.length]; const palette=PALETTE_BY_ID[pm.paletteId] as ColorPalette;
      const selectedLayouts=layouts.slice(i%2,(i%2)+3); const score=candidateScore(req.room,req.intent,sm,pm,selectedLayouts,furniture);
      concepts.push(buildConcept(req.room,req.intent,style,palette,selectedLayouts,furniture,score,now,i*10+j));
    }
  }
  trace.push(`raw concepts=${concepts.length}`);
  const ranked=stableSort(concepts,c=>c.score).filter(c=>c.confidence>=.45);
  if(req.previousConcept&&req.feedback?.length){const latest=req.feedback[req.feedback.length-1]; if(latest){const refined=new IterativeRefinementEngine().refine(req.room,req.intent,req.previousConcept,latest);ranked.unshift(refined);trace.push('refined prior concept');}}
  const diverse=[] as DesignConcept[]; const seen=new Set<string>(); for(const c of ranked){const key=`${c.styleId}|${c.paletteId}`;if(!seen.has(key)||diverse.length<4){diverse.push(c);seen.add(key);}if(diverse.length>=(req.candidateCount??12))break;}
  const insights:DesignInsight[]=[
   {id:'gen-style',kind:'style',title:'Style direction',summary:`Primary AI direction is ${diverse[0]?.styleId??'modern'} with explicit filtering support.`,confidence:clamp(.58+req.room.measurements.confidence*.3),evidence:styleMatches.slice(0,3).map(x=>`${x.styleId}:${x.score.toFixed(2)}`),actions:['Compare at least three style variants']},
   {id:'gen-color',kind:'color',title:'Palette guidance',summary:`Recommended palette family: ${diverse[0]?.paletteId??'warm-white-sand'}.`,confidence:clamp(.56+req.room.naturalLightScore*.25),evidence:colorMatches.slice(0,4).map(x=>`${x.paletteId}:${x.score.toFixed(2)}`),actions:['Test palette on the same geometry']},
   {id:'gen-layout',kind:'layout',title:'Layout advice',summary:`Best layout signal: ${layouts[0]?.pattern??'open-flow'}.`,confidence:clamp(.55+req.room.circulationScore*.3),evidence:layouts.slice(0,3).map(x=>x.title),actions:['Inspect the 2D plan','Open the 3D scene']},
   {id:'gen-preserve',kind:'warning',title:'Geometry remains anchored',summary:'The concept engine treats source architecture as a locked visual reference when preservation is enabled.',confidence:req.room.measurements.confidence,evidence:['Room measurement set','Opening list','Existing objects'],actions:['Use CAD/BIM handoff for construction dimensions']}
  ];
  return {concepts:diverse,insights,rejectedConcepts:ranked.slice(diverse.length).map(c=>c.id),warnings,metrics:{durationMs:Date.now()-started,conceptsGenerated:concepts.length,conceptsReturned:diverse.length,styleCandidates:styleMatches.length,paletteCandidates:colorMatches.length,layoutCandidates:layouts.length,topScore:diverse[0]?.score??0,topConfidence:diverse[0]?.confidence??0},trace};
 }
}
export const defaultGenerativePolicy=defaultPolicy;
