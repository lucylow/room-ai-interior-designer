
import {runCreativeGenerativeAI,refineCreativeGenerativeAI,creativeGenerativeSummary} from '../generative-design/creative-generative-ai-v3';
import {mockIntent,MOCK_ROOM,mockFeedback} from '../generative-design/mock/data';
export async function runCreativeDemo(){
 const request={intent:mockIntent,room:MOCK_ROOM,candidateCount:6,feedback:mockFeedback,now:1701000000000};
 const summary=creativeGenerativeSummary(request);
 const result=await runCreativeGenerativeAI(request);
 const refined=result.selected?refineCreativeGenerativeAI(result.selected,'Make it warmer and less cluttered'):undefined;
 return {summary,result:{concepts:result.concepts.map(c=>({id:c.id,style:c.styleId,palette:c.paletteId,score:Number(c.score.toFixed(3)),confidence:Number(c.confidence.toFixed(3))})),insights:result.insights.map(i=>i.title),metrics:result.metrics,warnings:result.warnings},refined:refined?{id:refined.id,title:refined.title,score:Number(refined.score.toFixed(3))}:undefined};
}
