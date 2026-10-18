import type {RecommendationRequest,RecommendationSet,Policy} from '../core/types';
import {buildFeatures} from './features';
import {inferGoals} from './goals';
import {collectRules} from './rule-bus';
import {runAgents} from './agent-orchestrator';
import {ensembleRecommendations,ensembleInsights} from './ensemble';
import {generateBaselineInsights} from '../insights/engine';
import {synthesize} from './insight-synthesizer';
import {buildContext} from './context';
import {traceId} from './trace';
import {qualityReport} from './quality';
import {adaptRequest,inferIntent} from './conversation';
import {productRecommendations} from './catalog';
import {budgetAdjust} from './budget';
import {finalRank} from '../ai/ensemble/final-ranker';
import {dataAIGate} from './data-ai-gate';
import {buildDecisionReport} from '../ai/recommendation-decision-report';

export const runPipeline=async(request:RecommendationRequest,policy:Policy):Promise<RecommendationSet>=>{
  const started=Date.now();
  const now=request.now??Date.now();
  const trace=traceId();
  const intent=inferIntent(request.userPrompt);
  const req=adaptRequest(request,intent);
  const features=buildFeatures(req.room,req.preferences,now);
  const goals=inferGoals(req.room,req.preferences);
  const ruleOut=collectRules(req.room,req.preferences);
  const agents=await runAgents(req.room,req.preferences);
  const catalog=req.catalog&&req.preferences.shoppingEnabled
    ?productRecommendations(req.catalog,req.room,req.preferences,req.budget)
    :[];
  const ctx=buildContext(
    req.room,
    req.preferences,
    req.budget,
    goals,
    features,
    agents.signals,
    request.userPrompt?.split(/\s+/).slice(0,16)??[]
  );

  const raw=[...ruleOut.recommendations,...agents.recommendations,...catalog];
  let recommendations=ensembleRecommendations(
    raw,
    ctx.room,
    ctx.preferences,
    ctx.budget,
    req.maxRecommendations??12
  );
  recommendations=budgetAdjust(recommendations,ctx.preferences,ctx.budget);
  recommendations=finalRank(
    recommendations,
    ctx.preferences,
    {limit:req.maxRecommendations??12,maxPerCategory:3}
  );

  const baseline=generateBaselineInsights(ctx.room,ctx.preferences,now);
  let insights=ensembleInsights([...baseline,...ruleOut.insights,...agents.insights]);
  insights=synthesize(insights,recommendations).slice(0,18);

  const gated=dataAIGate(ctx.room,recommendations,insights,policy);
  recommendations=gated.recommendations;
  insights=gated.insights.slice(0,16);

  const quality=qualityReport(ctx.room,recommendations,insights);
  const decision=buildDecisionReport(ctx.room,recommendations,insights,ctx.preferences);
  const warnings=[...new Set([...gated.warnings,...quality.warnings])];

  return {
    recommendations,
    insights,
    assumptions:[
      'Scores are deterministic local-model estimates unless a remote provider is explicitly supplied.',
      'Spatial quality depends on measurement confidence.',
      'AI suggestions are previews and should be validated in the 2D/3D visualization before physical changes.'
    ],
    blockedIdeas:policy.allowConstruction?[]:['Construction actions are disabled by policy.'],
    generatedAt:now,
    engineVersion:'ai-reco-3.0',
    traceId:trace,
    metrics:{
      durationMs:Date.now()-started,
      quality:quality.confidence,
      agentConfidence:agents.confidence,
      intentConfidence:intent.confidence,
      dataScore:gated.dataScore,
      decisionConfidence:decision.confidence,
      evidenceCoverage:decision.evidenceCoverage,
      recommendationCount:recommendations.length,
      insightCount:insights.length,
      finalImpact:decision.impact
    },
    warnings
  };
};
