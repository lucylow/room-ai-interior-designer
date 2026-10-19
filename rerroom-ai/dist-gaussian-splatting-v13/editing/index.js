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
exports.VisibilityEdit = exports.ReplacePlan = exports.RelightEdit = exports.RegionMask = exports.RecolorEdit = exports.MaterialEdit = exports.GeometryLock = exports.GaussianMask = exports.EditTransaction = exports.EditRollback = exports.EditPreview = exports.EditHistory = exports.EditFinalize = exports.EditDiff = exports.EditConflict = exports.EditBranch = void 0;
// Stable, collision-free namespace exports for V13 editing capabilities.
exports.EditBranch = __importStar(require("./edit-branch"));
exports.EditConflict = __importStar(require("./edit-conflict"));
exports.EditDiff = __importStar(require("./edit-diff"));
exports.EditFinalize = __importStar(require("./edit-finalize"));
exports.EditHistory = __importStar(require("./edit-history"));
exports.EditPreview = __importStar(require("./edit-preview"));
exports.EditRollback = __importStar(require("./edit-rollback"));
exports.EditTransaction = __importStar(require("./edit-transaction"));
exports.GaussianMask = __importStar(require("./gaussian-mask"));
exports.GeometryLock = __importStar(require("./geometry-lock"));
exports.MaterialEdit = __importStar(require("./material-edit"));
exports.RecolorEdit = __importStar(require("./recolor-edit"));
exports.RegionMask = __importStar(require("./region-mask"));
exports.RelightEdit = __importStar(require("./relight-edit"));
exports.ReplacePlan = __importStar(require("./replace-plan"));
exports.VisibilityEdit = __importStar(require("./visibility-edit"));
