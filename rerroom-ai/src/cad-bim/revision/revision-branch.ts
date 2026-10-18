import { RevisionSnapshot } from '../planning/types';
export class RevisionBranchManager {
 private snapshots:RevisionSnapshot[]=[];
 create(snapshot:RevisionSnapshot):RevisionSnapshot{this.snapshots.push(snapshot);return snapshot;}
 list(projectId:string):RevisionSnapshot[]{return this.snapshots.filter(s=>s.projectId===projectId).sort((a,b)=>a.createdAt.localeCompare(b.createdAt));}
 ancestors(id:string):RevisionSnapshot[]{const out:RevisionSnapshot[]=[]; let cur=this.snapshots.find(s=>s.id===id); while(cur){out.push(cur);cur=cur.parentId?this.snapshots.find(s=>s.id===cur?.parentId):undefined;} return out;}
 latest(projectId:string):RevisionSnapshot|undefined{return this.list(projectId).at(-1);}
}
