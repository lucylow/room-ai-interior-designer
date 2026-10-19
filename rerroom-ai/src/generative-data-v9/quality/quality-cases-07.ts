import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_07: QualityCase[] = [
  {
    id: "quality-v9-0055",
    prompt: "Demo case 55: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0056",
    prompt: "Demo case 56: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0057",
    prompt: "Demo case 57: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0058",
    prompt: "Demo case 58: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0059",
    prompt: "Demo case 59: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0060",
    prompt: "Demo case 60: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0061",
    prompt: "Demo case 61: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0062",
    prompt: "Demo case 62: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0063",
    prompt: "Demo case 63: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
