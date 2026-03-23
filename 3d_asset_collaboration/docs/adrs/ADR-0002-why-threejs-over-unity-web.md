# ADR-0002: Why Three.js over Embedded Unity for Browser 3D Preview

## Status
Accepted

## Context
Users need to preview 3D assets in the browser without installing Unity. Options:
- **Unity WebGL build** — full Unity runtime in browser, supports all Unity features
- **Three.js** — lightweight JavaScript 3D library, renders GLB/FBX natively

## Decision
Use **Three.js** for browser-based 3D preview. Unity is used only for the desktop client.

## Reason
- Three.js is < 1MB, loads instantly — Unity WebGL build is 20-50MB, takes 5-10s to load
- Three.js supports GLB natively with `GLTFLoader` — the industry standard for web 3D
- Three.js integrates naturally with React (via React Three Fiber)
- Unity WebGL has poor mobile browser support
- Preview only needs rotate/zoom/inspect — doesn't need Unity's full game engine

## Consequences
- Some Unity-specific features (custom shaders, physics) won't render in browser preview
- FBX support requires conversion to GLB (server-side via Blender CLI)
- Need to maintain two 3D rendering paths: Three.js (web) and Unity (client)
