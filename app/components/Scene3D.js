'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating Particles ─────────────────────────────────────────────────── */
function Particles({ count = 200 }) {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 2 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, sizes, speeds };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * particles.speeds[i] + i) * 0.002;
      positions[i3] += Math.cos(time * particles.speeds[i] * 0.5 + i) * 0.001;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Geometric Wireframes ───────────────────────────────────────────────── */
function FloatingGeometry() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.3;
    groupRef.current.rotation.y = time * 0.08;
    groupRef.current.rotation.z = Math.cos(time * 0.1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Icosahedron */}
      <mesh position={[3, 1, -2]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.06} transparent />
      </mesh>

      {/* Octahedron */}
      <mesh position={[-3, -1, -3]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.04} transparent />
      </mesh>

      {/* Torus */}
      <mesh position={[0, 2.5, -4]}>
        <torusGeometry args={[1.5, 0.02, 16, 60]} />
        <meshBasicMaterial color="#ffffff" opacity={0.06} transparent />
      </mesh>

      {/* Ring */}
      <mesh position={[-2, -2, -2]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.8, 0.01, 8, 40]} />
        <meshBasicMaterial color="#ffffff" opacity={0.05} transparent />
      </mesh>
    </group>
  );
}

/* ── Main Scene Component ───────────────────────────────────────────────── */
export default function Scene3D() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <Particles count={150} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
