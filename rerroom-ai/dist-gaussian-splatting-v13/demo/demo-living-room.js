"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEMO_LIVING_ROOM_VERSION = void 0;
exports.demo_living_room_mean = demo_living_room_mean;
exports.demo_living_room_variance = demo_living_room_variance;
exports.demo_living_room_trend = demo_living_room_trend;
exports.demo_living_room_score = demo_living_room_score;
exports.demo_living_room_actions = demo_living_room_actions;
exports.demo_living_room_result = demo_living_room_result;
exports.demo_living_room_window = demo_living_room_window;
exports.demo_living_room_robust = demo_living_room_robust;
exports.demo_living_room_seed = demo_living_room_seed;
exports.demo_living_room_sampleScene = demo_living_room_sampleScene;
exports.demo_living_room_distance = demo_living_room_distance;
exports.demo_living_room_frames = demo_living_room_frames;
exports.demo_living_room_gaussians = demo_living_room_gaussians;
exports.demo_living_room_recommendation = demo_living_room_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function demo_living_room_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function demo_living_room_variance(values = []) {
    if (!values.length)
        return 0;
    const m = demo_living_room_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function demo_living_room_trend(values = []) {
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
function demo_living_room_score(values = [], threshold = .65, weight = 1) {
    const mean = demo_living_room_mean(values);
    const variance = demo_living_room_variance(values);
    const trend = demo_living_room_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function demo_living_room_actions(score, warnings = []) {
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
function demo_living_room_result(id, values = [], warnings = []) {
    const score = demo_living_room_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `demo-demo-living-room-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: demo_living_room_actions(score, warnings), metrics: { mean: demo_living_room_mean(values), variance: demo_living_room_variance(values), trend: demo_living_room_trend(values), count: values.length }, warnings };
}
function demo_living_room_window(values = [], window = 5) {
    return values.map((_, i) => demo_living_room_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function demo_living_room_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return demo_living_room_mean(core.length ? core : sorted);
}
function demo_living_room_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`demo-demo-living-room:$${id}`), index); }
function demo_living_room_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function demo_living_room_distance(a, b) { return (0, math_1.dist)(a, b); }
function demo_living_room_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function demo_living_room_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function demo_living_room_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.DEMO_LIVING_ROOM_VERSION = 'v13';
