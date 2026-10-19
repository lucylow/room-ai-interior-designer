export class OfferReport {
  usage(input:any={}): number { return Math.max(0, Number(input?.usage ?? 0)); }
  conversion(input:any={}): number { const impressions=Number(input?.impressions ?? 0); const purchases=Number(input?.purchases ?? 0); return impressions>0 ? purchases/impressions : 0; }
  incremental(input:any={}): number { return Number(input?.treated ?? 0)-Number(input?.control ?? 0); }
  snapshot(input:any={}): Record<string,number> { return {usage:this.usage(input),conversion:this.conversion(input),incremental:this.incremental(input)}; }
}
