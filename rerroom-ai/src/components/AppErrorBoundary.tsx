import React from 'react';

interface BoundaryState {
  hasError: boolean;
  incidentId?: string;
}

export class AppErrorBoundary extends React.Component<React.PropsWithChildren, BoundaryState> {
  private static sequence = 0;
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    const incidentId = `ui-${Date.now().toString(36)}-${++AppErrorBoundary.sequence}`;
    this.setState({ incidentId });
    // Keep diagnostics useful but never include exception text, stack, props, or user data.
    console.error('[RE:ROOM] UI rendering failed.', { incidentId });
  }

  render(): React.ReactNode {
    if (!this.state.hasError) return this.props.children;
    return (
      <main role="alert" style={{ maxWidth: 440, margin: '48px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#20212A' }}>
        <h1>Something went wrong</h1>
        <p>The screen could not be displayed. Your saved work has not been intentionally cleared.</p>
        {this.state.incidentId ? <p>Reference: {this.state.incidentId}</p> : null}
        <button type="button" onClick={() => window.location.reload()}>Reload RE:ROOM</button>
      </main>
    );
  }
}
