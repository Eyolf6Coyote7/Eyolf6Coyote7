---
name: three-viewer-r3f
description: Embed a React Three Fiber + drei 3D viewer in a React component with Canvas, OrbitControls, Environment lighting, and useFrame animation hooks.
when_to_use:
  - add a 3D preview / viewer / model display to `asset-portal
  - show animated geometry, rotating mesh, or interactive 3D scene
  - mentions `Canvas`, `useFrame`, `OrbitControls`, `Environment`, `meshStandardMaterial`, `gltf`, `r3f`, `drei
  - replace a static thumbnail with an interactive 3D preview
tech_stack:
  - react
  - react-three-fiber
  - drei
  - three.js
  - webgl
harness: fe-csr
project: 3d_asset_collaboration
---

## When to use

Trigger when the user asks to:
- add a 3D preview / viewer / model display to `asset-portal`
- show animated geometry, rotating mesh, or interactive 3D scene
- mentions `Canvas`, `useFrame`, `OrbitControls`, `Environment`, `meshStandardMaterial`, `gltf`, `r3f`, `drei`
- replace a static thumbnail with an interactive 3D preview

DO NOT use this skill for chart visualizations or 2D SVG renders — use `iot-realtime-dashboard` for SVG line charts.

## Context

`asset-portal/src/components/ThreeViewer.tsx:1-62` is the canonical R3F viewer. Defining traits:

1. **`<Canvas camera={{ position: [3, 2, 5], fov: 50 }}>`** wraps the scene. Camera position uses XYZ tuple; fov is 50 by default.
2. **Lighting**: `<ambientLight intensity={0.4} />` + `<directionalLight position={[5, 5, 5]} intensity={1} />`. ALWAYS provide both — without ambient, materials look black.
3. **`<Environment preset="city" />`** from `@react-three/drei` provides image-based lighting. Other valid presets: `apartment`, `sunset`, `night`, `studio`, `warehouse`, `forest`, `lobby`, `park`, `dawn`.
4. **`<OrbitControls enableDamping />`** for camera drag rotation. `enableDamping` is required for smooth deceleration.
5. **`useFrame((_, delta) => { ... })`** for per-frame animation. ALWAYS multiply by `delta` (seconds since last frame) — never use raw incremental values, they break on different framerates.
6. **Mesh refs** typed `useRef<Mesh>(null)` from `import type { Mesh } from "three"`. Always null-check `if (ref.current)` inside `useFrame` because the ref may be unset before mount.
7. **Container**: outer `<div>` with explicit `width / height / minHeight: 400 / borderRadius: 12 / overflow: hidden / background: "#1a1d27"`. The dark background prevents WHITE FLASH while WebGL initializes.

## Operating instructions

When adding a new R3F component:

1. Create file under `asset-portal/src/components/`. Default-export the component.
2. Wrap in a styled `<div>` container with min height 400 + dark background.
3. Inside, render `<Canvas camera={{ position: [...], fov: ... }}>`.
4. Add lights FIRST (ambient + directional), THEN meshes, THEN helpers (gridHelper / axesHelper), THEN OrbitControls + Environment.
5. For animated meshes, define a child component with its own `useRef<Mesh>(null)` + `useFrame` block. Don't put refs / useFrame on the parent Canvas.
6. For real models, swap `<boxGeometry>` / `<sphereGeometry>` for `useGLTF('/models/foo.glb')` from drei (separate skill if needed; this skill covers primitives).
7. Add a story under `asset-portal/src/components/<Name>.stories.tsx` for Storybook coverage.
8. NEVER call `requestAnimationFrame` directly — always go through `useFrame`.

## Reusable prompts / code patterns

Animated mesh component:
```tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function RotatingBox() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.7;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6c63ff" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}
```

Full Canvas with lighting + helpers:
```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

export default function MyViewer() {
  return (
    <div style={{ width: "100%", minHeight: 400, background: "#1a1d27", borderRadius: 12, overflow: "hidden" }}>
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingBox />
        <gridHelper args={[10, 10, "#333", "#222"]} />
        <OrbitControls enableDamping />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
```

Floating animation pattern (sin-wave):
```tsx
useFrame((_, delta) => {
  if (ref.current) {
    ref.current.rotation.y += delta * 0.4;
    ref.current.position.y = basePosition[1] + Math.sin(Date.now() * 0.002) * 0.3;
  }
});
```

## Anti-patterns

- Do NOT skip ambient light — directional alone gives near-black materials.
- Do NOT skip the dark background div — WebGL canvases white-flash during init.
- Do NOT use raw frame counters; ALWAYS multiply by `delta`.
- Do NOT put `useFrame` in the Canvas parent component — it must be inside a Canvas child.
- Do NOT forget `enableDamping` on `OrbitControls` — without it, drag feels broken.
- Do NOT instantiate multiple `<Environment>` components in one Canvas — only ONE per scene.
- Do NOT manually call `requestAnimationFrame` — R3F owns the render loop.

## References

- `asset-portal/src/components/ThreeViewer.tsx:1-62` — full canonical viewer
- `asset-portal/src/components/ThreeViewer.stories.tsx` — Storybook story pattern
- `asset-portal/package.json` — `@react-three/fiber`, `@react-three/drei`, `three` versions
