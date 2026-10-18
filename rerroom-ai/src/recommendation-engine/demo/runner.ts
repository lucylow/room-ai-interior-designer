import {demoRoom,demoPrefs,demoBudget,demoCatalog} from './data';
import {runPipeline} from '../engine/pipeline';
import {defaultPolicy} from '../policy/recommendation-policy';
export const runDemo=async()=>{const result=await runPipeline({room:demoRoom,preferences:demoPrefs,budget:demoBudget,catalog:demoCatalog,maxRecommendations:10,userPrompt:'Make the living room warmer and easier to organize.'},defaultPolicy);console.log(JSON.stringify({recommendations:result.recommendations.slice(0,5),insights:result.insights.slice(0,6),metrics:result.metrics,warnings:result.warnings},null,2));return result;};
void runDemo();
