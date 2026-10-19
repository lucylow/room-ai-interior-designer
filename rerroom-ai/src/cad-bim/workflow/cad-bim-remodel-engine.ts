import { AestheticIntent, AuthoritativeModel, DesignOverlay, HandoffPackage, RemodelProject, ValidationResult } from '../core/types';
import { createRemodelProject, activateOverlay, approveOverlay } from '../remodel/remodel-project';
import { ConceptGenerator } from '../ai/concept-generator';
import { ConceptRefiner } from '../ai/concept-refiner';
import { assessApprovalReadiness } from '../ai/approval-readiness';
import { HandoffBuilder } from '../handoff/handoff-builder';
import { validateHandoff } from '../validation/handoff-validator';
import { SourceRevisionDiff } from '../revision/source-revision';
import { RebaseEngine } from '../overlay/rebase-engine';
import { OverlayDeltaLedger } from './overlay-delta-ledger';
import { FinalReleaseController, ReleaseDecision } from './final-release-controller';

export interface RemodelEngineState {
  project: RemodelProject;
  sourceRevision: string;
  activeConcept?: DesignOverlay;
  handoff?: HandoffPackage;
  release?: ReleaseDecision;
  validation?: ValidationResult;
}

export interface EngineIterationResult {
  state: RemodelEngineState;
  overlay: DesignOverlay;
  patchCount: number;
  parentOverlayId?: string;
}

export class CadBimRemodelEngine {
  private generator = new ConceptGenerator();
  private refiner = new ConceptRefiner();
  private handoffBuilder = new HandoffBuilder();
  private revisionDiff = new SourceRevisionDiff();
  private rebase = new RebaseEngine();
  private deltaLedger = new OverlayDeltaLedger();
  private releaseController = new FinalReleaseController();
  private state?: RemodelEngineState;

  initialize(model: AuthoritativeModel, name: string): RemodelEngineState {
    const project = createRemodelProject(model, name);
    project.status = 'analyzed';
    this.state = { project, sourceRevision: model.importedRevision };
    return this.snapshot();
  }

  generate(intent: AestheticIntent): EngineIterationResult {
    const state = this.requireState();
    const overlay = this.generator.generate(state.project.authoritativeModel, intent);
    state.project = activateOverlay(state.project, overlay);
    state.project.status = 'iterating';
    state.activeConcept = overlay;
    state.handoff = undefined;
    state.release = undefined;
    state.validation = undefined;
    return { state: this.snapshot(), overlay, patchCount: 0 };
  }

  refine(intent: AestheticIntent): EngineIterationResult {
    const state = this.requireState();
    if (!state.activeConcept) throw new Error('A concept must exist before refinement.');
    const result = this.refiner.refine(state.project.authoritativeModel, state.activeConcept, intent);
    state.project = activateOverlay(state.project, result.overlay);
    state.project.status = 'iterating';
    state.activeConcept = result.overlay;
    state.handoff = undefined;
    state.release = undefined;
    state.validation = undefined;
    const summary = this.deltaLedger.summarize(result.patches);
    const patchCount = summary.total;
    return { state: this.snapshot(), overlay: result.overlay, patchCount, parentOverlayId: result.overlay.parentOverlayId };
  }

  compareSourceRevision(nextModel: AuthoritativeModel) {
    const state = this.requireState();
    return this.revisionDiff.compare(state.project.authoritativeModel, nextModel);
  }

  applySourceRevision(nextModel: AuthoritativeModel) {
    const state = this.requireState();
    if (nextModel.projectId !== state.project.authoritativeModel.projectId) throw new Error('Source model belongs to another project.');
    const previous = state.project.authoritativeModel;
    const active = state.activeConcept;
    if (active) {
      const rebased = this.rebase.rebase(active, previous, nextModel);
      state.activeConcept = rebased.overlay;
      state.project.overlays = state.project.overlays.map(o => o.id === active.id ? rebased.overlay : o);
      state.project.activeOverlayId = rebased.overlay.id;
      if (rebased.orphaned.length) state.project.status = 'iterating';
    }
    state.project.authoritativeModel = nextModel;
    state.sourceRevision = nextModel.importedRevision;
    state.handoff = undefined;
    state.release = undefined;
    state.validation = undefined;
    return this.snapshot();
  }

