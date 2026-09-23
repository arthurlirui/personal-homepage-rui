# GestureCoach for Painting

基于细粒度手势识别的绘画技法智能教练系统 — process-oriented skill assessment
for painting education. Unlike systems that evaluate the final artwork,
GestureCoach analyzes the **painting process** (hand dynamics) and closes the
loop: artist technique representation → learner deviation diagnosis →
actionable corrective feedback.

This repository contains the **core algorithm prototype** (roadmap phase 2):
hand tracking, technique feature extraction, improved-DTW deviation diagnosis,
and rule-engine + LLM feedback generation, plus a FastAPI service and an
offline test suite using synthetic hand data.

## Architecture

```
Video / landmarks          RGB frame
      │                        │
      ▼                        ▼
┌─────────────┐         ┌──────────────────┐
│  tracking   │         │ YOLOv5 brush     │  (绘画工具检测)
│ MediaPipe + │         │ detection        │
│ interp. +   │         └────────┬─────────┘
│ normalize   │                  ▼
└─────────────┘         ┌──────────────────┐
      │                 │ U-Net tool-hand  │  (工具-手部分割)
      ▼                 │ segmentation     │
┌─────────────┐         └────────┬─────────┘
│   features  │◄──────────────────┘  (mask refines landmarks)
│ joint angles │
│ trajectory   │   ┌───────────────┐
│ rhythm (FFT) │   │   template    │  (artist KB)
└──────┬───────┘   └───────┬───────┘
       ▼                   │
┌────────────────────────┐ ▼
│   improved DTW +       │ ┌──────────────┐
│   Procrustes MPJPE     │→│  diagnosis   │
└────────────────────────┘ │  (4 axes)    │
                           └──────┬───────┘
                                   ▼
                           ┌──────────────┐
                           │  feedback    │
                           │  rule + LLM  │
                           └──────────────┘
```

## Modules

| Module | File | Maps to proposal |
|---|---|---|
| Hand tracking | `gesturecoach/tracking.py` | §3.2 — MediaPipe, occlusion interpolation, wrist-relative normalization |
| Feature extraction | `gesturecoach/features.py` | §3.3 — joint angles, trajectory (speed/acc/curvature), rhythm (FFT-PSD) |
| Knowledge base | `gesturecoach/template.py` | §3.3 — per-stage technique templates + statistics |
| Improved DTW | `gesturecoach/dtw.py` | §3.4 — `d(i,j)=α·‖l−r‖+β·(1−cos)`, Procrustes MPJPE, sliding window |
| Deviation diagnosis | `gesturecoach/diagnosis.py` | §3.4 — spatial / posture / direction / temporal |
| Feedback generation | `gesturecoach/feedback.py` | §3.5 — rule engine + LLM, rigid vs elastic |
| Pipeline orchestration | `gesturecoach/pipeline.py` | §3.1 / §3.6 — offline + realtime sliding-window |
| **Brush detection (YOLOv5)** | `gesturecoach/detection.py` | §2.1 — PyTorch YOLOv5-style detector + NMS; heuristic fallback |
| **Tool-hand segmentation (U-Net)** | `gesturecoach/segmentation.py` | §2.1 — PyTorch U-Net 3-class (bg/hand/brush); heuristic fallback |
| **Two-stage tool-hand pipeline** | `gesturecoach/toolhand.py` | §2.1 — YOLO → U-Net, mask remap, landmark refinement |
| **Painting-stage recognition (Bi-GRU + ST-GCN)** | `gesturecoach/stages.py` | §2.1/§3.3 — ST-GCN skeleton graph + Bi-GRU, auto-segments 起稿/铺色/细节; heuristic fallback |
| API service | `gesturecoach/api.py` | REST + WebSocket endpoints, serves built frontend |
| **Frontend (React + WebRTC)** | `frontend/` | Real-time camera capture, skeleton overlay, feedback panel |
| Synthetic data | `gesturecoach/synth.py`, `synth_frame.py` | offline tests / demos without a camera |

## Quick start

```bash
pip install -r requirements.txt
pytest -q                         # 62 tests, no camera needed
```

### Run the full real-time system (frontend + backend)

```bash
# 1. Start the backend (FastAPI + PyTorch models)
uvicorn gesturecoach.api:app --port 8000

# 2a. Production: build the frontend, served by the backend on :8000
cd frontend && npm install && npm run build && cd ..
#   -> open http://localhost:8000

# 2b. Development: run Vite dev server with HMR (proxies API to :8000)
cd frontend && npm install && npm run dev
#   -> open http://localhost:5173
```

The frontend captures the webcam via `getUserMedia` (WebRTC), runs MediaPipe
Hands client-side, draws a color-coded skeleton overlay, and streams sliding-
window landmarks to the backend WebSocket for real-time deviation diagnosis
and feedback.

### Programmatic usage

```python
from gesturecoach.pipeline import GestureCoachPipeline
from gesturecoach.synth import synthetic_hand_sequence

pipe = GestureCoachPipeline()
pipe.add_artist_sequence(synthetic_hand_sequence(n_frames=60, seed=1), label="artist")
learner = synthetic_hand_sequence(n_frames=60, seed=2, grip_curl=0.8)  # tight grip
diag, fb = pipe.run_offline(learner)
print(diag.overall_similarity)
for item in fb.items:
    print(f"[{item.tone.value}] {item.text}")
```

### API endpoints

- `GET /health` — service status + registered stages
- `POST /templates` — register an artist reference (`{landmarks: (T,21,3), stage, fps, label}`)
- `POST /diagnose` — one-shot offline diagnosis of a learner sequence
- `WS /ws/realtime` — streaming sliding-window diagnosis

## Design decisions

- **Improved DTW fusion**: `d(i,j) = α·‖lᵢ−rⱼ‖₂ + β·(1−cos(lᵢ,rⱼ))` captures both
  spatial and direction consistency; `α=0.6, β=0.4` by default (`config.py`).
- **Rigid vs elastic feedback**: posture risks (grip too tight, wrist over-bend)
  are rigid constraints; speed/style deviations are elastic suggestions.
  Language ethics enforced — "可以尝试…" not "你错了…".
- **Offline-first**: MediaPipe and the LLM client are optional; the prototype
  runs fully on synthetic data with deterministic rule-engine feedback.

## Status

Prototype (phase 2 of the roadmap). The algorithm core, knowledge-base
construction, diagnosis, feedback, API, and a 31-test synthetic-data suite are
implemented and passing. Next roadmap phases: real artist data collection,
frontend integration, user study.
