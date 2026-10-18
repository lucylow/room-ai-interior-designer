import React from 'react';
import { ProxyMesh } from './ProxyMesh';

interface State { hasError: boolean; }
interface Props extends React.PropsWithChildren { fallbackSize?: number; }

export class ModelErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(): void {
    // R3F errors can include asset URLs or other sensitive details; never log raw errors.
    console.warn('[RE:ROOM] A 3D scene component failed; displaying a proxy object.');
  }

  render(): React.ReactNode {
    if (!this.state.hasError) return this.props.children;
    return <ProxyMesh size={this.props.fallbackSize ?? 1} />;
  }
}