  review(): ValidationResult | undefined {
    const state = this.requireState();
    if (!state.activeConcept) return undefined;
    const readiness = assessApprovalReadiness(state.project.authoritativeModel, state.activeConcept);
    const issues = readiness.blockers.map(message => ({ severity: 'error' as const, code: 'REVIEW_BLOCKER', message }));
    const validation: ValidationResult = {
      valid: readiness.ready,
      issues,
      metrics: { confidence: readiness.score, elements: state.activeConcept.elements.length },
    };
    state.validation = validation;
    state.project.status = readiness.ready ? 'client-review' : 'iterating';
    return JSON.parse(JSON.stringify(validation));
  }

  approve(_approvedBy = 'client'): RemodelEngineState {
    const state = this.requireState();
    if (!state.activeConcept) throw new Error('No concept to approve.');
    const readiness = assessApprovalReadiness(state.project.authoritativeModel, state.activeConcept);
    if (!readiness.ready) throw new Error(`Concept is not ready for approval: ${readiness.blockers.join('; ')}`);
    state.project = approveOverlay(state.project, state.activeConcept.id);
    state.activeConcept.isApproved = true;
    state.project.status = 'approved';
    state.project.clientApprovedOverlayId = state.activeConcept.id;
    state.project.activeOverlayId = state.activeConcept.id;
    state.handoff = undefined;
    state.release = undefined;
    return this.snapshot();
  }

  buildHandoff(): HandoffPackage {
    const state = this.requireState();
    if (!state.activeConcept || !state.activeConcept.isApproved) throw new Error('Client approval is required before handoff.');
    const pkg = this.handoffBuilder.build(state.project.id, state.project.authoritativeModel, state.activeConcept);
    state.handoff = pkg;
    state.project.status = 'handoff-ready';
    state.validation = validateHandoff(state.project.authoritativeModel, state.activeConcept, pkg);
    state.release = this.releaseController.decide(state.project.authoritativeModel, state.activeConcept, pkg);
    if (!state.release.allowed) state.project.status = 'approved';
    return this.snapshotValue(pkg);
  }

  releaseDecision(): ReleaseDecision {
    const state = this.requireState();
    if (!state.activeConcept) throw new Error('No concept selected.');
    state.release = this.releaseController.decide(state.project.authoritativeModel, state.activeConcept, state.handoff);
    return this.snapshotValue(state.release);
  }

  markIssued(): RemodelEngineState {
    const state = this.requireState();
    if (!state.handoff) throw new Error('Handoff must be built before issue.');
    const decision = state.release || this.releaseDecision();
    if (!decision.allowed) throw new Error(this.releaseController.toHumanSummary(decision));
    state.project.status = 'issued';
    if (state.handoff) state.handoff.issuedAt = new Date().toISOString();
    return this.snapshot();
  }

  addDesignerStylePatch(path: string, before: unknown, after: unknown, rationale: string) {
    const state = this.requireState();
    if (!state.activeConcept) throw new Error('No active concept.');
    const anchor = state.activeConcept.elements.find(e => e.anchor)?.anchor;
    const patch = {
      id: `designer_patch_${Date.now()}`,
      overlayId: state.activeConcept.id,
      targetAnchor: anchor,
      operation: 'style' as const,
      path,
      before,
      after,
      rationale,
      createdAt: new Date().toISOString(),
      author: 'designer' as const,
    };
    return patch;
  }

  sceneState() {
    const state = this.requireState();
    const model = state.project.authoritativeModel;
    const overlay = state.activeConcept;
    return {
      sourceRevision: model.importedRevision,
      sourceHash: model.immutableGeometryHash,
      lockedFeatureIds: model.features.filter(f => f.authority === 'authoritative').map(f => f.id),
      overlayId: overlay?.id,
      overlayVersion: overlay?.version,
      twoD: {
        units: 'meters',
        featureCount: model.features.length,
        selectableFeatureIds: model.features.map(f => f.id),
      },
      threeD: {
        units: 'meters',
        sourceGeometryFrozen: true,
        conceptObjectCount: overlay?.elements.length || 0,
      },
    };
  }

  exportSnapshot(): string {
    return JSON.stringify(this.snapshot(), null, 2);
  }

  importSnapshot(serialized: string): RemodelEngineState {
    const parsed = JSON.parse(serialized) as RemodelEngineState;
    this.state = parsed;
    return this.snapshot();
  }

  snapshot(): RemodelEngineState {
    return this.snapshotValue(this.requireState());
  }

  private snapshotValue<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  private requireState(): RemodelEngineState {
    if (!this.state) throw new Error('Remodel engine is not initialized.');
    return this.state;
  }
}
