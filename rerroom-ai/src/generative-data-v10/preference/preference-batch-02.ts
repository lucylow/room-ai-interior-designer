import type { PreferenceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const PREFERENCE_BATCH_02: PreferenceExample[] = [
  {
    id: "v10_preference_02_00", roomType: "bedroom", candidateA: "scandinavian with Soft Taupe and white oak", candidateB: "industrial with Mist Blue and white oak", preferred: "B",
    preferenceDimensions: { style: 0.7, palette: 0.74, layout: 0.68, comfort: 0.72, budget: 0.8 },
    explanation: "Preference is driven by remote work; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1325, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91012),
  },
  {
    id: "v10_preference_02_01", roomType: "dining_room", candidateA: "eclectic modern with Sage Olive and blackened steel", candidateB: "craft modern with Nordic Fog and blackened steel", preferred: "A",
    preferenceDimensions: { style: 0.76, palette: 0.81, layout: 0.76, comfort: 0.76, budget: 0.8500000000000001 },
    explanation: "Preference is driven by daily organization; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1500, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91013),
  },
  {
    id: "v10_preference_02_02", roomType: "entryway", candidateA: "modern farmhouse with Oatmeal Charcoal and microcement", candidateB: "transitional with Navy Linen and microcement", preferred: "A",
    preferenceDimensions: { style: 0.82, palette: 0.88, layout: 0.8400000000000001, comfort: 0.7999999999999999, budget: 0.55 },
    explanation: "Preference is driven by weekend brunch; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1675, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91014),
  },
  {
    id: "v10_preference_02_03", roomType: "nursery", candidateA: "mid century with Warm White Sand and wool", candidateB: "organic modern with Mushroom Cream and wool", preferred: "tie",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.6, layout: 0.68, comfort: 0.84, budget: 0.6000000000000001 },
    explanation: "Preference is driven by hosting friends; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1850, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91015),
  },
  {
    id: "v10_preference_02_04", roomType: "media_room", candidateA: "urban soft with Ink + Brass and fluted glass", candidateB: "naturalist with Clay Terracotta and fluted glass", preferred: "A",
    preferenceDimensions: { style: 0.7, palette: 0.6699999999999999, layout: 0.76, comfort: 0.88, budget: 0.65 },
    explanation: "Preference is driven by quiet reading; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 2025, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91016),
  },
  {
    id: "v10_preference_02_05", roomType: "reading_nook", candidateA: "new nordic with Cedar Cream and walnut", candidateB: "soft industrial with Soft Taupe and walnut", preferred: "A",
    preferenceDimensions: { style: 0.76, palette: 0.74, layout: 0.8400000000000001, comfort: 0.9199999999999999, budget: 0.7000000000000001 },
    explanation: "Preference is driven by creative making; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 2200, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91017),
  },
  {
    id: "v10_preference_02_06", roomType: "basement", candidateA: "contemporary with Forest Stone and brushed brass", candidateB: "warm minimal with Sage Olive and brushed brass", preferred: "B",
    preferenceDimensions: { style: 0.82, palette: 0.81, layout: 0.68, comfort: 0.72, budget: 0.75 },
    explanation: "Preference is driven by morning routines; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 800, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91018),
  },
  {
    id: "v10_preference_02_07", roomType: "living_room", candidateA: "minimalist with Mist Blue and boucle", candidateB: "scandinavian with Oatmeal Charcoal and boucle", preferred: "A",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.88, layout: 0.76, comfort: 0.76, budget: 0.8 },
    explanation: "Preference is driven by family movie night; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 975, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91019),
  },
  {
    id: "v10_preference_02_08", roomType: "kitchen", candidateA: "moody modern with Nordic Fog and rattan", candidateB: "eclectic modern with Warm White Sand and rattan", preferred: "A",
    preferenceDimensions: { style: 0.7, palette: 0.6, layout: 0.8400000000000001, comfort: 0.7999999999999999, budget: 0.8500000000000001 },
    explanation: "Preference is driven by stretching and recovery; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1150, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91020),
  },
  {
    id: "v10_preference_02_09", roomType: "home_office", candidateA: "coastal modern with Navy Linen and light oak", candidateB: "modern farmhouse with Ink + Brass and light oak", preferred: "B",
    preferenceDimensions: { style: 0.76, palette: 0.6699999999999999, layout: 0.68, comfort: 0.84, budget: 0.55 },
    explanation: "Preference is driven by after-school study; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1325, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91021),
  },
  {
    id: "v10_preference_02_10", roomType: "bathroom", candidateA: "japandi with Mushroom Cream and ash", candidateB: "mid century with Cedar Cream and ash", preferred: "A",
    preferenceDimensions: { style: 0.82, palette: 0.74, layout: 0.76, comfort: 0.88, budget: 0.6000000000000001 },
    explanation: "Preference is driven by remote work; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1500, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91022),
  },
  {
    id: "v10_preference_02_11", roomType: "studio", candidateA: "heritage modern with Clay Terracotta and travertine", candidateB: "urban soft with Forest Stone and travertine", preferred: "A",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.81, layout: 0.8400000000000001, comfort: 0.9199999999999999, budget: 0.65 },
    explanation: "Preference is driven by daily organization; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1675, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91023),
  },
];
