"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRAVITY_ALIGNMENT_VERSION = void 0;
exports.gravity_alignment_mean = gravity_alignment_mean;
exports.gravity_alignment_variance = gravity_alignment_variance;
exports.gravity_alignment_trend = gravity_alignment_trend;
exports.gravity_alignment_score = gravity_alignment_score;
exports.gravity_alignment_actions = gravity_alignment_actions;
exports.gravity_alignment_result = gravity_alignment_result;
exports.gravity_alignment_window = gravity_alignment_window;
exports.gravity_alignment_robust = gravity_alignment_robust;
exports.gravity_alignment_seed = gravity_alignment_seed;
exports.gravity_alignment_sampleScene = gravity_alignment_sampleScene;
exports.gravity_alignment_distance = gravity_alignment_distance;
exports.gravity_alignment_frames = gravity_alignment_frames;
exports.gravity_alignment_gaussians = gravity_alignment_gaussians;
exports.gravity_alignment_recommendation = gravity_alignment_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function gravity_alignment_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function gravity_alignment_variance(values = []) {
    if (!values.length)
        return 0;
    const m = gravity_alignment_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function gravity_alignment_trend(values = []) {
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
function gravity_alignment_score(values = [], threshold = .65, weight = 1) {
    const mean = gravity_alignment_mean(values);
    const variance = gravity_alignment_variance(values);
    const trend = gravity_alignment_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function gravity_alignment_actions(score, warnings = []) {
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
function gravity_alignment_result(id, values = [], warnings = []) {
    const score = gravity_alignment_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `pose-gravity-alignment-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: gravity_alignment_actions(score, warnings), metrics: { mean: gravity_alignment_mean(values), variance: gravity_alignment_variance(values), trend: gravity_alignment_trend(values), count: values.length }, warnings };
}
function gravity_alignment_window(values = [], window = 5) {
    return values.map((_, i) => gravity_alignment_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function gravity_alignment_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return gravity_alignment_mean(core.length ? core : sorted);
}
function gravity_alignment_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`pose-gravity-alignment:$${id}`), index); }
function gravity_alignment_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function gravity_alignment_distance(a, b) { return (0, math_1.dist)(a, b); }
function gravity_alignment_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function gravity_alignment_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function gravity_alignment_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.GRAVITY_ALIGNMENT_VERSION = 'v13';
