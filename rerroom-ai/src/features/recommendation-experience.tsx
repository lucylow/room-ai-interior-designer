import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Button, Icon, StatusPill } from '@/components/ui';
import { generateAppRecommendations } from '@/ai/recommendation-service';
import { privacyStore } from '@/state/domains/privacy-store';
import { roomStore } from '@/state/domains/room-store';
import type { RecommendationSet } from '@/recommendation-engine/core/types';
import type { PreparedRecommendationContext } from '@/ai/recommendation-service';
import './recommendation-experience.css';

type RecommendationOutput = Awaited<ReturnType<typeof generateAppRecommendations>>;

function percent(value: number): string {
  return Number.isFinite(value) ? `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` : '—';
}

function Score({ label, value }: { label: string; value: number }) {
  const bounded = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  return (
    <div className="reco-score">
      <span>{label}</span>
      <div className="reco-score-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(bounded * 100)}>
        <i style={{ width: `${bounded * 100}%` }} />
      </div>
      <strong>{percent(value)}</strong>
    </div>
  );
}

function ResultSummary({ result }: { result: RecommendationSet }) {
  return (
    <div className="reco-summary-grid">
      <div><strong>{result.recommendations.length}</strong><span>suggestions</span></div>
      <div><strong>{result.insights.length}</strong><span>room signals</span></div>
      <div><strong>{result.warnings.length}</strong><span>caveats</span></div>
    </div>
  );
}

