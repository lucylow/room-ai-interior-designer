import argparse, shutil, subprocess
from pathlib import Path

def main():
    p=argparse.ArgumentParser();p.add_argument('--images',required=True);p.add_argument('--workspace',required=True);a=p.parse_args()
    ws=Path(a.workspace);ws.mkdir(parents=True,exist_ok=True)
    colmap=shutil.which('colmap')
    if not colmap:
        raise SystemExit('COLMAP executable not found. Install COLMAP on the reconstruction worker.')
    db=ws/'database.db';sparse=ws/'sparse';sparse.mkdir(exist_ok=True)
    cmds=[
      [colmap,'feature_extractor','--database_path',str(db),'--image_path',a.images],
      [colmap,'exhaustive_matcher','--database_path',str(db)],
      [colmap,'mapper','--database_path',str(db),'--image_path',a.images,'--output_path',str(sparse)],
    ]
    for cmd in cmds: subprocess.run(cmd,check=True)

if __name__=='__main__': main()
