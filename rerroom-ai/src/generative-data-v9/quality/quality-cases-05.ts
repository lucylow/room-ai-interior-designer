import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_05: QualityCase[] = [
  {
    id: "quality-v9-0037",
    prompt: "Demo case 37: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0038",
    prompt: "Demo case 38: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0039",
    prompt: "Demo case 39: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0040",
    prompt: "Demo case 40: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0041",
    prompt: "Demo case 41: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0042",
    prompt: "Demo case 42: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0043",
    prompt: "Demo case 43: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0044",
    prompt: "Demo case 44: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0045",
    prompt: "Demo case 45: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
