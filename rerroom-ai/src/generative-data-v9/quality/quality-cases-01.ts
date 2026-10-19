import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_01: QualityCase[] = [
  {
    id: "quality-v9-0001",
    prompt: "Demo case 1: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0002",
    prompt: "Demo case 2: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0003",
    prompt: "Demo case 3: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0004",
    prompt: "Demo case 4: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0005",
    prompt: "Demo case 5: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0006",
    prompt: "Demo case 6: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0007",
    prompt: "Demo case 7: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0008",
    prompt: "Demo case 8: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0009",
    prompt: "Demo case 9: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
