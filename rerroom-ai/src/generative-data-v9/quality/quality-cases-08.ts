import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_08: QualityCase[] = [
  {
    id: "quality-v9-0064",
    prompt: "Demo case 64: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0065",
    prompt: "Demo case 65: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0066",
    prompt: "Demo case 66: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0067",
    prompt: "Demo case 67: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0068",
    prompt: "Demo case 68: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0069",
    prompt: "Demo case 69: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0070",
    prompt: "Demo case 70: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0071",
    prompt: "Demo case 71: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0072",
    prompt: "Demo case 72: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
