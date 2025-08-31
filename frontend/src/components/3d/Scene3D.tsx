import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface AnimatedShapeProps {
  position: [number, number, number];
  color: string;
  enableAnimations: boolean;
}

function AnimatedSphere({ position, color, enableAnimations }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && enableAnimations) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={enableAnimations ? 2 : 0} rotationIntensity={enableAnimations ? 1 : 0} floatIntensity={enableAnimations ? 2 : 0}>
      <Sphere
        ref={meshRef}
        position={position}
        args={[1, 32, 32]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={enableAnimations ? 0.4 : 0}
          speed={enableAnimations ? 2 : 0}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedBox({ position, color, enableAnimations }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && enableAnimations) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={enableAnimations ? 1.5 : 0} rotationIntensity={enableAnimations ? 0.5 : 0} floatIntensity={enableAnimations ? 1 : 0}>
      <Box
        ref={meshRef}
        position={position}
        args={[1.5, 1.5, 1.5]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </Box>
    </Float>
  );
}

function AnimatedTorus({ position, color, enableAnimations }: AnimatedShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && enableAnimations) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={enableAnimations ? 1.8 : 0} rotationIntensity={enableAnimations ? 0.8 : 0} floatIntensity={enableAnimations ? 1.5 : 0}>
      <Torus
        ref={meshRef}
        position={position}
        args={[1, 0.4, 16, 100]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.7} />
      </Torus>
    </Float>
  );
}

interface Scene3DProps {
  enableAnimations: boolean;
}

export function Scene3D({ enableAnimations }: Scene3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: enableAnimations ? 0.8 : 0, ease: "easeOut" }}
      className="w-full h-full"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="cursor-grab active:cursor-grabbing"
      >
        <Environment preset="city" />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <AnimatedSphere position={[-3, 2, 0]} color="#3b82f6" enableAnimations={enableAnimations} />
        <AnimatedBox position={[3, -1, 0]} color="#ef4444" enableAnimations={enableAnimations} />
        <AnimatedTorus position={[0, 0, -2]} color="#10b981" enableAnimations={enableAnimations} />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          autoRotate={enableAnimations}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  );
}