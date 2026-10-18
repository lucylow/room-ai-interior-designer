import type { SpatialScene } from '../core/types';
import { objectPlanCorners } from '../core/transform';

function esc(value: string): string {
  return value.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char] ?? char));
}

export function sceneToSvg(scene: SpatialScene, scale = 100): string {
  const width = scene.room.width * scale;
  const height = scene.room.depth * scale;
  const walls = scene.room.walls.map(wall =>
    `<line x1="${wall.start.x * scale}" y1="${wall.start.y * scale}" x2="${wall.end.x * scale}" y2="${wall.end.y * scale}" stroke="#17181B" stroke-width="${wall.thickness * scale}"/>`
  ).join('');
  const objects = scene.objects.filter(item => item.visible).map(object => {
    const points = objectPlanCorners(object).map(point => `${point.x * scale},${point.y * scale}`).join(' ');
    return `<polygon points="${points}" fill="#E9EBFF" stroke="#4F5BFF"/><text x="${object.transform.position.x * scale}" y="${object.transform.position.z * scale}" font-size="12" text-anchor="middle">${esc(object.label)}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#F8F8F6"/>${walls}${objects}</svg>`;
}
