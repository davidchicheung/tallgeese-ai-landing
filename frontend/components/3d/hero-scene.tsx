"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Generate nodes distributed in a sphere
function generateGraph(nodeCount: number, edgeCount: number, radius: number) {
  const nodes: { position: THREE.Vector3; color: string; size: number }[] = [];
  const edges: { start: number; end: number }[] = [];

  const colors = ["#ef4444", "#3b82f6", "#22c55e", "#a1a1aa", "#f97316", "#8b5cf6"];

  // Distribute nodes in a sphere using fibonacci sphere
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const r = radius * (0.4 + Math.random() * 0.6);
    const x = r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 0.15;
    const y = r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 0.15;
    const z = r * Math.cos(phi) + (Math.random() - 0.5) * 0.15;

    nodes.push({
      position: new THREE.Vector3(x, y, z),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.015 + Math.random() * 0.025,
    });
  }

  // Create edges connecting nearby nodes
  const usedEdges = new Set<string>();
  for (let i = 0; i < edgeCount; i++) {
    const a = Math.floor(Math.random() * nodeCount);
    let b = a;
    const candidates: number[] = [];

    for (let j = 0; j < nodeCount; j++) {
      if (j === a) continue;
      const dist = nodes[a].position.distanceTo(nodes[j].position);
      if (dist < radius * 0.6) {
        candidates.push(j);
      }
    }

    if (candidates.length > 0) {
      b = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      b = (a + 1 + Math.floor(Math.random() * 5)) % nodeCount;
    }

    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (!usedEdges.has(key) && a !== b) {
      usedEdges.add(key);
      edges.push({ start: a, end: b });
    }
  }

  return { nodes, edges };
}

function KnowledgeGraph({
  elapsedRef,
}: {
  elapsedRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const edgeMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [visibleNodes, setVisibleNodes] = useState(0);

  const { nodes, edges } = useMemo(() => generateGraph(120, 200, 0.8), []);

  // Build edge geometry
  const edgeGeometry = useMemo(() => {
    const positions: number[] = [];
    for (const edge of edges) {
      const start = nodes[edge.start].position;
      const end = nodes[edge.end].position;
      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [nodes, edges]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }

    const elapsed = elapsedRef.current;

    // Phase 1: Nodes populate (0–1.2s)
    const targetVisible = Math.min(
      nodes.length,
      Math.floor((elapsed / 1.2) * nodes.length)
    );
    if (targetVisible !== visibleNodes) {
      setVisibleNodes(targetVisible);
    }

    // Animate node scales for recently appeared nodes
    for (let i = 0; i < nodes.length; i++) {
      const mesh = nodeRefs.current[i];
      if (!mesh) continue;
      const delay = (i / nodes.length) * 1.2;
      const t = Math.min(1, Math.max(0, (elapsed - delay) / 0.3));
      // Ease out
      const scale = t * (2 - t);
      mesh.scale.setScalar(scale);
    }

    // Phase 1: Edges fade in (0.3–1.5s)
    if (edgeMaterialRef.current) {
      const edgeT = Math.min(1, Math.max(0, (elapsed - 0.3) / 1.2));
      edgeMaterialRef.current.opacity = edgeT * 0.7;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          ref={edgeMaterialRef}
          color="#94a3b8"
          transparent
          opacity={0}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          position={node.position}
          visible={i < visibleNodes}
          scale={0}
        >
          <sphereGeometry args={[node.size, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function CylinderWithGraph() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const elapsedRef = useRef(0);
  const cylinderRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    // Phase 2: Cylinder grows up (1.5–3.0s)
    if (cylinderRef.current) {
      const elapsed = elapsedRef.current;
      if (elapsed < 1.5) {
        cylinderRef.current.scale.y = 0;
        cylinderRef.current.position.y = -1;
        cylinderRef.current.visible = false;
      } else {
        cylinderRef.current.visible = true;
        const t = Math.min(1, (elapsed - 1.5) / 1.5);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        cylinderRef.current.scale.y = eased;
        cylinderRef.current.position.y = -1 + eased;
      }
    }
  });

  return (
    <group>
      {/* Knowledge graph sphere inside (renders first) */}
      <KnowledgeGraph elapsedRef={elapsedRef} />

      {/* Cylinder - faux frosted glass (renders after, no depth write) */}
      <mesh ref={cylinderRef} renderOrder={1} visible={false} scale={[1, 0, 1]} position={[0, -1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2, 64]} />
        <meshStandardMaterial
          transparent
          opacity={0.3}
          depthWrite={false}
          color={isDark ? "#a8c4e6" : "#d4e4f7"}
          roughness={0.15}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mx-auto pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 3]} intensity={0.4} color="#e2e8f0" />
        <CylinderWithGraph />
      </Canvas>
    </div>
  );
}
