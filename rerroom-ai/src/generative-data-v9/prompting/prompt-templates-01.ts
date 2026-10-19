export const PROMPT_TEMPLATE_BATCH_01: ReadonlyArray<{ id: string; intent: string; template: string; negative: string[]; expectedSignals: string[] }> = [
  {
    id: "prompt-v9-0001",
    intent: "refinement",
    template: "A bohemian bedroom using forest moss with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0002",
    intent: "palette_change",
    template: "A art deco kitchen using terracotta oak with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0003",
    intent: "layout_advice",
    template: "A heritage modern dining room using olive cream with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0004",
    intent: "shopping_concept",
    template: "A japandi home office using sandstone with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0005",
    intent: "generation",
    template: "A coastal modern entryway using forest moss with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0006",
    intent: "refinement",
    template: "A moody modern bathroom using terracotta oak with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0007",
    intent: "palette_change",
    template: "A minimalist nursery using olive cream with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0008",
    intent: "layout_advice",
    template: "A contemporary studio using sandstone with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0009",
    intent: "shopping_concept",
    template: "A new nordic media room using forest moss with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0010",
    intent: "generation",
    template: "A urban soft guest room using terracotta oak with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0011",
    intent: "refinement",
    template: "A mid century reading nook using olive cream with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0012",
    intent: "palette_change",
    template: "A modern farmhouse living room using sandstone with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0013",
    intent: "layout_advice",
    template: "A eclectic modern bedroom using forest moss with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
  {
    id: "prompt-v9-0014",
    intent: "shopping_concept",
    template: "A scandinavian kitchen using terracotta oak with grounded proportions, realistic materials, coherent lighting, and preserved architecture. User request: {user_request}.",
    negative: ["geometry drift", "duplicate objects", "unanchored openings", "unexplained luxury claims"],
    expectedSignals: ["room identity", "style match", "palette match", "spatial preservation"]
  },
];
