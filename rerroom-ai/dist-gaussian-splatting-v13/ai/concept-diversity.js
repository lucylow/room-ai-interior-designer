"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONCEPT_DIVERSITY_VERSION = void 0;
exports.concept_diversity_mean = concept_diversity_mean;
exports.concept_diversity_variance = concept_diversity_variance;
exports.concept_diversity_trend = concept_diversity_trend;
exports.concept_diversity_score = concept_diversity_score;
exports.concept_diversity_actions = concept_diversity_actions;
exports.concept_diversity_result = concept_diversity_result;
exports.concept_diversity_window = concept_diversity_window;
exports.concept_diversity_robust = concept_diversity_robust;
exports.concept_diversity_seed = concept_diversity_seed;
exports.concept_diversity_sampleScene = concept_diversity_sampleScene;
exports.concept_diversity_distance = concept_diversity_distance;
exports.concept_diversity_frames = concept_diversity_frames;
exports.concept_diversity_gaussians = concept_diversity_gaussians;
exports.concept_diversity_recommendation = concept_diversity_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function concept_diversity_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function concept_diversity_variance(values = []) {
    if (!values.length)
        return 0;
    const m = concept_diversity_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function concept_diversity_trend(values = []) {
    if (values.length < 2)
        return 0;
    let total = 0, weight = 0;
    for (let i = 1; i < values.length; i++) {
        const w = i;
        total += (values[i] - values[i - 1]) * w;
        weight += w;
    }
    return total / (weight || 1);
}
function concept_diversity_score(values = [], threshold = .65, weight = 1) {
    const mean = concept_diversity_mean(values);
    const variance = concept_diversity_variance(values);
    const trend = concept_diversity_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function concept_diversity_actions(score, warnings = []) {
    if (warnings.length)
        return ['inspect', 'repair'];
    if (score >= .9)
        return ['accept', 'cache'];
    if (score >= .75)
        return ['accept', 'monitor'];
    if (score >= .55)
        return ['refine', 'rescore'];
    return ['recollect', 'reprocess'];
}
function concept_diversity_result(id, values = [], warnings = []) {
    const score = concept_diversity_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `ai-concept-diversity-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: concept_diversity_actions(score, warnings), metrics: { mean: concept_diversity_mean(values), variance: concept_diversity_variance(values), trend: concept_diversity_trend(values), count: values.length }, warnings };
}
function concept_diversity_window(values = [], window = 5) {
    return values.map((_, i) => concept_diversity_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function concept_diversity_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return concept_diversity_mean(core.length ? core : sorted);
}
function concept_diversity_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`ai-concept-diversity:$${id}`), index); }
function concept_diversity_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function concept_diversity_distance(a, b) { return (0, math_1.dist)(a, b); }
function concept_diversity_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function concept_diversity_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function concept_diversity_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.CONCEPT_DIVERSITY_VERSION = 'v13';
