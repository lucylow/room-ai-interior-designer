import { describe, expect, it } from 'vitest';
import { DemoSpatialAIProvider } from '../../visualization/ai/demo-provider';
import { validateProposal } from '../../visualization/ai/validator';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('spatial AI', () => {
  it('produces deterministic demo proposals', async () => {
    const provider=new DemoSpatialAIProvider();
    const input={scene:DEMO_ROOMS[0],goal:'improve-circulation' as const,maxActions:2,demo:true};
    const a=await provider.propose(input);
    const b=await provider.propose(input);
    expect(a.actions.map(item=>item.id)).toEqual(b.actions.map(item=>item.id));
  });
  it('rejects oversized moves', () => {
    const scene=DEMO_ROOMS[0];
    const target=scene.objects[0];
    const result=validateProposal(scene,[{id:'bad',type:'move',targetId:target.id,dx:9,dz:0,reason:'test'}]);
    expect(result[0].valid).toBe(false);
  });
  it('rejects locked targets', () => {
    const scene=DEMO_ROOMS[0];
    const target={...scene.objects[0],locked:true};
    const locked={...scene,objects:[target,...scene.objects.slice(1)]};
    const result=validateProposal(locked,[{id:'bad',type:'move',targetId:target.id,dx:0.1,dz:0,reason:'test'}]);
    expect(result[0].valid).toBe(false);
  });
});
