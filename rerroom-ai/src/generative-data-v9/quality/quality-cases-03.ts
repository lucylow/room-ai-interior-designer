import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_03: QualityCase[] = [
  {
    id: "quality-v9-0019",
    prompt: "Demo case 19: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0020",
    prompt: "Demo case 20: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0021",
    prompt: "Demo case 21: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0022",
    prompt: "Demo case 22: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0023",
    prompt: "Demo case 23: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0024",
    prompt: "Demo case 24: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0025",
    prompt: "Demo case 25: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0026",
    prompt: "Demo case 26: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0027",
    prompt: "Demo case 27: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
