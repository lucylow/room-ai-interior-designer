
import {revisionChoices} from '../engine/revision-engine-v2';
export interface RevisionPill {id:string;label:string;description:string;icon:string;}
export function revisionPills():RevisionPill[]{return revisionChoices().map(x=>({id:x.id,label:x.label,description:x.description,icon:x.controls[0]??'sparkles'}));}
