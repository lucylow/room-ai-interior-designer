from dataclasses import dataclass, asdict
from pathlib import Path
import json

@dataclass
class Stage:
    name: str
    status: str = "queued"
    progress: float = 0.0
    message: str = ""

@dataclass
class PipelineManifest:
    scene_id: str
    stages: list[Stage]
    gpu_required: bool = True

def manifest(scene_id: str) -> PipelineManifest:
    names=["ingest","frame_quality","colmap","gaussian_init","train","semantic","lod","export","validate"]
    return PipelineManifest(scene_id,[Stage(n) for n in names])

def save(m: PipelineManifest,path:Path)->None:
    path.write_text(json.dumps({"scene_id":m.scene_id,"gpu_required":m.gpu_required,"stages":[asdict(s) for s in m.stages]},indent=2))
