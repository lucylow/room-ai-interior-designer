
import type {StyleProfile} from '../../core/types';
export interface StylePanelModel {id:string;name:string;summary:string;keywords:string[];materials:string[];lighting:string[];avoid:string[];}
export function stylePanel(s:StyleProfile):StylePanelModel{return {id:s.id,name:s.name,summary:s.summary,keywords:s.keywords.slice(0,8),materials:s.materials.slice(0,8),lighting:s.lightingTerms.slice(0,6),avoid:s.avoidKeywords.slice(0,6)};}
