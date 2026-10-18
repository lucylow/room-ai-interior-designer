import type {DesignConcept,DesignFeedback,VisualEdit} from '../core/types';
export interface RefinementDiff{edits:VisualEdit[];summary:string;preserved:string[];removed:string[];}
export const diffConcept=(before:DesignConcept,feedback:DesignFeedback):RefinementDiff=>{
 const edits:VisualEdit[]=[]; const preserved=['source architecture','room dimensions','door and window positions']; const removed:string[]=[];
 if(feedback.styleOverride)edits.push({id:'style-edit',kind:'style',description:`Switch to ${feedback.styleOverride}`,values:{style:feedback.styleOverride},reversible:true});
 if(feedback.paletteOverride)edits.push({id:'palette-edit',kind:'color',description:`Switch palette to ${feedback.paletteOverride}`,values:{palette:feedback.paletteOverride},reversible:true});
 if(feedback.action==='reroll')edits.push({id:'reroll',kind:'style',description:'Generate an alternate aesthetic interpretation',values:{reroll:true},reversible:true});
 if(feedback.action==='refine')edits.push({id:'refine',kind:'material',description:'Increase material specificity without changing geometry',values:{materialDetail:'high'},reversible:true});
 return {edits,summary:edits.length?`${edits.length} reversible visual edits queued.`:'No visual edits requested.',preserved,removed};
};
