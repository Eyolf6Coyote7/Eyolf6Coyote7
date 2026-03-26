import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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

function RotatingSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
      ref.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" metalness={0.4} roughness={0.2} />
    </mesh>
  );
}

export default function ThreeViewer({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 400,
        background: "#1a1d27",
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
    >
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RotatingBox />
        <RotatingSphere position={[2.5, 0, -1]} />
        <gridHelper args={[10, 10, "#333", "#222"]} />
        <OrbitControls enableDamping />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
