import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_04: QualityCase[] = [
  {
    id: "quality-v9-0028",
    prompt: "Demo case 28: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0029",
    prompt: "Demo case 29: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0030",
    prompt: "Demo case 30: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0031",
    prompt: "Demo case 31: generate a refined nursery while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0032",
    prompt: "Demo case 32: generate a refined studio while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0033",
    prompt: "Demo case 33: generate a refined media room while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0034",
    prompt: "Demo case 34: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0035",
    prompt: "Demo case 35: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0036",
    prompt: "Demo case 36: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
