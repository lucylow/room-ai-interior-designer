"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVISIT_PLANNER_VERSION = void 0;
exports.revisit_planner_mean = revisit_planner_mean;
exports.revisit_planner_variance = revisit_planner_variance;
exports.revisit_planner_trend = revisit_planner_trend;
exports.revisit_planner_score = revisit_planner_score;
exports.revisit_planner_actions = revisit_planner_actions;
exports.revisit_planner_result = revisit_planner_result;
exports.revisit_planner_window = revisit_planner_window;
exports.revisit_planner_robust = revisit_planner_robust;
exports.revisit_planner_seed = revisit_planner_seed;
exports.revisit_planner_sampleScene = revisit_planner_sampleScene;
exports.revisit_planner_distance = revisit_planner_distance;
exports.revisit_planner_frames = revisit_planner_frames;
exports.revisit_planner_gaussians = revisit_planner_gaussians;
exports.revisit_planner_recommendation = revisit_planner_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function revisit_planner_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function revisit_planner_variance(values = []) {
    if (!values.length)
        return 0;
    const m = revisit_planner_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function revisit_planner_trend(values = []) {
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
function revisit_planner_score(values = [], threshold = .65, weight = 1) {
    const mean = revisit_planner_mean(values);
    const variance = revisit_planner_variance(values);
    const trend = revisit_planner_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function revisit_planner_actions(score, warnings = []) {
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
function revisit_planner_result(id, values = [], warnings = []) {
    const score = revisit_planner_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `capture-revisit-planner-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: revisit_planner_actions(score, warnings), metrics: { mean: revisit_planner_mean(values), variance: revisit_planner_variance(values), trend: revisit_planner_trend(values), count: values.length }, warnings };
}
function revisit_planner_window(values = [], window = 5) {
    return values.map((_, i) => revisit_planner_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function revisit_planner_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return revisit_planner_mean(core.length ? core : sorted);
}
function revisit_planner_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`capture-revisit-planner:$${id}`), index); }
function revisit_planner_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function revisit_planner_distance(a, b) { return (0, math_1.dist)(a, b); }
function revisit_planner_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function revisit_planner_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function revisit_planner_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.REVISIT_PLANNER_VERSION = 'v13';
