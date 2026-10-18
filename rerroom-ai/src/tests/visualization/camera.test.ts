import { describe, expect, it } from 'vitest';
import { cameraForPreset, clampCamera, interpolateCamera } from '../../visualization/core/camera';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('camera system', () => {
  it('creates preset cameras', () => {
    const top = cameraForPreset(DEMO_ROOMS[0],'top');
    expect(top.position.y).toBeGreaterThan(0);
  });
  it('clamps fov', () => {
    const pose = {...cameraForPreset(DEMO_ROOMS[0],'hero'),fov:100};
    expect(clampCamera(pose,DEMO_ROOMS[0]).fov).toBe(80);
  });
  it('interpolates poses', () => {
    const a=cameraForPreset(DEMO_ROOMS[0],'hero');
    const b=cameraForPreset(DEMO_ROOMS[0],'top');
    const c=interpolateCamera(a,b,0.5);
    expect(c.position.x).not.toBe(a.position.x);
  });
});
