import { RevenueProduct } from './types';
export const V10_CATALOG: RevenueProduct[] = [
 {id:'com.reroom.ai.plus.monthly',name:'RE:ROOM Plus',tier:'plus',kind:'subscription',price:{amount:7.99,currency:'USD'},period:'month',featureIds:['ai_generation','design_templates','retail_shopping'],rank:10},
 {id:'com.reroom.ai.plus.yearly',name:'RE:ROOM Plus Annual',tier:'plus',kind:'subscription',price:{amount:59.99,currency:'USD'},period:'year',featureIds:['ai_generation','design_templates','retail_shopping'],rank:9},
 {id:'com.reroom.ai.pro.monthly',name:'RE:ROOM Pro',tier:'pro',kind:'subscription',price:{amount:14.99,currency:'USD'},period:'month',featureIds:['ai_generation','advanced_ai','hd_render','project_exports','retail_shopping'],rank:8},
 {id:'com.reroom.ai.pro.yearly',name:'RE:ROOM Pro Annual',tier:'pro',kind:'subscription',price:{amount:119.99,currency:'USD'},period:'year',featureIds:['ai_generation','advanced_ai','hd_render','gaussian_splats','project_exports','retail_shopping'],rank:7},
 {id:'com.reroom.ai.studio.monthly',name:'RE:ROOM Studio',tier:'studio',kind:'subscription',price:{amount:29.99,currency:'USD'},period:'month',featureIds:['ai_generation','advanced_ai','hd_render','gaussian_splats','cad_bim_tools','project_exports','team_projects','priority_support','unlimited_projects','commercial_use','design_templates','retail_shopping'],rank:6},
 {id:'com.reroom.ai.render.credits.10',name:'10 HD Render Credits',tier:'pro',kind:'consumable',price:{amount:4.99,currency:'USD'},featureIds:['hd_render'],credits:10,rank:20},
 {id:'com.reroom.ai.render.credits.50',name:'50 HD Render Credits',tier:'pro',kind:'consumable',price:{amount:16.99,currency:'USD'},featureIds:['hd_render'],credits:50,rank:19},
 {id:'com.reroom.ai.generation.credits.25',name:'25 AI Design Credits',tier:'plus',kind:'consumable',price:{amount:2.99,currency:'USD'},featureIds:['ai_generation','advanced_ai'],credits:25,rank:18},
 {id:'com.reroom.ai.cad.export',name:'CAD Export Pack',tier:'pro',kind:'non-consumable',price:{amount:9.99,currency:'USD'},featureIds:['cad_bim_tools','project_exports'],rank:17},
 {id:'com.reroom.ai.commercial',name:'Commercial Use Unlock',tier:'studio',kind:'non-consumable',price:{amount:49.99,currency:'USD'},featureIds:['commercial_use'],rank:16},
];
