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
exports.VoxelSeeding = exports.SurfaceConsistency = exports.SceneRepair = exports.SceneFusion = exports.SceneCleanup = exports.ReconstructionResume = exports.ReconstructionHealth = exports.ReconstructionDiff = exports.ReconstructionCheckpoint = exports.ReconstructionBudget = exports.PhotometricConsistency = exports.MultiViewConsistency = exports.GaussianSplit = exports.GaussianPrune = exports.GaussianMerge = exports.GaussianInit = exports.GaussianDensity = exports.GaussianConfidence = exports.DepthInitialization = void 0;
// Stable, collision-free namespace exports for V13 reconstruction capabilities.
exports.DepthInitialization = __importStar(require("./depth-initialization"));
exports.GaussianConfidence = __importStar(require("./gaussian-confidence"));
exports.GaussianDensity = __importStar(require("./gaussian-density"));
exports.GaussianInit = __importStar(require("./gaussian-init"));
exports.GaussianMerge = __importStar(require("./gaussian-merge"));
exports.GaussianPrune = __importStar(require("./gaussian-prune"));
exports.GaussianSplit = __importStar(require("./gaussian-split"));
exports.MultiViewConsistency = __importStar(require("./multi-view-consistency"));
exports.PhotometricConsistency = __importStar(require("./photometric-consistency"));
exports.ReconstructionBudget = __importStar(require("./reconstruction-budget"));
exports.ReconstructionCheckpoint = __importStar(require("./reconstruction-checkpoint"));
exports.ReconstructionDiff = __importStar(require("./reconstruction-diff"));
exports.ReconstructionHealth = __importStar(require("./reconstruction-health"));
exports.ReconstructionResume = __importStar(require("./reconstruction-resume"));
exports.SceneCleanup = __importStar(require("./scene-cleanup"));
exports.SceneFusion = __importStar(require("./scene-fusion"));
exports.SceneRepair = __importStar(require("./scene-repair"));
exports.SurfaceConsistency = __importStar(require("./surface-consistency"));
exports.VoxelSeeding = __importStar(require("./voxel-seeding"));
