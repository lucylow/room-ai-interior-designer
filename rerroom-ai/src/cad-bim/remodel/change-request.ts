import { AuthoritativeModel, RemodelChangeRequest, AnchorReference } from '../core/types';
export class ChangeRequestParser {
  parse(prompt:string,model:AuthoritativeModel,selectedFeatureIds:string[]=[]):RemodelChangeRequest{
    const actions:Array<{action:string;target?:string;value?:string|number}>=[]; const lower=prompt.toLowerCase();
    if(/paint|color|colour|wall color/.test(lower)) actions.push({action:'change-finish',value:extractAfter(prompt,['paint','color','colour'])});
    if(/move|shift|reposition/.test(lower)) actions.push({action:'move-proposal',value:extractAfter(prompt,['move','shift','reposition'])});
    if(/replace|swap/.test(lower)) actions.push({action:'replace-aesthetic',value:extractAfter(prompt,['replace','swap'])});
    if(/bigger|larger|smaller|resize/.test(lower)) actions.push({action:'resize-proposal',value:extractAfter(prompt,['bigger','larger','smaller','resize'])});
    const anchors:AnchorReference[]=selectedFeatureIds.map(id=>({sourceDocumentId:model.document.id,sourceFeatureId:id,confidence:1}));
    return {id:`change_${Date.now()}`,prompt,requestedAt:new Date().toISOString(),targetAnchors:anchors,parsedActions:actions,preservesGeometry:true};
  }
}
function extractAfter(prompt:string,words:string[]):string{const p=prompt.toLowerCase();for(const w of words){const i=p.indexOf(w);if(i>=0)return prompt.slice(i+w.length).trim();}return '';}