export function RecommendationExperience({
  onBack,
  onPrivacy,
  onOpenVisualization,
}: {
  onBack: () => void;
  onPrivacy: () => void;
  onOpenVisualization: () => void;
}) {
  const privacy = useSyncExternalStore(privacyStore.subscribe, privacyStore.getSnapshot, privacyStore.getSnapshot);
  const rooms = useSyncExternalStore(roomStore.subscribe, roomStore.getSnapshot, roomStore.getSnapshot);
  const aiEnabled = privacy.consent.some((decision) => decision.scope === 'ai-processing' && decision.granted);
  const activeRoom = rooms.activeRoomId ? rooms.rooms[rooms.activeRoomId] : undefined;
  const requestRef = useRef<AbortController | null>(null);
  const [output, setOutput] = useState<RecommendationOutput | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, []);
  useEffect(() => {
    if (aiEnabled) return;
    requestRef.current?.abort();
    requestRef.current = null;
    setOutput(null);
    setBusy(false);
    setError('AI processing consent is off. No recommendations have been generated.');
  }, [aiEnabled]);
  useEffect(() => {
    requestRef.current?.abort();
    requestRef.current = null;
    setOutput(null);
    setBusy(false);
  }, [activeRoom]);

  const generate = async () => {
    if (!aiEnabled || busy) return;
    requestRef.current?.abort();
    const request = new AbortController();
    requestRef.current = request;
    setBusy(true);
    setError(null);
    setOutput(null);
    try {
      const result = await generateAppRecommendations(activeRoom, request.signal);
      if (request.signal.aborted) return;
      setOutput(result);
    } catch {
      if (request.signal.aborted) return;
      setError('Recommendations could not be generated. Check room geometry and current privacy settings, then try again.');
    } finally {
      if (requestRef.current === request) {
        requestRef.current = null;
        setBusy(false);
      }
    }
  };

  const prepared: PreparedRecommendationContext | undefined = output?.prepared;
  const result = output?.result;

  return (
    <section className="recommendation-experience">
      <header className="recommendation-header">
        <Button className="back-button" onClick={onBack} label="Back to design studio"><Icon name="arrow" size={18} /></Button>
        <div>
          <span className="eyebrow">ROOM INTELLIGENCE</span>
          <h1>Recommendations & insights</h1>
        </div>
      </header>

      <section className="reco-privacy-note" aria-label="Recommendation privacy details">
        <span className="reco-privacy-icon"><Icon name="lock" size={17} /></span>
        <div>
          <strong>Local deterministic analysis</strong>
          <p>No remote model, room images, personal labels, saved history, shopping catalog, or construction actions are used. Results stay in memory and are not saved.</p>
        </div>
      </section>

      {!aiEnabled ? (
        <section className="reco-consent-card" role="status">
          <h2>AI processing is off</h2>
          <p>Generating room recommendations requires the AI processing choice in Privacy Center. Nothing runs until you opt in and press Generate.</p>
          <Button className="button-dark" onClick={onPrivacy}>Review privacy settings <Icon name="arrow" size={15} /></Button>
        </section>
      ) : (
        <section className="reco-run-card">
          <div>
            <span className="eyebrow">{activeRoom ? 'CURRENT ROOM' : 'SAMPLE MODE'}</span>
            <h2>{activeRoom ? 'Analyze the saved room layout' : 'Explore the illustrative demo room'}</h2>
            <p>{activeRoom ? 'Room geometry is minimized before analysis; labels and identifiers are replaced.' : 'No active room is available, so the bundled synthetic sample is used instead.'}</p>
          </div>
          <Button className="button-dark" onClick={generate} disabled={busy}>
            {busy ? 'Analyzing locally…' : 'Generate recommendations'} <Icon name="spark" size={15} />
          </Button>
        </section>
      )}

      {busy ? <div className="reco-loading" role="status">Running the deterministic room-analysis pipeline…</div> : null}
      {error ? <p className="reco-error" role="status">{error}</p> : null}

      {result && prepared ? (
        <>
          <section className="reco-result-meta">
            <div>
              <StatusPill tone={prepared.synthetic ? 'clay' : 'neutral'}>{prepared.synthetic ? 'Synthetic sample' : 'Minimized room state'}</StatusPill>
              <span> · {result.engineVersion}</span>
            </div>
            <ResultSummary result={result} />
            {prepared.warnings.map((warning) => <p key={warning}>{warning}</p>)}
            {result.warnings.map((warning, index) => <p key={`engine-${index}`}>{warning}</p>)}
            {result.assumptions.length ? <p>Assumptions: {result.assumptions.slice(0, 3).join(' · ')}</p> : null}
          </section>

          <div className="reco-section-title"><h2>Ranked suggestions</h2><span>Preview only · no scene edits applied</span></div>
          {result.recommendations.length ? (
            <div className="reco-list">
              {result.recommendations.slice(0, 10).map((recommendation) => {
                const patch = output.previewQueue.find((item) => item.recommendationId === recommendation.id);
                return (
                  <article className="reco-card" key={recommendation.id}>
                    <div className="reco-card-top">
                      <StatusPill>{recommendation.category}</StatusPill>
                      <span>{recommendation.effort} · {percent(recommendation.confidence)} confidence</span>
                    </div>
                    <h3>{recommendation.title}</h3>
                    <p>{recommendation.summary}</p>
                    <p className="reco-rationale">{recommendation.rationale}</p>
                    <div className="reco-scores">
                      <Score label="Ranking score" value={recommendation.score} />
                      <Score label="Expected impact" value={recommendation.expectedImpact} />
                    </div>
                    {recommendation.evidence.length ? (
                      <details>
                        <summary>Evidence and trade-offs</summary>
                        <ul>{recommendation.evidence.slice(0, 4).map((item) => <li key={item.id}>{item.label}: {item.value}</li>)}</ul>
                        {recommendation.tradeoffs.length ? <p>{recommendation.tradeoffs.slice(0, 3).join(' · ')}</p> : null}
                      </details>
                    ) : null}
                    {patch ? <p className="reco-preview-note">Visualization hint: {patch.cameraHint}; {patch.focusObjectIds.length} focus item(s). This is a non-applied preview adapter only.</p> : null}
                    {recommendation.estimatedCost !== undefined ? <small>Illustrative cost estimate: {recommendation.currency ?? 'USD'} {recommendation.estimatedCost.toLocaleString()}</small> : null}
                  </article>
                );
              })}
            </div>
          ) : <p className="reco-empty">The quality gates did not find suggestions above the configured confidence and evidence thresholds.</p>}

          <section className="reco-insights">
            <div className="reco-section-title"><h2>Room signals</h2><span>Heuristic estimates</span></div>
            {result.insights.slice(0, 6).map((insight) => (
              <article className="reco-insight" key={insight.id}>
                <div><strong>{insight.title}</strong><StatusPill tone={insight.severity === 'high' || insight.severity === 'critical' ? 'clay' : 'neutral'}>{insight.severity}</StatusPill></div>
                <p>{insight.summary}</p>
                <Score label="Confidence" value={insight.confidence} />
                {insight.recommendedNextStep ? <small>Next: {insight.recommendedNextStep}</small> : null}
              </article>
            ))}
          </section>

          <section className="reco-disclaimer" role="note">
            <strong>Use as a starting point, not professional advice.</strong>
            <p>Measurements and room signals may be incomplete. Confirm clearances, accessibility and safety in the visualizer before making physical changes or purchases.</p>
            <Button className="button-secondary" onClick={onOpenVisualization}>Open 2D/3D room studio <Icon name="arrow" size={15} /></Button>
          </section>
        </>
      ) : null}
    </section>
  );
}
