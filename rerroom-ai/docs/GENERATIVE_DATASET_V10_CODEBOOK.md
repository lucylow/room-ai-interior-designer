# RE:ROOM AI — GENERATIVE DATASET V10 CODEBOOK

## Purpose
V10 is a technical mock-data continuation for model development, offline evaluation, deterministic demos, and AI feature integration. It extends the V9 dataset layer with more structured multimodal, preference, critique, grounding, safety, tool-use, retail, and project-context records.

## Primary families

### Multimodal generation
Combines text intent with synthetic image/depth/mask/2D/3D/CAD/BIM asset references and spatial truth.

### Preference
Pairwise A/B records representing style, palette, layout, comfort, and budget preferences.

### Critique
Structured design-review records covering style drift, layout conflicts, scale mismatch, palette noise, material clashes, lighting errors, geometry drift, and budget errors.

### Counterfactual
Before/after interventions where only a targeted creative variable changes while architectural invariants remain preserved.

### Spatial + CAD/BIM grounding
Records that test whether an AI concept respects doors, windows, wall boundaries, circulation, dimensions, and source-model authority.

### Tool traces
Synthetic tool-use sequences for retrieval, spatial checks, concept generation, and policy validation.

### Quality
Rubric-based evaluations for composition, style, geometry, usability, budget, groundedness, precision and calibration.

### Safety
Mock cases for privacy leakage, prompt injection, unsupported construction claims, unsafe construction guidance, and secret exposure.

### Dialogue
Multi-turn user/assistant refinement sequences with explicit intent transitions.

### Retail grounding
Synthetic buyable-item records linking product role, dimensions, style tags, price, placement, and fit status.

### Evaluation
Benchmark-oriented fixtures for style alignment, palette control, geometry preservation, layout reasoning, retail grounding, and iterative refinement.

### Augmentation
Deterministic transformations such as paraphrase, palette swap, style-neighbor swap, camera/lighting variation, and added spatial constraints.

### Project context
Iterative project-phase examples that preserve CAD/BIM source revision and layer aesthetic changes non-destructively.

## Provenance
Every record is synthetic and carries a deterministic seed, generator name, dataset version, timestamp, PII-free flag, and license-safe flag.

## Split policy
Generation/project examples use deterministic train, validation, test, and challenge splits. The split helper is stable by record index for reproducible demo runs.

## Production migration
Real user data should only replace synthetic fixtures after consent, rights review, redaction, schema validation, leakage checks, and human review. Keep the V10 schema and provenance boundary stable while swapping data sources.
