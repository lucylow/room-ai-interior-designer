"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityScore = exports.TileBinning = exports.TemporalStability = exports.SemanticMask = exports.ScreenError = exports.RenderHealth = exports.RenderBudget = exports.ReferenceRasterizer = exports.QualityPolicy = exports.OverdrawEstimator = exports.LodPolicy = exports.GpuWorkload = exports.FrustumCull = exports.FramePacer = exports.FoveatedPolicy = exports.DynamicResolution = exports.DepthOrder = exports.DepthCompositor = exports.DebugOverlay = exports.BackfaceHeuristic = exports.AlphaCompositor = void 0;
// Stable, collision-free namespace exports for V13 render capabilities.
exports.AlphaCompositor = __importStar(require("./alpha-compositor"));
exports.BackfaceHeuristic = __importStar(require("./backface-heuristic"));
exports.DebugOverlay = __importStar(require("./debug-overlay"));
exports.DepthCompositor = __importStar(require("./depth-compositor"));
exports.DepthOrder = __importStar(require("./depth-order"));
exports.DynamicResolution = __importStar(require("./dynamic-resolution"));
exports.FoveatedPolicy = __importStar(require("./foveated-policy"));
exports.FramePacer = __importStar(require("./frame-pacer"));
exports.FrustumCull = __importStar(require("./frustum-cull"));
exports.GpuWorkload = __importStar(require("./gpu-workload"));
exports.LodPolicy = __importStar(require("./lod-policy"));
exports.OverdrawEstimator = __importStar(require("./overdraw-estimator"));
exports.QualityPolicy = __importStar(require("./quality-policy"));
exports.ReferenceRasterizer = __importStar(require("./reference-rasterizer"));
exports.RenderBudget = __importStar(require("./render-budget"));
exports.RenderHealth = __importStar(require("./render-health"));
exports.ScreenError = __importStar(require("./screen-error"));
exports.SemanticMask = __importStar(require("./semantic-mask"));
exports.TemporalStability = __importStar(require("./temporal-stability"));
exports.TileBinning = __importStar(require("./tile-binning"));
exports.VisibilityScore = __importStar(require("./visibility-score"));
