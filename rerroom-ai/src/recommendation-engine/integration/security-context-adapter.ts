import type { RecommendationRequest } from "../core/types";

export interface AIAccessContext {
  consentGranted: boolean;
  allowHistory: boolean;
  allowRemoteModel: boolean;
  allowShopping: boolean;
  purpose: "recommendation" | "insight" | "simulation";
}

/** Apply privacy policy before a request reaches the recommendation engine. */
export const applySecurityContext = (
  request: RecommendationRequest,
  access: AIAccessContext,
): RecommendationRequest => {
  if (!access.consentGranted)
    throw new Error("AI processing consent is required before recommendations can be generated.");
  const next: RecommendationRequest = { ...request, preferences: { ...request.preferences } };
  if (!access.allowHistory) {
    next.recentRecommendations = [];
    next.previousInsights = [];
    next.sessionId = undefined;
    next.preferences.historyEnabled = false;
    next.preferences.learningEnabled = false;
  }
  if (!access.allowShopping) {
    next.preferences.shoppingEnabled = false;
    next.catalog = [];
  }
  return next;
};
