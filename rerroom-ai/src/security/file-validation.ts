import { SECURITY_CONSTANTS } from './constants';

export interface FileValidationResult {
  ok: boolean;
  reasons: string[];
  normalizedName: string;
}

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);

export function validateUpload(file: File, kind: 'image' | 'video' | 'document'): FileValidationResult {
  const reasons: string[] = [];
  const name = file.name.normalize('NFKC').replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 120);
  if (file.size <= 0) reasons.push('empty-file');
  if (file.size > SECURITY_CONSTANTS.maxFileBytes) reasons.push('file-too-large');
  if (kind === 'image' && !ALLOWED_IMAGE_TYPES.has(file.type)) reasons.push('unsupported-image-type');
  if (kind === 'video' && !ALLOWED_VIDEO_TYPES.has(file.type)) reasons.push('unsupported-video-type');
  if (kind === 'document' && !/^application\/(pdf|json)$/.test(file.type)) reasons.push('unsupported-document-type');
  return { ok: reasons.length === 0, reasons, normalizedName: name };
}

export async function readBlobPrefix(blob: Blob, bytes = 32): Promise<Uint8Array> {
  const buffer = await blob.slice(0, bytes).arrayBuffer();
  return new Uint8Array(buffer);
}

export function hasPngSignature(bytes: Uint8Array): boolean {
  return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, i) => bytes[i] === value);
}

export function hasJpegSignature(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}
