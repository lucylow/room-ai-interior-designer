import { useMemo, useState, useSyncExternalStore } from 'react';
import { DEMO_ROOMS } from '@/visualization/demo/rooms';
import { roomStateToScene } from '@/visualization/integration/room-state-adapter';
import { loadScene, localStorageAdapter } from '@/visualization/state/scene-persistence';
import { getActiveRoom } from '@/state/domains/room-store';
import { privacyStore } from '@/state/domains/privacy-store';
import { VisualizationWorkspace } from '@/visualization/components/VisualizationWorkspace';
import './visualization-experience.css';

let sceneRecoveryWarningShown = false;

function warnSceneRecovery(): void {
  if (sceneRecoveryWarningShown) return;
  console.warn('[RE:ROOM] A room or saved visualization could not be restored; saved data was preserved.');
  sceneRecoveryWarningShown = true;
}

export function VisualizationExperience({ onBack, onPrivacy }: { onBack: () => void; onPrivacy: () => void }) {
  const activeRoom = getActiveRoom();
  const privacy = useSyncExternalStore(privacyStore.subscribe, privacyStore.getSnapshot, privacyStore.getSnapshot);
  const aiEnabled = privacy.consent.some((decision) => decision.scope === 'ai-processing' && decision.granted);
  const localStorageEnabled = privacy.consent.some((decision) => decision.scope === 'local-storage' && decision.granted);
  const scenes = useMemo(() => {
    let current = null;
    try {
      current = activeRoom ? roomStateToScene(activeRoom) : null;
    } catch {
      warnSceneRecovery();
    }
    return current ? [current, ...DEMO_ROOMS] : DEMO_ROOMS;
  }, [activeRoom]);
  const [roomId, setRoomId] = useState(() => scenes[0]?.metadata.roomId ?? DEMO_ROOMS[0].metadata.roomId);
  const selected = scenes.find((scene) => scene.metadata.roomId === roomId) ?? scenes[0];
  const initialScene = useMemo(() => {
    if (!localStorageEnabled) return selected;
    try {
      const saved = loadScene(localStorageAdapter, `rerroom:visualization:${selected.metadata.roomId}`);
      return saved?.metadata.roomId === selected.metadata.roomId ? saved : selected;
    } catch {
      warnSceneRecovery();
      return selected;
    }
  }, [localStorageEnabled, selected]);

  return (
    <section className="visualization-experience">
      <header className="visualization-experience-header">
        <button type="button" onClick={onBack} aria-label="Back to studio">← Studio</button>
        <div className="visualization-experience-title">
          <strong>Room Studio</strong>
          <span>2D plan · 3D presentation</span>
        </div>
        <label className="visualization-room-picker">
          <span className="sr-only">Choose a room</span>
          <select value={selected.metadata.roomId} onChange={(event) => setRoomId(event.target.value)}>
            {scenes.map((scene) => <option key={scene.metadata.roomId} value={scene.metadata.roomId}>{scene.metadata.roomId}</option>)}
          </select>
        </label>
        {!aiEnabled ? <button type="button" onClick={onPrivacy}>AI consent</button> : null}
      </header>
      <VisualizationWorkspace
        key={selected.metadata.roomId}
        initialScene={initialScene}
        aiEnabled={aiEnabled}
        localStorageEnabled={localStorageEnabled}
        onRequireAiConsent={onPrivacy}
      />
    </section>
  );
}
