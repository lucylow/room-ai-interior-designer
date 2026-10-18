import type {UserPreferences} from '../core/types';import {hashEmbedding,cosine} from '../learning/embedding';
export interface PreferenceEmbedding {vector:number[];labels:string[];createdAt:number;}
export const encodePreferences=(p:UserPreferences):PreferenceEmbedding=>{const labels=[...p.preferredStyles,...p.preferredColors,...p.materials,...p.priorities,...p.householdNeeds];return {vector:hashEmbedding(labels.join(' ')),labels,createdAt:Date.now()};};
export const preferenceSimilarity=(a:PreferenceEmbedding,b:PreferenceEmbedding)=>cosine(a.vector,b.vector);
