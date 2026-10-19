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
exports.StyleGrounding = exports.SpatialAdvice = exports.SemanticGrounding = exports.SceneQuery = exports.RoomNarrative = exports.RegionQuery = exports.PromptSafety = exports.PromptCompiler = exports.ObjectRanking = exports.MaterialGrounding = exports.LightingEstimation = exports.EditUncertainty = exports.EditPlan = exports.EditConfidence = exports.DesignIntent = exports.ConceptRanker = exports.ConceptDiversity = exports.ConceptCritic = exports.AiCache = exports.D3dgsSceneSummary = void 0;
// Stable, collision-free namespace exports for V13 ai capabilities.
exports.D3dgsSceneSummary = __importStar(require("./3dgs-scene-summary"));
exports.AiCache = __importStar(require("./ai-cache"));
exports.ConceptCritic = __importStar(require("./concept-critic"));
exports.ConceptDiversity = __importStar(require("./concept-diversity"));
exports.ConceptRanker = __importStar(require("./concept-ranker"));
exports.DesignIntent = __importStar(require("./design-intent"));
exports.EditConfidence = __importStar(require("./edit-confidence"));
exports.EditPlan = __importStar(require("./edit-plan"));
exports.EditUncertainty = __importStar(require("./edit-uncertainty"));
exports.LightingEstimation = __importStar(require("./lighting-estimation"));
exports.MaterialGrounding = __importStar(require("./material-grounding"));
exports.ObjectRanking = __importStar(require("./object-ranking"));
exports.PromptCompiler = __importStar(require("./prompt-compiler"));
exports.PromptSafety = __importStar(require("./prompt-safety"));
exports.RegionQuery = __importStar(require("./region-query"));
exports.RoomNarrative = __importStar(require("./room-narrative"));
exports.SceneQuery = __importStar(require("./scene-query"));
exports.SemanticGrounding = __importStar(require("./semantic-grounding"));
exports.SpatialAdvice = __importStar(require("./spatial-advice"));
exports.StyleGrounding = __importStar(require("./style-grounding"));
