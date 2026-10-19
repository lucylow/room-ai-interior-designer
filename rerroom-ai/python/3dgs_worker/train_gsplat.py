import argparse, json, shutil, subprocess
from pathlib import Path

def main():
    p=argparse.ArgumentParser();p.add_argument('--dataset',required=True);p.add_argument('--output',required=True);p.add_argument('--tier',default='balanced');p.add_argument('--iterations',type=int,default=15000);a=p.parse_args()
    out=Path(a.output);out.mkdir(parents=True,exist_ok=True)
    gsplat=shutil.which('python')
    manifest={'dataset':a.dataset,'output':a.output,'tier':a.tier,'iterations':a.iterations,'backend':'gsplat-adapter','status':'ready'}
    (out/'training_manifest.json').write_text(json.dumps(manifest,indent=2))
    # The actual differentiable training lives in the GPU environment. This script deliberately writes
    # a reproducible job manifest rather than pretending CPU demo code is equivalent to CUDA rasterization.
    print(json.dumps(manifest))

if __name__=='__main__': main()
