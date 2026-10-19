import { AuthoritativeModel, DesignOverlay, HandoffPackage } from '../core/types';

export interface ReleaseDecision {
  allowed: boolean;
  stage: 'concept' | 'review' | 'approval' | 'handoff' | 'blocked';
  blockers: string[];
  warnings: string[];
  evidence: string[];
}

export class FinalReleaseController {
  decide(model: AuthoritativeModel, overlay: DesignOverlay, pkg?: HandoffPackage): ReleaseDecision {
    const blockers: string[] = [];
    const warnings: string[] = [];
    const evidence: string[] = [];

    evidence.push(`source-model:${model.id}`);
    evidence.push(`source-revision:${model.importedRevision}`);
    evidence.push(`source-hash:${model.immutableGeometryHash}`);
    evidence.push(`overlay:${overlay.id}`);
    evidence.push(`overlay-version:${overlay.version}`);

    if (overlay.authoritativeModelId !== model.id) {
      blockers.push('Overlay is attached to a different authoritative source model.');
    }

    if (overlay.unresolvedAnchors.length) {
      blockers.push(`Overlay contains ${overlay.unresolvedAnchors.length} unresolved anchors.`);
    }

    const unanchored = overlay.elements.filter(e => !e.anchor);
    if (unanchored.length) {
      warnings.push(`${unanchored.length} concept elements are illustrative only.`);
    }

    if (!model.features.length) {
      blockers.push('Authoritative source contains no semantic features.');
    }

    if (!overlay.isApproved) {
      return {
        allowed: blockers.length === 0,
        stage: blockers.length ? 'blocked' : 'review',
        blockers,
        warnings,
        evidence,
      };
    }

    evidence.push('client-approval:present');

    if (!pkg) {
      warnings.push('No handoff package has been assembled yet.');
      return { allowed: false, stage: blockers.length ? 'blocked' : 'approval', blockers, warnings, evidence };
    }

    if (pkg.approvedOverlayId !== overlay.id) {
      blockers.push('Handoff package does not reference the approved overlay.');
    }

    if (pkg.sourceModelRevision !== model.importedRevision) {
      blockers.push('Handoff package references an outdated source revision.');
    }

    const sourceDimensions = pkg.dimensions.filter(d => d.verification === 'source-cad' || d.verification === 'source-bim');
    const unverified = pkg.dimensions.filter(d => d.verification === 'unverified');
    evidence.push(`source-dimensions:${sourceDimensions.length}`);
    evidence.push(`unverified-dimensions:${unverified.length}`);

    if (unverified.length) {
      warnings.push(`${unverified.length} dimensions remain unverified and require field confirmation.`);
    }

    return {
      allowed: blockers.length === 0,
      stage: blockers.length ? 'blocked' : 'handoff',
      blockers,
      warnings,
      evidence,
    };
  }

  toHumanSummary(decision: ReleaseDecision): string {
    if (decision.stage === 'handoff' && decision.allowed) {
      return 'Approved design overlay is aligned with the recorded authoritative source revision.';
    }
    if (decision.stage === 'review') {
      return 'The concept can continue through client review without modifying source geometry.';
    }
    if (decision.blockers.length) {
      return `Release is blocked by ${decision.blockers.length} issue(s).`;
    }
    return 'Release is pending additional approval or handoff evidence.';
  }
}
