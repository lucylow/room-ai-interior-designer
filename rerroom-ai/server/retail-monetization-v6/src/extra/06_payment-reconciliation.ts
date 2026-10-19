export type PaymentReconciliationStatus='idle'|'ready'|'pending'|'success'|'error';
export interface PaymentReconciliationRecord{id:string;amount:number;status:PaymentReconciliationStatus;currency:'CAD'|'USD';metadata:Record<string,string>;updatedAt:string}
export class PaymentReconciliationStore{private data=new Map<string,PaymentReconciliationRecord>();
 create(record:PaymentReconciliationRecord){if(this.data.has(record.id))throw new Error('duplicate_record');this.data.set(record.id,{...record,amount:Math.round(record.amount*100)/100,updatedAt:new Date().toISOString()});return this.data.get(record.id)!}
 update(id:string,patch:Partial<PaymentReconciliationRecord>){const current=this.data.get(id);if(!current)throw new Error('record_not_found');const next={...current,...patch,id,updatedAt:new Date().toISOString()};this.data.set(id,next);return next}
 get(id:string){return this.data.get(id)??null}
 list(){return [...this.data.values()]}
 total(){return this.list().reduce((sum,row)=>sum+row.amount,0)}
 summary(){const rows=this.list();const success=rows.filter(x=>x.status==='success').length;return {count:rows.length,success,successRate:rows.length?success/rows.length:0,total:this.total(),topic:'payment-reconciliation'}}
}
export function demoPaymentReconciliation(n=4){const store=new PaymentReconciliationStore();for(let i=0;i<n;i++)store.create({id:'payment-reconciliation_'+i,amount:89+i*17,status:i%4===0?'error':'success',currency:'CAD',metadata:{mode:'demo',topic:'payment-reconciliation',index:String(i)},updatedAt:new Date().toISOString()});return store.summary()}
