export interface MetricValue{name:string;value:number;importance:number;}
export const normalizeMetrics=(rows:MetricValue[])=>{const max=Math.max(...rows.map(r=>r.value),0);const min=Math.min(...rows.map(r=>r.value),0);const range=Math.max(.0001,max-min);return rows.map(r=>({...r,normalized:(r.value-min)/range}));};
export const weightedMetric=(row:MetricValue)=>row.value*row.importance;
export const aggregateMetrics=(rows:MetricValue[])=>{const total=rows.reduce((s,r)=>s+r.importance,0)||1;return rows.reduce((s,r)=>s+weightedMetric(r),0)/total;};
