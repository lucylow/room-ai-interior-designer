import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_10: QualityCase[] = [
  {
    id: "quality-v9-0082",
    prompt: "Demo case 82: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0083",
    prompt: "Demo case 83: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0084",
    prompt: "Demo case 84: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0085",
    prompt: "Demo case 85: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0086",
    prompt: "Demo case 86: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0087",
    prompt: "Demo case 87: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0088",
    prompt: "Demo case 88: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0089",
    prompt: "Demo case 89: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0090",
    prompt: "Demo case 90: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
