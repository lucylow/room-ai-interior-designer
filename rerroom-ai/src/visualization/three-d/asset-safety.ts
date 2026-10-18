import type { VisualAsset } from '../performance/assets';

export interface ModelSafetyResult {
  allowed: boolean;
  reasons: string[];
  normalized: VisualAsset;
}

const MODEL_MAX_BYTES = 48 * 1024 * 1024;
const IMAGE_MAX_BYTES = 12 * 1024 * 1024;
const ALLOWED_MODEL_TYPES = new Set(['model/gltf-binary', 'model/gltf+json', 'application/octet-stream']);
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export function validateVisualAsset(asset: VisualAsset): ModelSafetyResult {
  const reasons: string[] = [];
  const maxBytes = asset.kind === 'model' ? MODEL_MAX_BYTES : IMAGE_MAX_BYTES;
  if (asset.bytes !== undefined && asset.bytes > maxBytes) reasons.push('Asset exceeds the client-side size budget.');
  if (asset.mimeType) {
    const allowed = asset.kind === 'model' ? ALLOWED_MODEL_TYPES : asset.kind === 'image' || asset.kind === 'thumbnail'
      ? ALLOWED_IMAGE_TYPES : true;
    if (!allowed) reasons.push('Asset media type is not allowlisted.');
  }
  if (!/^https:\/\//i.test(asset.uri) && !asset.uri.startsWith('file://') && !asset.uri.startsWith('blob:')) {
    reasons.push('Asset URI must use an allowed scheme.');
  }
  return { allowed: reasons.length === 0, reasons, normalized: { ...asset, id: asset.id.trim() } };
}
