export interface RegisteredModel {id:string;version:string;kind:'ranker'|'classifier'|'embedder'|'rules';createdAt:number;status:'active'|'shadow'|'retired';metadata:Record<string,string|number|boolean>;}
export class ModelRegistry {
 private rows:RegisteredModel[]=[];
 register(row:RegisteredModel){this.rows.push({...row,metadata:{...row.metadata}});}
 active(kind:RegisteredModel['kind']){return this.rows.filter(x=>x.kind===kind&&x.status==='active').sort((a,b)=>b.createdAt-a.createdAt)[0];}
 list(){return this.rows.map(x=>({...x,metadata:{...x.metadata}}));}
 retire(id:string){this.rows=this.rows.map(x=>x.id===id?{...x,status:'retired'}:x);}
}
