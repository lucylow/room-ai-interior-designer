export type RetailerImageCacheStatus='idle'|'ready'|'pending'|'success'|'error';
export interface RetailerImageCacheRecord{id:string;amount:number;status:RetailerImageCacheStatus;currency:'CAD'|'USD';metadata:Record<string,string>;updatedAt:string}
export class RetailerImageCacheStore{private data=new Map<string,RetailerImageCacheRecord>();
 create(record:RetailerImageCacheRecord){if(this.data.has(record.id))throw new Error('duplicate_record');this.data.set(record.id,{...record,amount:Math.round(record.amount*100)/100,updatedAt:new Date().toISOString()});return this.data.get(record.id)!}
 update(id:string,patch:Partial<RetailerImageCacheRecord>){const current=this.data.get(id);if(!current)throw new Error('record_not_found');const next={...current,...patch,id,updatedAt:new Date().toISOString()};this.data.set(id,next);return next}
 get(id:string){return this.data.get(id)??null}
 list(){return [...this.data.values()]}
 total(){return this.list().reduce((sum,row)=>sum+row.amount,0)}
 summary(){const rows=this.list();const success=rows.filter(x=>x.status==='success').length;return {count:rows.length,success,successRate:rows.length?success/rows.length:0,total:this.total(),topic:'retailer-image-cache'}}
}
export function demoRetailerImageCache(n=4){const store=new RetailerImageCacheStore();for(let i=0;i<n;i++)store.create({id:'retailer-image-cache_'+i,amount:89+i*17,status:i%4===0?'error':'success',currency:'CAD',metadata:{mode:'demo',topic:'retailer-image-cache',index:String(i)},updatedAt:new Date().toISOString()});return store.summary()}
