
import type {DesignConcept,DesignStyleId} from '../../core/types';
import type {CreativeRevision} from '../types';
import {clamp} from '../../core/utils';
import {getwarmerRevision,applywarmerRevision} from '../revisions/warmer';
import {getmore_minimalRevision,applymore_minimalRevision} from '../revisions/more_minimal';
import {getmore_modernRevision,applymore_modernRevision} from '../revisions/more_modern';
import {getmore_scandiRevision,applymore_scandiRevision} from '../revisions/more_scandi';
import {getmore_industrialRevision,applymore_industrialRevision} from '../revisions/more_industrial';
import {getless_clutteredRevision,applyless_clutteredRevision} from '../revisions/less_cluttered';
import {getmore_openRevision,applymore_openRevision} from '../revisions/more_open';
import {getcozierRevision,applycozierRevision} from '../revisions/cozier';

const registry:Record<string,{get:()=>CreativeRevision;apply:(c:DesignConcept)=>DesignConcept}>={
 warmer:{get:getwarmerRevision,apply:applywarmerRevision},'more-minimal':{get:getmore_minimalRevision,apply:applymore_minimalRevision},'more-modern':{get:getmore_modernRevision,apply:applymore_modernRevision},'more-scandi':{get:getmore_scandiRevision,apply:applymore_scandiRevision},'more-industrial':{get:getmore_industrialRevision,apply:applymore_industrialRevision},'less-cluttered':{get:getless_clutteredRevision,apply:applyless_clutteredRevision},'more-open':{get:getmore_openRevision,apply:applymore_openRevision},cozier:{get:getcozierRevision,apply:applycozierRevision}
};
export function revisionChoices():CreativeRevision[]{return Object.values(registry).map(x=>x.get());}
export function applyRevisionById(concept:DesignConcept,id:string):DesignConcept{return registry[id]?registry[id].apply(concept):concept;}
export function applyRevisionSeries(concept:DesignConcept,ids:string[]):DesignConcept{return ids.reduce((c,id)=>applyRevisionById(c,id),concept);}
export function recommendRevision(concept:DesignConcept,prompt:string):string{
 const text=prompt.toLowerCase();for(const id of Object.keys(registry)){if(text.includes(id.replace(/-/g,' ')))return id;}
 if(/warm|cozy|soft/.test(text))return 'warmer';if(/minimal|simple|clean/.test(text))return 'more-minimal';if(/open|airy/.test(text))return 'more-open';return 'more-modern';
}
export function revisionSafety(concept:DesignConcept):{safe:boolean;score:number;reasons:string[]}{
 const score=clamp(concept.render.geometryLock?.96:.54);return {safe:score>.8,score,reasons:concept.render.geometryLock?['Geometry lock active','Revision is aesthetic-first']:['Geometry lock inactive; review source geometry before handoff']};
}
