'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';

// Belvest palette — cream reads cleanly against the dark teal gradient beneath,
// matching the cream headline text. No other colours.
const CREAM = '#FFF0CC'; // points + connecting lines

const POINT_COUNT = 50;   // low — background accent, not a simulation
const SPREAD = 7;         // cloud radius
const LINK_DIST = 2.3;    // connect points closer than this

// ─── Point network (constellation) ─────────────────────────────────────────────
function PointNetwork({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);

  // Generated once. The whole cloud only rotates (a rigid transform that preserves
  // distances), so the connecting lines can be computed a single time — no per-frame
  // geometry rebuilds. Cheap enough for low-end hardware.
  const { pointPositions, linePositions } = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      pts.push([
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD,
        (Math.random() - 0.5) * SPREAD * 0.8,
      ]);
    }

    const pointPositions = new Float32Array(POINT_COUNT * 3);
    pts.forEach((p, i) => {
      pointPositions[i * 3] = p[0];
      pointPositions[i * 3 + 1] = p[1];
      pointPositions[i * 3 + 2] = p[2];
    });

    const links: number[] = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      for (let j = i + 1; j < POINT_COUNT; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DIST) {
          links.push(pts[i][0], pts[i][1], pts[i][2], pts[j][0], pts[j][1], pts[j][2]);
        }
      }
    }
    return { pointPositions, linePositions: new Float32Array(links) };
  }, []);

  // Very slow, calm rotation of the whole cloud + a gentle vertical bob (the "drift").
  useFrame((state) => {
    if (!animate || !group.current) return;
    group.current.rotation.y += 0.0005;
    group.current.rotation.x += 0.0002;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={CREAM}
          size={0.11}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={CREAM} transparent opacity={0.25} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ─── Scene wrapper with the mandatory guards ────────────────────────────────────
// 'off'   → render nothing (mobile / not yet measured): WebGL context never created.
// 'static'→ prefers-reduced-motion: a single static frame, no animation loop.
// 'live'  → desktop, motion OK: gentle animated loop.
type Mode = 'off' | 'static' | 'live';

export default function HeroParticleScene() {
  const [mode, setMode] = useState<Mode>('off');

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resolve = () => {
      if (mqMobile.matches) setMode('off');          // never create WebGL on phones
      else if (mqReduced.matches) setMode('static'); // one frame, no loop
      else setMode('live');
    };

    resolve();
    mqMobile.addEventListener('change', resolve);
    mqReduced.addEventListener('change', resolve);
    return () => {
      mqMobile.removeEventListener('change', resolve);
      mqReduced.removeEventListener('change', resolve);
    };
  }, []);

  if (mode === 'off') return null;

  const animate = mode === 'live';

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.9 }}
    >
      <Canvas
        dpr={[1, 1.5]}                              // cap pixel ratio for performance
        frameloop={animate ? 'always' : 'demand'}   // 'demand' → renders a single static frame
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none', background: 'transparent' }}
      >
        <PointNetwork animate={animate} />
      </Canvas>
    </div>
  );
}
