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
exports.ViewOverlap = exports.TrajectorySegmentation = exports.TrajectoryHealth = exports.ScaleEstimation = exports.Relocalization = exports.PoseSmoothing = exports.PoseSeeding = exports.PoseResiduals = exports.PoseOutlier = exports.PoseGraph = exports.PoseConfidence = exports.PoseChangeDetection = exports.LoopClosure = exports.GravityAlignment = exports.CameraInterpolation = exports.BundleAdjustmentPlan = void 0;
// Stable, collision-free namespace exports for V13 pose capabilities.
exports.BundleAdjustmentPlan = __importStar(require("./bundle-adjustment-plan"));
exports.CameraInterpolation = __importStar(require("./camera-interpolation"));
exports.GravityAlignment = __importStar(require("./gravity-alignment"));
exports.LoopClosure = __importStar(require("./loop-closure"));
exports.PoseChangeDetection = __importStar(require("./pose-change-detection"));
exports.PoseConfidence = __importStar(require("./pose-confidence"));
exports.PoseGraph = __importStar(require("./pose-graph"));
exports.PoseOutlier = __importStar(require("./pose-outlier"));
exports.PoseResiduals = __importStar(require("./pose-residuals"));
exports.PoseSeeding = __importStar(require("./pose-seeding"));
exports.PoseSmoothing = __importStar(require("./pose-smoothing"));
exports.Relocalization = __importStar(require("./relocalization"));
exports.ScaleEstimation = __importStar(require("./scale-estimation"));
exports.TrajectoryHealth = __importStar(require("./trajectory-health"));
exports.TrajectorySegmentation = __importStar(require("./trajectory-segmentation"));
exports.ViewOverlap = __importStar(require("./view-overlap"));
