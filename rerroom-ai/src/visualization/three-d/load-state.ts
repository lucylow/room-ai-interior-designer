export type AssetLoadStatus = 'idle' | 'queued' | 'loading' | 'ready' | 'error';

export interface AssetLoadState {
  status: AssetLoadStatus;
  progress: number;
  error?: string;
  startedAt?: number;
  finishedAt?: number;
}

export class AssetLoadTracker {
  private states = new Map<string, AssetLoadState>();

  set(id: string, state: AssetLoadState): void {
    this.states.set(id, state);
  }

  begin(id: string): void {
    this.set(id, { status: 'loading', progress: 0, startedAt: Date.now() });
  }

  progress(id: string, value: number): void {
    const previous = this.states.get(id);
    this.set(id, {
      ...(previous ?? { status: 'loading', progress: 0 }),
      status: 'loading',
      progress: Math.min(1, Math.max(0, value)),
    });
  }

  ready(id: string): void {
    this.set(id, { status: 'ready', progress: 1, finishedAt: Date.now() });
  }

  error(id: string, message: string): void {
    this.set(id, { status: 'error', progress: 0, error: message, finishedAt: Date.now() });
  }

  get(id: string): AssetLoadState {
    return this.states.get(id) ?? { status: 'idle', progress: 0 };
  }

  snapshot(): Record<string, AssetLoadState> {
    return Object.fromEntries(this.states.entries());
  }
}
