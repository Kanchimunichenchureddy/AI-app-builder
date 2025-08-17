import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useGLTF, useFBX } from '@react-three/drei';
import * as THREE from 'three';
import type { ModelData } from '@/pages/ModelEditor';

interface Model3DViewerProps {
  modelData: ModelData;
  animations: {
    rotate: boolean;
    bounce: boolean;
    hover: boolean;
    speed: number;
  };
  enableAnimations: boolean;
}

function ModelMesh({ url, modelData, animations, enableAnimations }: { 
  url: string;
  modelData: ModelData;
  animations: Model3DViewerProps['animations'];
  enableAnimations: boolean;
}) {
  const meshRef = useRef<any>(null);
  const initialY = useRef(modelData.position[1]);
  
  // Determine file type and load accordingly
  const fileExtension = url.split('.').pop()?.toLowerCase();
  
  let model = null;
  
  try {
    if (fileExtension === 'gltf' || fileExtension === 'glb') {
      const gltf = useGLTF(url);
      model = gltf.scene;
    } else if (fileExtension === 'fbx') {
      model = useFBX(url);
    }
  } catch (error) {
    console.warn('Error loading model:', error);
  }

  useFrame((state) => {
    if (!meshRef.current || !enableAnimations) return;

    const time = state.clock.elapsedTime;
    const group = meshRef.current;

    // Apply transforms
    group.position.set(...modelData.position);
    group.rotation.set(...modelData.rotation);
    group.scale.set(...modelData.scale);

    // Apply animations
    if (animations.rotate) {
      group.rotation.y += 0.01 * animations.speed;
    }

    if (animations.bounce) {
      group.position.y = initialY.current + Math.sin(time * 2 * animations.speed) * 0.5;
    }

    if (animations.hover) {
      group.position.y = initialY.current + Math.sin(time * 3 * animations.speed) * 0.2;
      group.rotation.x = Math.sin(time * 2 * animations.speed) * 0.1;
    }
  });

  useEffect(() => {
    initialY.current = modelData.position[1];
  }, [modelData.position]);

  useEffect(() => {
    if (!model) return;

    // Apply materials
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: modelData.color,
          roughness: modelData.roughness,
          metalness: modelData.metalness,
          emissive: modelData.emissive,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [model, modelData.color, modelData.roughness, modelData.metalness, modelData.emissive]);

  if (!model) {
    return (
      <group ref={meshRef} position={modelData.position}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={modelData.color}
            roughness={modelData.roughness}
            metalness={modelData.metalness}
            emissive={modelData.emissive}
          />
        </mesh>
      </group>
    );
  }

  return <primitive ref={meshRef} object={model.clone()} />;
}

export function Model3DViewer({ modelData, animations, enableAnimations }: Model3DViewerProps) {
  if (!modelData.url) return null;

  return (
    <ModelMesh 
      url={modelData.url}
      modelData={modelData}
      animations={animations}
      enableAnimations={enableAnimations}
    />
  );
}