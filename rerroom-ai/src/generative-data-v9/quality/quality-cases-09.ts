import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_09: QualityCase[] = [
  {
    id: "quality-v9-0073",
    prompt: "Demo case 73: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0074",
    prompt: "Demo case 74: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0075",
    prompt: "Demo case 75: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0076",
    prompt: "Demo case 76: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0077",
    prompt: "Demo case 77: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0078",
    prompt: "Demo case 78: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0079",
    prompt: "Demo case 79: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0080",
    prompt: "Demo case 80: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0081",
    prompt: "Demo case 81: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
