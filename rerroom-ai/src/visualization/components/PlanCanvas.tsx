import React, { useMemo } from 'react';
import type { SpatialScene, Viewport2D } from '../core/types';
import { DEFAULT_PLAN_LAYERS } from '../two-d/layers';
import type { PlanLayer, PlanLayerId } from '../two-d/layers';
import { createPlanProjection } from '../two-d/projection';
import { createPlanGrid } from '../two-d/grid';
import { buildPlanItems } from '../two-d/layout';
import { objectLabels, roomDimensionLabels } from '../two-d/labels';
import { buildMeasureOverlay } from '../two-d/measure-overlay';
import { selectionOverlay } from '../two-d/selection-overlay';

export interface PlanCanvasProps {
  scene: SpatialScene;
  viewport: Viewport2D;
  selectedIds?: string[];
  dark?: boolean;
  layers?: PlanLayer[];
  onSelect?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
}

function screenStyle(x: number, y: number, width: number, height: number, rotation: number) {
  return {
    position: 'absolute' as const,
    left: x - width / 2,
    top: y - height / 2,
    width,
    height,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center',
    userSelect: 'none' as const,
  };
}

export function PlanCanvas({ scene, viewport, selectedIds = [], dark = false, layers = DEFAULT_PLAN_LAYERS, onSelect, onDoubleClick }: PlanCanvasProps) {
  const projection = useMemo(
    () => createPlanProjection(viewport, scene.room.width, scene.room.depth, 32),
    [scene.room.depth, scene.room.width, viewport],
  );
  const grid = useMemo(() => createPlanGrid({ x: 0, y: 0, width: scene.room.width, height: scene.room.depth }, viewport.zoom), [scene.room.depth, scene.room.width, viewport.zoom]);
  const items = useMemo(() => buildPlanItems(scene), [scene]);
  const labels = useMemo(() => objectLabels(scene), [scene]);
  const dimensions = useMemo(() => roomDimensionLabels(scene), [scene]);
  const measureLines = useMemo(() => buildMeasureOverlay(scene), [scene]);
  const selected = new Set(selectedIds);
  const selectedObject = scene.objects.find(item => selected.has(item.id));
  const selection = selectedObject ? selectionOverlay(selectedObject) : null;
  const visible = (id: PlanLayerId) => layers.find(layer => layer.id === id)?.visible ?? true;
  const roomLeft = viewport.width / 2 - (scene.room.width * projection.pixelsPerMeter) / 2 + viewport.x;
  const roomTop = viewport.height / 2 - (scene.room.depth * projection.pixelsPerMeter) / 2 + viewport.y;
  const roomWidth = scene.room.width * projection.pixelsPerMeter;
  const roomHeight = scene.room.depth * projection.pixelsPerMeter;

  return (
    <div
      role="application"
      aria-label="Interactive 2D room plan"
      style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', background: dark ? '#111318' : '#F8F8F6', touchAction: 'none' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', left: roomLeft, top: roomTop, width: roomWidth, height: roomHeight,
          background: visible('background') ? (dark ? '#1B1E25' : '#FFFFFF') : 'transparent',
          border: visible('walls') ? '4px solid #17181B' : 'none',
          boxShadow: '0 16px 50px rgba(0,0,0,.08)',
        }}
      />
      {visible('grid') && grid.lines.map((line, i) => {
        const a = projection.worldToScreen(line.start);
        const b = projection.worldToScreen(line.end);
        const vertical = Math.abs(a.x - b.x) < 0.5;
        return (
          <div
            key={`grid-${i}`}
            aria-hidden="true"
            style={{
              position: 'absolute', left: vertical ? a.x : Math.min(a.x, b.x), top: vertical ? Math.min(a.y, b.y) : a.y,
              width: vertical ? 1 : Math.max(1, Math.abs(b.x - a.x)), height: vertical ? Math.max(1, Math.abs(b.y - a.y)) : 1,
              background: line.major ? '#CFD2DA' : '#E8E9ED', opacity: dark ? 0.25 : 0.7, pointerEvents: 'none',
            }}
          />
        );
      })}
      {visible('walls') && scene.room.walls.map(wall => {
        const a = projection.worldToScreen(wall.start);
        const b = projection.worldToScreen(wall.end);
        return <svg key={wall.id} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#17181B" strokeWidth={Math.max(3, wall.thickness * projection.pixelsPerMeter)} /></svg>;
      })}
      {visible('openings') && scene.room.openings.map(opening => {
        const wall = scene.room.walls.find(item => item.id === opening.wallId);
        if (!wall) return null;
        const length = Math.hypot(wall.end.x - wall.start.x, wall.end.y - wall.start.y) || 1;
        const t = Math.max(0, Math.min(1, opening.offset / length));
        const point = projection.worldToScreen({ x: wall.start.x + (wall.end.x - wall.start.x) * t, y: wall.start.y + (wall.end.y - wall.start.y) * t });
        return <div key={opening.id} title={opening.kind} aria-label={opening.kind} style={{ position: 'absolute', left: point.x - 6, top: point.y - 6, width: 12, height: 12, borderRadius: 3, background: '#D38B60', border: '2px solid white', boxShadow: '0 0 0 1px #9B5F41', pointerEvents: 'none' }} />;
      })}
      {visible('measurements') && measureLines.length > 0 ? (
        <svg aria-label="Room measurement overlays" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
          {measureLines.map(item => {
            const a = projection.worldToScreen(item.start);
            const b = projection.worldToScreen(item.end);
            const x = (a.x + b.x) / 2;
            const y = (a.y + b.y) / 2;
            return <g key={item.measurement.id}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#C46D4C" strokeWidth="2" strokeDasharray="5 4" /><text x={x + 5} y={y - 6} fill="#8A4B36" fontSize="11" fontWeight="700">{item.text}</text></g>;
          })}
        </svg>
      ) : null}
      {visible('furniture') && items.map(item => {
        const center = projection.worldToScreen({ x: item.rect.x + item.rect.width / 2, y: item.rect.y + item.rect.height / 2 });
        const width = item.rect.width * projection.pixelsPerMeter;
        const height = item.rect.height * projection.pixelsPerMeter;
        const isSelected = visible('selection') && selected.has(item.object.id);
        return (
          <div
            key={item.object.id}
            title={item.object.label}
            onClick={() => onSelect?.(item.object.id)}
            onDoubleClick={() => onDoubleClick?.(item.object.id)}
            style={{
              ...screenStyle(center.x, center.y, width, height, item.rotationDeg), zIndex: item.zIndex,
              background: isSelected ? '#E9EBFF' : '#DDE1EA',
              border: `2px solid ${isSelected ? '#4F5BFF' : '#A4A9B4'}`,
              borderRadius: Math.max(4, Math.min(width, height) * 0.07), boxSizing: 'border-box', cursor: 'pointer', transition: 'box-shadow 120ms ease',
            }}
          >
            {visible('labels') ? <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: Math.max(9, Math.min(14, Math.min(width, height) * 0.18)), color: '#17181B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: 4 }}>{item.object.label}</span> : null}
          </div>
        );
      })}
      {visible('selection') && selection ? (
        <>
          <div aria-hidden="true" style={{ ...screenStyle(projection.worldToScreen(selection.center).x, projection.worldToScreen(selection.center).y, selection.width * projection.pixelsPerMeter, selection.height * projection.pixelsPerMeter, selection.rotationDeg), border: '1px dashed #4F5BFF', pointerEvents: 'none', zIndex: 40 }} />
          {selection.handles.map(handle => {
            const point = projection.worldToScreen({ x: handle.x, y: handle.y });
            return <span key={handle.id} aria-hidden="true" style={{ position: 'absolute', left: point.x, top: point.y, width: handle.id === 'rotate' ? 10 : 8, height: handle.id === 'rotate' ? 10 : 8, transform: 'translate(-50%, -50%)', border: '1px solid #4F5BFF', borderRadius: '50%', background: '#FFF', pointerEvents: 'none', zIndex: 41 }} />;
          })}
        </>
      ) : null}
      {visible('labels') && labels.map(label => {
        const point = projection.worldToScreen({ x: label.x, y: label.y });
        return <div key={`label-${label.id}`} style={{ position: 'absolute', left: point.x, top: point.y + 10, transform: 'translateX(-50%)', pointerEvents: 'none', fontSize: 10, fontWeight: 600, color: dark ? '#F2F3F5' : '#555A66' }}>{label.text}</div>;
      })}
      {visible('measurements') && dimensions.map(label => {
        const point = projection.worldToScreen({ x: label.x, y: label.y });
        return <div key={label.id} style={{ position: 'absolute', left: point.x, top: point.y, transform: 'translate(-50%, -50%)', padding: '2px 5px', borderRadius: 5, background: 'rgba(255,255,255,.9)', color: '#555A66', fontSize: 10, pointerEvents: 'none' }}>{label.text}</div>;
      })}
    </div>
  );
}
