export interface OpsRecord{id:string;topic:'offer-audit';status:'ready'|'warning'|'blocked';message:string;createdAt:string;metadata:Record<string,string|number|boolean>}
export function createRecord(id:string,status:OpsRecord['status'],message:string,metadata:OpsRecord['metadata']={}):OpsRecord{return {id,topic:'offer-audit',status,message,createdAt:new Date().toISOString(),metadata}}
export function isProductionReady(r:OpsRecord):boolean{return r.status==='ready'}
export function blocking(r:OpsRecord):boolean{return r.status==='blocked'}
export function normalizeMetadata(m:OpsRecord['metadata']){return Object.fromEntries(Object.entries(m).filter(([k])=>!/secret|token|password|card|cvv/i.test(k)))}
export function score(r:OpsRecord):number{return r.status==='ready'?1:r.status==='warning'?.6:0}
export function label(r:OpsRecord){return r.status==='ready'?'Ready':r.status==='warning'?'Review':'Blocked'}
export function regressionCase():OpsRecord{return createRecord('offer-audit-demo','ready','deterministic demo passed',{environment:'demo',provider:'local'})}
