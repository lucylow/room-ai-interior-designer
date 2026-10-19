import type { QualityCase } from "../core/types";

export const QUALITY_BATCH_06: QualityCase[] = [
  {
    id: "quality-v9-0046",
    prompt: "Demo case 46: generate a refined guest room while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0047",
    prompt: "Demo case 47: generate a refined reading nook while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0048",
    prompt: "Demo case 48: generate a refined living room while preserving all authoritative geometry.",
    predictedIssue: "unsupported_claim",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected unsupported claim", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0049",
    prompt: "Demo case 49: generate a refined bedroom while preserving all authoritative geometry.",
    predictedIssue: "duplicate_furniture",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected duplicate furniture", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0050",
    prompt: "Demo case 50: generate a refined kitchen while preserving all authoritative geometry.",
    predictedIssue: "geometry_drift",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected geometry drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0051",
    prompt: "Demo case 51: generate a refined dining room while preserving all authoritative geometry.",
    predictedIssue: "palette_conflict",
    severity: "critical",
    expectedAction: "block",
    evidence: ["detected palette conflict", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0052",
    prompt: "Demo case 52: generate a refined home office while preserving all authoritative geometry.",
    predictedIssue: "style_drift",
    severity: "low",
    expectedAction: "flag",
    evidence: ["detected style drift", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0053",
    prompt: "Demo case 53: generate a refined entryway while preserving all authoritative geometry.",
    predictedIssue: "clearance_risk",
    severity: "medium",
    expectedAction: "flag",
    evidence: ["detected clearance risk", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
  {
    id: "quality-v9-0054",
    prompt: "Demo case 54: generate a refined bathroom while preserving all authoritative geometry.",
    predictedIssue: "budget_violation",
    severity: "high",
    expectedAction: "repair",
    evidence: ["detected budget violation", "compare sourceSceneVersion to candidateVersion", "inspect generated rationale"]
  },
];
