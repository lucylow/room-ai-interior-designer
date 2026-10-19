import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_02: QualityCase[] = [
  {
    id: "quality-v9-0010",
    prompt: "Demo case 10: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0011",
    prompt: "Demo case 11: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0012",
    prompt: "Demo case 12: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0013",
    prompt: "Demo case 13: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0014",
    prompt: "Demo case 14: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0015",
    prompt: "Demo case 15: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0016",
    prompt: "Demo case 16: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0017",
    prompt: "Demo case 17: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0018",
    prompt: "Demo case 18: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
