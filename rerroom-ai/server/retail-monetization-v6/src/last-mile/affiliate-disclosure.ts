export interface AffiliateDisclosureLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface AffiliateDisclosureReport{ok:boolean;total:number;currency:'CAD'|'USD';items:AffiliateDisclosureLine[];warnings:string[];nextAction:string}
export function buildAffiliateDisclosure(items:AffiliateDisclosureLine[], cap=5000):AffiliateDisclosureReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('affiliate-disclosure:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoAffiliateDisclosure():AffiliateDisclosureReport{
  return buildAffiliateDisclosure([
    {id:'affiliate-disclosure_0',label:'affiliate-disclosure item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'affiliate-disclosure_1',label:'affiliate-disclosure item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'affiliate-disclosure_2',label:'affiliate-disclosure item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'affiliate-disclosure_3',label:'affiliate-disclosure item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'affiliate-disclosure_4',label:'affiliate-disclosure item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'affiliate-disclosure_5',label:'affiliate-disclosure item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'affiliate-disclosure_6',label:'affiliate-disclosure item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'affiliate-disclosure_7',label:'affiliate-disclosure item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactAffiliateDisclosure(report:AffiliateDisclosureReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneAffiliateDisclosure(report:AffiliateDisclosureReport){return structuredClone(report)}
