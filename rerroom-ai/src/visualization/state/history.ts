import type { SpatialScene } from '../core/types';
import { cloneScene } from '../core/scene';

export interface HistorySnapshot {
  scene: SpatialScene;
  label: string;
  timestamp: number;
}

export class SceneHistory {
  private snapshots: HistorySnapshot[] = [];
  private cursor = -1;

  constructor(initial: SpatialScene) {
    this.snapshots = [{ scene: cloneScene(initial), label: 'Initial scene', timestamp: Date.now() }];
    this.cursor = 0;
  }

  get canUndo(): boolean { return this.cursor > 0; }
  get canRedo(): boolean { return this.cursor >= 0 && this.cursor < this.snapshots.length - 1; }
  get size(): number { return this.snapshots.length; }
  get index(): number { return this.cursor; }

  current(): SpatialScene { return cloneScene(this.snapshots[this.cursor].scene); }

  push(scene: SpatialScene, label: string): SpatialScene {
    const next = cloneScene(scene);
    this.snapshots = this.snapshots.slice(0, this.cursor + 1);
    this.snapshots.push({ scene: next, label, timestamp: Date.now() });
    if (this.snapshots.length > 80) this.snapshots.shift();
    this.cursor = this.snapshots.length - 1;
    return cloneScene(next);
  }

  undo(): SpatialScene {
    if (!this.canUndo) return this.current();
    this.cursor -= 1;
    return this.current();
  }

  redo(): SpatialScene {
    if (!this.canRedo) return this.current();
    this.cursor += 1;
    return this.current();
  }

  labels(): string[] { return this.snapshots.map(item => item.label); }

  clear(scene: SpatialScene): void {
    this.snapshots = [{ scene: cloneScene(scene), label: 'Reset scene', timestamp: Date.now() }];
    this.cursor = 0;
  }
}
