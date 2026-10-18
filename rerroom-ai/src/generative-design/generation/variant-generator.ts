import type {DesignConcept,DesignStyleId,StyleProfile,ColorPalette} from '../core/types';
import {buildConcept} from './concept-builder';
import {STYLE_BY_ID} from '../styles';
import {PALETTE_BY_ID} from '../palettes';
export class VariantGenerator{
 from(base:DesignConcept,room:any,intent:any,count=6){
  const styles=Object.keys(STYLE_BY_ID) as DesignStyleId[]; const palettes=Object.keys(PALETTE_BY_ID);
  return Array.from({length:count},(_,i)=>{const s=STYLE_BY_ID[styles[(styles.indexOf(base.styleId)+i+1)%styles.length]] as StyleProfile;const p=PALETTE_BY_ID[palettes[(palettes.indexOf(base.paletteId??palettes[0])+i+2)%palettes.length]] as ColorPalette;const c=buildConcept(room,intent,s,p,base.layout,base.furniture,Math.max(.2,base.score-(i*.035)),Date.now(),i+10);return {id:`variant-${i+1}`,parentId:base.id,label:i===0?'Warmer':i===1?'Calmer':i===2?'Higher contrast':i===3?'Softer':i===4?'More expressive':'Alternate',concept:c,delta:[`Shift palette toward ${p.name}`,`Increase ${s.name} cues`],novelty:.55+i*.05,compatibility:Math.max(.45,base.confidence-i*.03)};});
 }
}
