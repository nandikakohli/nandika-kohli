import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This is a placeholder for your 3D character
// You can replace this with your actual 3D model later
const Character = (props: any) => {
  const group = useRef<THREE.Group>(null);
  
  // Simple waving hand animation
  useFrame((state) => {
    if (group.current) {
      // Only animate the hand
      if (group.current.children[0]?.children[1]?.children[0]) {
        const hand = group.current.children[0].children[1].children[0] as THREE.Mesh;
        hand.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={group} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {/* Head */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#f3b3a6" />
        </mesh>
        
        {/* Body with middle section rotated 90 degrees */}
        <group position={[0, 0.5, 0]}>
          {/* Upper body */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.8, 0.5, 0.4]} />
            <meshStandardMaterial color="#fca88e" />
          </mesh>
          
          {/* Middle section - rotated 90 degrees */}
          <mesh position={[0, -0.25, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <boxGeometry args={[0.8, 0.5, 0.4]} />
            <meshStandardMaterial color="#fca88e" />
          </mesh>
          
          {/* Arms */}
          <group position={[0.4, 0, 0]}>
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
              <boxGeometry args={[0.2, 0.7, 0.2]} />
              <meshStandardMaterial color="#f3b3a6" />
            </mesh>
          </group>
          
          <group position={[-0.4, 0, 0]}>
            <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0.5]} castShadow>
              <boxGeometry args={[0.2, 0.7, 0.2]} />
              <meshStandardMaterial color="#f3b3a6" />
            </mesh>
          </group>
        </group>
        
        {/* Legs */}
        <group position={[0, -0.8, 0]}>
          <mesh position={[0.2, -0.5, 0]} castShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
          <mesh position={[-0.2, -0.5, 0]} castShadow>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Character;
