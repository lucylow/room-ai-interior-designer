import type { PreferenceExample } from "../core/types";
import {  provenance } from "../core/factories";

export const PREFERENCE_BATCH_01: PreferenceExample[] = [
  {
    id: "v10_preference_01_00", roomType: "nursery", candidateA: "art deco with Soft Taupe and microcement", candidateB: "new nordic with Mist Blue and microcement", preferred: "tie",
    preferenceDimensions: { style: 0.7, palette: 0.6, layout: 0.68, comfort: 0.72, budget: 0.55 },
    explanation: "Preference is driven by stretching and recovery; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 800, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91000),
  },
  {
    id: "v10_preference_01_01", roomType: "media_room", candidateA: "bohemian with Sage Olive and wool", candidateB: "contemporary with Nordic Fog and wool", preferred: "A",
    preferenceDimensions: { style: 0.76, palette: 0.6699999999999999, layout: 0.76, comfort: 0.76, budget: 0.6000000000000001 },
    explanation: "Preference is driven by after-school study; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 975, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91001),
  },
  {
    id: "v10_preference_01_02", roomType: "reading_nook", candidateA: "modern with Oatmeal Charcoal and fluted glass", candidateB: "minimalist with Navy Linen and fluted glass", preferred: "A",
    preferenceDimensions: { style: 0.82, palette: 0.74, layout: 0.8400000000000001, comfort: 0.7999999999999999, budget: 0.65 },
    explanation: "Preference is driven by remote work; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1150, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91002),
  },
  {
    id: "v10_preference_01_03", roomType: "basement", candidateA: "desert modern with Warm White Sand and walnut", candidateB: "moody modern with Mushroom Cream and walnut", preferred: "B",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.81, layout: 0.68, comfort: 0.84, budget: 0.7000000000000001 },
    explanation: "Preference is driven by daily organization; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1325, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91003),
  },
  {
    id: "v10_preference_01_04", roomType: "living_room", candidateA: "quiet luxury with Ink + Brass and brushed brass", candidateB: "coastal modern with Clay Terracotta and brushed brass", preferred: "A",
    preferenceDimensions: { style: 0.7, palette: 0.88, layout: 0.76, comfort: 0.88, budget: 0.75 },
    explanation: "Preference is driven by weekend brunch; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1500, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91004),
  },
  {
    id: "v10_preference_01_05", roomType: "kitchen", candidateA: "industrial with Cedar Cream and boucle", candidateB: "japandi with Soft Taupe and boucle", preferred: "A",
    preferenceDimensions: { style: 0.76, palette: 0.6, layout: 0.8400000000000001, comfort: 0.9199999999999999, budget: 0.8 },
    explanation: "Preference is driven by hosting friends; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1675, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91005),
  },
  {
    id: "v10_preference_01_06", roomType: "home_office", candidateA: "craft modern with Forest Stone and rattan", candidateB: "heritage modern with Sage Olive and rattan", preferred: "B",
    preferenceDimensions: { style: 0.82, palette: 0.6699999999999999, layout: 0.68, comfort: 0.72, budget: 0.8500000000000001 },
    explanation: "Preference is driven by quiet reading; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1850, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91006),
  },
  {
    id: "v10_preference_01_07", roomType: "bathroom", candidateA: "transitional with Mist Blue and light oak", candidateB: "art deco with Oatmeal Charcoal and light oak", preferred: "A",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.74, layout: 0.76, comfort: 0.76, budget: 0.55 },
    explanation: "Preference is driven by creative making; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 2025, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91007),
  },
  {
    id: "v10_preference_01_08", roomType: "studio", candidateA: "organic modern with Nordic Fog and ash", candidateB: "bohemian with Warm White Sand and ash", preferred: "A",
    preferenceDimensions: { style: 0.7, palette: 0.81, layout: 0.8400000000000001, comfort: 0.7999999999999999, budget: 0.6000000000000001 },
    explanation: "Preference is driven by morning routines; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 2200, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91008),
  },
  {
    id: "v10_preference_01_09", roomType: "guest_room", candidateA: "naturalist with Navy Linen and travertine", candidateB: "modern with Ink + Brass and travertine", preferred: "B",
    preferenceDimensions: { style: 0.76, palette: 0.88, layout: 0.68, comfort: 0.84, budget: 0.65 },
    explanation: "Preference is driven by family movie night; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 800, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91009),
  },
  {
    id: "v10_preference_01_10", roomType: "mudroom", candidateA: "soft industrial with Mushroom Cream and linen", candidateB: "desert modern with Cedar Cream and linen", preferred: "A",
    preferenceDimensions: { style: 0.82, palette: 0.6, layout: 0.76, comfort: 0.88, budget: 0.7000000000000001 },
    explanation: "Preference is driven by stretching and recovery; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 975, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91010),
  },
  {
    id: "v10_preference_01_11", roomType: "open_plan", candidateA: "warm minimal with Clay Terracotta and ceramic", candidateB: "quiet luxury with Forest Stone and ceramic", preferred: "A",
    preferenceDimensions: { style: 0.8799999999999999, palette: 0.6699999999999999, layout: 0.8400000000000001, comfort: 0.9199999999999999, budget: 0.75 },
    explanation: "Preference is driven by after-school study; the selected concept better supports circulation, visual calm, and the stated room goal.",
    budgetCad: 1150, context: ["mobile_demo", "first_pass", "style_filter", "budget_context"], provenance: provenance(91011),
  },
];
