import { RemodelProject } from '../core/types';

export interface ProjectSearchDocument { id:string; text:string; tags:string[]; status:string; roomCount:number; updatedAt:string; }
export interface ProjectSearchResult { projectId:string; score:number; matchedTerms:string[]; highlights:string[]; }
export function indexProject(project:RemodelProject,roomNames:string[]=[],tags:string[]=[]):ProjectSearchDocument{
 const text=[project.name,project.name,...roomNames,...tags].join(' ').toLowerCase(); return {id:project.id,text,tags,status:project.status,roomCount:roomNames.length,updatedAt:new Date().toISOString()};
}
export function searchProjects(index:ProjectSearchDocument[],query:string):ProjectSearchResult[]{
 const terms=query.toLowerCase().split(/\s+/).filter(Boolean); return index.map(doc=>{ const matched=terms.filter(t=>doc.text.includes(t)); const score=terms.length?matched.length/terms.length:0; return {projectId:doc.id,score,matchedTerms:matched,highlights:matched.map(t=>doc.text.slice(Math.max(0,doc.text.indexOf(t)-35),doc.text.indexOf(t)+t.length+55))}; }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);
}
