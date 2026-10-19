import { PRODUCT_CATALOG } from '../catalog/product-catalog';
import { StoreProduct } from '../types';

export type PaywallReason = 'feature-gate'|'export-limit'|'project-limit'|'ai-limit'|'3dgs-limit'|'cad-bim-limit'|'client-review-limit';
export interface PaywallInput { reason:PaywallReason; sourceScreen:string; projectId?:string; style?:string; budget?:number; experimentId?:string; }
export interface PaywallModel { title:string; subtitle:string; products:StoreProduct[]; recommended:string; reason:PaywallReason; featurePreview:string[]; legal:string[]; }

const reasonCopy:Record<PaywallReason,string>={
 'feature-gate':'Unlock the advanced tools for this room.', 'export-limit':'Export higher-resolution presentation files.', 'project-limit':'Create and manage more design projects.',
 'ai-limit':'Generate and refine more AI design concepts.', '3dgs-limit':'Explore richer photorealistic 3D captures.', 'cad-bim-limit':'Work with professional CAD/BIM workflows.', 'client-review-limit':'Share client review spaces and approvals.'
};

export class PaywallEngine {
  model(input:PaywallInput):PaywallModel { 
    const products=PRODUCT_CATALOG.filter(p=>p.kind==='auto-renewable'||p.kind==='non-consumable').filter(p=>!input.reason.startsWith('cad') || p.family==='studio');
    const recommended=input.reason.startsWith('cad')||input.reason.includes('client')?'com.reroom.ai.studio.yearly':'com.reroom.ai.pro.yearly';
    return {title:'Keep designing without limits',subtitle:reasonCopy[input.reason],products,recommended,reason:input.reason,featurePreview:['AI concept variations','2D + 3D visualization','saved revisions','project organization'],legal:['Subscription billed through Apple','Manage or cancel in App Store account settings','Prices vary by storefront']};
  }
}
