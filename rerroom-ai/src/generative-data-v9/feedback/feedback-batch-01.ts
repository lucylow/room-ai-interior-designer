import type { FeedbackRecord } from "../core/types";

export const FEEDBACK_BATCH_01: FeedbackRecord[] = [
  {
    id: "feedback-v9-0001",
    conceptId: "concept-v9-0002",
    action: "reject",
    dimension: "layout",
    comment: "The concept feels too busy relative to the requested restraint.",
    delta: -0.165,
    sessionTurn: 2
  },
  {
    id: "feedback-v9-0002",
    conceptId: "concept-v9-0003",
    action: "save",
    dimension: "furniture",
    comment: "Save this version as a reference before testing another palette.",
    delta: -0.110,
    sessionTurn: 3
  },
  {
    id: "feedback-v9-0003",
    conceptId: "concept-v9-0004",
    action: "refine",
    dimension: "budget",
    comment: "Keep the layout but warm the materials and lighting.",
    delta: -0.055,
    sessionTurn: 4
  },
  {
    id: "feedback-v9-0004",
    conceptId: "concept-v9-0005",
    action: "swap",
    dimension: "palette",
    comment: "Replace the main seating piece with a smaller silhouette.",
    delta: 0.000,
    sessionTurn: 5
  },
  {
    id: "feedback-v9-0005",
    conceptId: "concept-v9-0006",
    action: "compare",
    dimension: "lighting",
    comment: "Compare this against the lighter version side by side.",
    delta: 0.055,
    sessionTurn: 6
  },
  {
    id: "feedback-v9-0006",
    conceptId: "concept-v9-0007",
    action: "accept",
    dimension: "material",
    comment: "This direction keeps the room recognizable and feels cohesive.",
    delta: 0.110,
    sessionTurn: 7
  },
  {
    id: "feedback-v9-0007",
    conceptId: "concept-v9-0008",
    action: "reject",
    dimension: "style",
    comment: "The concept feels too busy relative to the requested restraint.",
    delta: 0.165,
    sessionTurn: 8
  },
  {
    id: "feedback-v9-0008",
    conceptId: "concept-v9-0009",
    action: "save",
    dimension: "layout",
    comment: "Save this version as a reference before testing another palette.",
    delta: 0.220,
    sessionTurn: 1
  },
  {
    id: "feedback-v9-0009",
    conceptId: "concept-v9-0010",
    action: "refine",
    dimension: "furniture",
    comment: "Keep the layout but warm the materials and lighting.",
    delta: -0.220,
    sessionTurn: 2
  },
  {
    id: "feedback-v9-0010",
    conceptId: "concept-v9-0011",
    action: "swap",
    dimension: "budget",
    comment: "Replace the main seating piece with a smaller silhouette.",
    delta: -0.165,
    sessionTurn: 3
  },
  {
    id: "feedback-v9-0011",
    conceptId: "concept-v9-0012",
    action: "compare",
    dimension: "palette",
    comment: "Compare this against the lighter version side by side.",
    delta: -0.110,
    sessionTurn: 4
  },
  {
    id: "feedback-v9-0012",
    conceptId: "concept-v9-0013",
    action: "accept",
    dimension: "lighting",
    comment: "This direction keeps the room recognizable and feels cohesive.",
    delta: -0.055,
    sessionTurn: 5
  },
];
