import { QuickRevisionRequest } from '../planning/types';
export interface ParsedRevision { mode:QuickRevisionRequest['requestedMode']; changes:Array<{kind:string;value:string}>; preserve:string[]; targets:string[]; }
const verbs=[['warmer','material-change'],['darker','color-change'],['lighter','color-change'],['move','move'],['replace','replace'],['swap','replace'],['rotate','rotate'],['smaller','resize'],['larger','resize'],['declutter','remove'],['more storage','add-storage'],['more seating','add-seating']];
export function parseQuickRevision(req:QuickRevisionRequest):ParsedRevision{
 const text=req.prompt.toLowerCase(); const changes=verbs.filter(([w])=>text.includes(w)).map(([w,k])=>({kind:k,value:w}));
 const preserve=req.preserveAnchors?['all-authoritative-cad-bim-geometry']:[];
 return {mode:req.requestedMode,changes,preserve,targets:req.targetIds};
}
