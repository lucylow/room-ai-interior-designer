import argparse, json
from pathlib import Path

def main():
    p=argparse.ArgumentParser();p.add_argument('--manifest',required=True);a=p.parse_args();data=json.loads(Path(a.manifest).read_text());
    required=['scene_id','stages']
    missing=[k for k in required if k not in data]
    result={'valid':not missing,'missing':missing,'stage_count':len(data.get('stages',[]))}
    print(json.dumps(result))
    raise SystemExit(0 if result['valid'] else 2)

if __name__=='__main__':main()
