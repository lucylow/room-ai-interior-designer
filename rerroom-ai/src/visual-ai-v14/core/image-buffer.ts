import { RGBAFrame, clamp, Color } from './types';

export const MAX_FRAME_PIXELS = 16_777_216;

function validateColor(color: Color): void {
  if (!color || ![color.r, color.g, color.b].every((value) => Number.isFinite(value) && value >= 0 && value <= 255) ||
      (color.a !== undefined && (!Number.isFinite(color.a) || color.a < 0 || color.a > 1))) {
    throw new Error('invalid_frame_color');
  }
}

export function createFrame(width: number, height: number, fill: Color = { r: 248, g: 248, b: 246, a: 1 }): RGBAFrame {
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1) {
    throw new Error('invalid_frame_dimensions');
  }
  const pixelCount = width * height;
  if (!Number.isSafeInteger(pixelCount) || pixelCount > MAX_FRAME_PIXELS) {
    throw new Error('frame_pixel_limit_exceeded');
  }
  validateColor(fill);
  const data = new Uint8ClampedArray(pixelCount * 4);
  const alpha = Math.round((fill.a ?? 1) * 255);
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    data[offset] = fill.r;
    data[offset + 1] = fill.g;
    data[offset + 2] = fill.b;
    data[offset + 3] = alpha;
  }
  return { width, height, data };
}

export function setPixel(frame: RGBAFrame, x: number, y: number, color: Color): void {
  if (x < 0 || y < 0 || x >= frame.width || y >= frame.height) return;
  const index = (y * frame.width + x) * 4;
  frame.data[index] = color.r;
  frame.data[index + 1] = color.g;
  frame.data[index + 2] = color.b;
  frame.data[index + 3] = Math.round((color.a ?? 1) * 255);
}

export function blendPixel(frame: RGBAFrame, x: number, y: number, color: Color): void {
  if (x < 0 || y < 0 || x >= frame.width || y >= frame.height) return;
  const index = (y * frame.width + x) * 4;
  const alpha = clamp(color.a ?? 1);
  const inverse = 1 - alpha;
  frame.data[index] = Math.round(frame.data[index] * inverse + color.r * alpha);
  frame.data[index + 1] = Math.round(frame.data[index + 1] * inverse + color.g * alpha);
  frame.data[index + 2] = Math.round(frame.data[index + 2] * inverse + color.b * alpha);
  frame.data[index + 3] = 255;
}

export function cloneFrame(frame: RGBAFrame): RGBAFrame {
  return { width: frame.width, height: frame.height, data: new Uint8ClampedArray(frame.data) };
}
