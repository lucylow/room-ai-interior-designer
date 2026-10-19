# V12 Integration Prompt

Integrate the new V12 layer after the existing V11 3DGS package.

1. Use `V12Orchestrator` and `pipeline/v12-stage-contract` for reconstruction jobs.
2. Use the capture and keyframe modules before any GPU reconstruction task.
3. Feed loop-closure and global-consistency metrics into job quality gates.
4. Connect render budgeting, foveation, frame pacing and dynamic-resolution policy to the existing 2D/3D viewer.
5. Use semantic and intrinsic AI modules for reversible appearance editing; preserve source Gaussian provenance.
6. Use streaming hierarchy/page scheduling for remote scenes.
7. Use CAD/BIM anchor modules to maintain dimensional authority and construction-readiness.
8. Persist edit transactions so every AI change can be previewed, compared, accepted or reverted.
9. Enforce V12 privacy policies on the server before capture uploads and model training reuse.
10. Connect real GPU jobs only through a server-side 3DGS adapter. Never place CUDA/provider credentials in the client.
