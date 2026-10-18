import { AuthoritativeModel } from '../../core/types';
export function finalizeDxfModel(model:AuthoritativeModel):AuthoritativeModel { return {...model,features:model.features.map(f=>({...f,sourceDocumentId:model.document.id})),anchors:model.features.map(f=>({sourceDocumentId:model.document.id,sourceFeatureId:f.id,confidence:1}))}; }
