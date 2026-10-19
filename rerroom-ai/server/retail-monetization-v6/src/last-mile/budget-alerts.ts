export interface BudgetAlertsLine{id:string;label:string;amount:number;currency:'CAD'|'USD';status:string;metadata:Record<string,string>}
export interface BudgetAlertsReport{ok:boolean;total:number;currency:'CAD'|'USD';items:BudgetAlertsLine[];warnings:string[];nextAction:string}
export function buildBudgetAlerts(items:BudgetAlertsLine[], cap=5000):BudgetAlertsReport{
  const warnings:string[]=[];
  const total=Math.round(items.reduce((sum,x)=>sum+Math.max(0,x.amount),0)*100)/100;
  if(total>cap)warnings.push('budget-alerts:cap-exceeded');
  for(const item of items){if(item.amount<0)warnings.push(`${item.id}:negative`);if(item.status==='error')warnings.push(`${item.id}:error`);if(!item.currency)warnings.push(`${item.id}:currency`)}
  const ok=warnings.length===0;
  return {ok,total,currency:items[0]?.currency??'CAD',items:items.map(x=>({...x})),warnings,nextAction:ok?'proceed':'review'};
}
export function demoBudgetAlerts():BudgetAlertsReport{
  return buildBudgetAlerts([
    {id:'budget-alerts_0',label:'budget-alerts item 0',amount:59,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(0)}},
    {id:'budget-alerts_1',label:'budget-alerts item 1',amount:90,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(1)}},
    {id:'budget-alerts_2',label:'budget-alerts item 2',amount:121,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(2)}},
    {id:'budget-alerts_3',label:'budget-alerts item 3',amount:152,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(3)}},
    {id:'budget-alerts_4',label:'budget-alerts item 4',amount:183,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(4)}},
    {id:'budget-alerts_5',label:'budget-alerts item 5',amount:214,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(5)}},
    {id:'budget-alerts_6',label:'budget-alerts item 6',amount:245,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(6)}},
    {id:'budget-alerts_7',label:'budget-alerts item 7',amount:276,currency:'CAD',status:'ready',metadata:{mode:'demo',slot:String(7)}},
  ], 2000);
}
export function compactBudgetAlerts(report:BudgetAlertsReport){return {status:report.ok?'READY':'REVIEW',total:report.total,warnings:report.warnings.length,action:report.nextAction}}
export function cloneBudgetAlerts(report:BudgetAlertsReport){return structuredClone(report)}
