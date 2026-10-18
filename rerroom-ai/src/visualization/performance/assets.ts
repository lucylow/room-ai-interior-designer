export interface VisualAsset {
  id: string;
  uri: string;
  kind: 'texture' | 'model' | 'image' | 'thumbnail';
  width?: number;
  height?: number;
  bytes?: number;
  mimeType?: string;
}

export interface AssetVariant {
  assetId: string;
  quality: 'thumbnail' | 'preview' | 'full';
  uri: string;
  maxDimension: number;
}

const limits = {
  thumbnail: 512,
  preview: 1536,
  full: 4096,
} as const;

export function preferredVariant(asset: VisualAsset, quality: keyof typeof limits): AssetVariant {
  return {
    assetId: asset.id,
    quality,
    uri: asset.uri,
    maxDimension: limits[quality],
  };
}

export function texturePixelEstimate(width = 0, height = 0): number {
  return Math.max(0, width) * Math.max(0, height);
}

export function downsampleDimension(value: number, quality: keyof typeof limits): number {
  return Math.min(Math.max(1, value), limits[quality]);
}
