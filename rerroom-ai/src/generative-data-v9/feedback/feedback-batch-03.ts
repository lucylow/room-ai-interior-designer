import type { FeedbackRecord } from "../core/types";

export const FEEDBACK_BATCH_03: FeedbackRecord[] = [
  {
    id: "feedback-v9-0025",
    conceptId: "concept-v9-0026",
    action: "reject",
    dimension: "palette",
    comment: "The concept feels too busy relative to the requested restraint.",
    delta: 0.165,
    sessionTurn: 2
  },
  {
    id: "feedback-v9-0026",
    conceptId: "concept-v9-0027",
    action: "save",
    dimension: "lighting",
    comment: "Save this version as a reference before testing another palette.",
    delta: 0.220,
    sessionTurn: 3
  },
  {
    id: "feedback-v9-0027",
    conceptId: "concept-v9-0028",
    action: "refine",
    dimension: "material",
    comment: "Keep the layout but warm the materials and lighting.",
    delta: -0.220,
    sessionTurn: 4
  },
  {
    id: "feedback-v9-0028",
    conceptId: "concept-v9-0029",
    action: "swap",
    dimension: "style",
    comment: "Replace the main seating piece with a smaller silhouette.",
    delta: -0.165,
    sessionTurn: 5
  },
  {
    id: "feedback-v9-0029",
    conceptId: "concept-v9-0030",
    action: "compare",
    dimension: "layout",
    comment: "Compare this against the lighter version side by side.",
    delta: -0.110,
    sessionTurn: 6
  },
  {
    id: "feedback-v9-0030",
    conceptId: "concept-v9-0031",
    action: "accept",
    dimension: "furniture",
    comment: "This direction keeps the room recognizable and feels cohesive.",
    delta: -0.055,
    sessionTurn: 7
  },
  {
    id: "feedback-v9-0031",
    conceptId: "concept-v9-0032",
    action: "reject",
    dimension: "budget",
    comment: "The concept feels too busy relative to the requested restraint.",
    delta: 0.000,
    sessionTurn: 8
  },
  {
    id: "feedback-v9-0032",
    conceptId: "concept-v9-0033",
    action: "save",
    dimension: "palette",
    comment: "Save this version as a reference before testing another palette.",
    delta: 0.055,
    sessionTurn: 1
  },
  {
    id: "feedback-v9-0033",
    conceptId: "concept-v9-0034",
    action: "refine",
    dimension: "lighting",
    comment: "Keep the layout but warm the materials and lighting.",
    delta: 0.110,
    sessionTurn: 2
  },
  {
    id: "feedback-v9-0034",
    conceptId: "concept-v9-0035",
    action: "swap",
    dimension: "material",
    comment: "Replace the main seating piece with a smaller silhouette.",
    delta: 0.165,
    sessionTurn: 3
  },
  {
    id: "feedback-v9-0035",
    conceptId: "concept-v9-0036",
    action: "compare",
    dimension: "style",
    comment: "Compare this against the lighter version side by side.",
    delta: 0.220,
    sessionTurn: 4
  },
  {
    id: "feedback-v9-0036",
    conceptId: "concept-v9-0037",
    action: "accept",
    dimension: "layout",
    comment: "This direction keeps the room recognizable and feels cohesive.",
    delta: -0.220,
    sessionTurn: 5
  },
];
