"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECONSTRUCTION_CHECKPOINT_VERSION = void 0;
exports.reconstruction_checkpoint_mean = reconstruction_checkpoint_mean;
exports.reconstruction_checkpoint_variance = reconstruction_checkpoint_variance;
exports.reconstruction_checkpoint_trend = reconstruction_checkpoint_trend;
exports.reconstruction_checkpoint_score = reconstruction_checkpoint_score;
exports.reconstruction_checkpoint_actions = reconstruction_checkpoint_actions;
exports.reconstruction_checkpoint_result = reconstruction_checkpoint_result;
exports.reconstruction_checkpoint_window = reconstruction_checkpoint_window;
exports.reconstruction_checkpoint_robust = reconstruction_checkpoint_robust;
exports.reconstruction_checkpoint_seed = reconstruction_checkpoint_seed;
exports.reconstruction_checkpoint_sampleScene = reconstruction_checkpoint_sampleScene;
exports.reconstruction_checkpoint_distance = reconstruction_checkpoint_distance;
exports.reconstruction_checkpoint_frames = reconstruction_checkpoint_frames;
exports.reconstruction_checkpoint_gaussians = reconstruction_checkpoint_gaussians;
exports.reconstruction_checkpoint_recommendation = reconstruction_checkpoint_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function reconstruction_checkpoint_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function reconstruction_checkpoint_variance(values = []) {
    if (!values.length)
        return 0;
    const m = reconstruction_checkpoint_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function reconstruction_checkpoint_trend(values = []) {
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
function reconstruction_checkpoint_score(values = [], threshold = .65, weight = 1) {
    const mean = reconstruction_checkpoint_mean(values);
    const variance = reconstruction_checkpoint_variance(values);
    const trend = reconstruction_checkpoint_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function reconstruction_checkpoint_actions(score, warnings = []) {
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
function reconstruction_checkpoint_result(id, values = [], warnings = []) {
    const score = reconstruction_checkpoint_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `reconstruction-reconstruction-checkpoint-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: reconstruction_checkpoint_actions(score, warnings), metrics: { mean: reconstruction_checkpoint_mean(values), variance: reconstruction_checkpoint_variance(values), trend: reconstruction_checkpoint_trend(values), count: values.length }, warnings };
}
function reconstruction_checkpoint_window(values = [], window = 5) {
    return values.map((_, i) => reconstruction_checkpoint_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function reconstruction_checkpoint_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return reconstruction_checkpoint_mean(core.length ? core : sorted);
}
function reconstruction_checkpoint_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`reconstruction-reconstruction-checkpoint:$${id}`), index); }
function reconstruction_checkpoint_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function reconstruction_checkpoint_distance(a, b) { return (0, math_1.dist)(a, b); }
function reconstruction_checkpoint_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function reconstruction_checkpoint_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function reconstruction_checkpoint_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.RECONSTRUCTION_CHECKPOINT_VERSION = 'v13';
