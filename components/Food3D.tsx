
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stage, PresentationControls, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';
import { FoodCategory } from '../types';

interface FoodModelProps {
  category: FoodCategory;
  hovered?: boolean;
}

// Vapor/Steam Effect for hot food
const Vapor = ({ count = 5 }) => {
  const points = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 0.5,
      z: (Math.random() - 0.5) * 0.5,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, [count]);

  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.children.forEach((child, i) => {
        child.position.y += points[i].speed * 0.01;
        if (child.position.y > 1) child.position.y = 0;
        child.scale.setScalar(Math.max(0, 1 - child.position.y));
      });
    }
  });

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      {points.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="white" transparent opacity={0.1} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

const BurgerModel = () => (
  <group>
    <mesh position={[0, -0.25, 0]}>
      <cylinderGeometry args={[0.85, 0.85, 0.3, 32]} />
      <meshStandardMaterial color="#c07b3d" roughness={0.7} />
    </mesh>
    <mesh position={[0, -0.05, 0]} rotation={[0.1, 0, 0.1]}>
      <sphereGeometry args={[0.88, 32, 8, 0, Math.PI * 2, 0, 0.2]} />
      <MeshWobbleMaterial color="#4ade80" factor={0.2} speed={1} />
    </mesh>
    <mesh position={[0, 0.05, 0]}>
      <cylinderGeometry args={[0.82, 0.82, 0.25, 32]} />
      <meshStandardMaterial color="#451a03" roughness={1} metalness={0} />
    </mesh>
    <mesh position={[0, 0.18, 0]} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[0.95, 0.04, 0.95]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
    <mesh position={[0.2, 0.22, 0.1]}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
    <mesh position={[-0.2, 0.22, -0.1]}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
    <mesh position={[0, 0.4, 0]}>
      <sphereGeometry args={[0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#c07b3d" />
    </mesh>
    {[...Array(15)].map((_, i) => (
      <mesh 
        key={i} 
        position={[
          Math.sin(i * 1.5) * 0.4, 
          0.4 + Math.cos(i * 0.5) * 0.2, 
          Math.cos(i * 1.5) * 0.4
        ]} 
        rotation={[Math.random(), Math.random(), Math.random()]}
      >
        <capsuleGeometry args={[0.015, 0.03, 4, 8]} />
        <meshStandardMaterial color="#fef3c7" />
      </mesh>
    ))}
    <Vapor count={3} />
  </group>
);

const PizzaModel = () => (
  <group rotation={[Math.PI / 8, 0, 0]}>
    <mesh>
      <torusGeometry args={[0.9, 0.12, 16, 64]} />
      <meshStandardMaterial color="#d97706" roughness={0.8} />
    </mesh>
    <mesh position={[0, -0.05, 0]}>
      <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
      <meshStandardMaterial color="#fcd34d" />
    </mesh>
    <mesh position={[0, 0.07, 0]}>
      <cylinderGeometry args={[0.85, 0.85, 0.02, 32]} />
      <meshStandardMaterial color="#fbbf24" roughness={0.3} />
    </mesh>
    {[...Array(8)].map((_, i) => (
      <mesh key={i} position={[Math.sin(i * 1.1) * 0.5, 0.09, Math.cos(i * 1.1) * 0.5]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
        <meshStandardMaterial color="#b91c1c" />
      </mesh>
    ))}
    <Vapor count={4} />
  </group>
);

const DrinkModel = () => (
  <group>
    <mesh>
      <cylinderGeometry args={[0.45, 0.35, 1.2, 32]} />
      <meshPhysicalMaterial transparent opacity={0.2} transmission={1} thickness={0.5} roughness={0.05} />
    </mesh>
    <mesh position={[0, -0.1, 0]}>
      <cylinderGeometry args={[0.43, 0.33, 0.9, 32]} />
      <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} transparent opacity={0.9} />
    </mesh>
    {[...Array(3)].map((_, i) => (
      <mesh key={i} position={[(i - 1) * 0.1, 0.15, 0]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshPhysicalMaterial transparent opacity={0.4} transmission={1} color="white" />
      </mesh>
    ))}
    <mesh position={[0.1, 0.4, 0]} rotation={[0, 0, -0.2]}>
      <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  </group>
);

const SteakModel = () => (
  <group>
    <mesh position={[0, -0.15, 0]}>
      <cylinderGeometry args={[1.2, 1.2, 0.1, 64]} />
      <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
    </mesh>
    <mesh position={[0, 0.05, 0]} rotation={[0, 0.5, 0]}>
      <boxGeometry args={[1.2, 0.3, 0.7]} />
      <meshStandardMaterial color="#2d0a0a" roughness={1} />
    </mesh>
    <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0.5]}>
      <planeGeometry args={[1.15, 0.65]} />
      <meshStandardMaterial color="#1a0505" roughness={0.3} metalness={0.2} />
    </mesh>
    <Vapor count={6} />
  </group>
);

const PastaModel = () => (
  <group>
    <mesh position={[0, -0.2, 0]}>
      <cylinderGeometry args={[1.1, 1.1, 0.15, 64]} />
      <meshStandardMaterial color="#f8fafc" />
    </mesh>
    <group position={[0, 0.1, 0]}>
      {[...Array(15)].map((_, i) => (
        <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[0.3, 0.03, 8, 32]} />
          <meshStandardMaterial color="#fde047" />
        </mesh>
      ))}
    </group>
    <mesh position={[0, 0.25, 0]}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#dc2626" />
    </mesh>
    <Vapor count={5} />
  </group>
);

const SushiModel = () => (
  <group>
    <mesh position={[0, -0.2, 0]}>
      <boxGeometry args={[1.4, 0.08, 0.8]} />
      <meshStandardMaterial color="#020617" roughness={0.8} />
    </mesh>
    {[...Array(3)].map((_, i) => (
      <group key={i} position={[(i - 1) * 0.45, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.32, 0.1, 0.45]} />
          <meshStandardMaterial color={i === 1 ? "#ef4444" : "#f97316"} roughness={0.4} />
        </mesh>
      </group>
    ))}
    <mesh position={[0.55, 0, 0.2]} rotation={[0, 1, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
  </group>
);

const RamenModel = () => (
  <group>
    {/* Bowl */}
    <mesh>
      <cylinderGeometry args={[1, 0.6, 0.8, 32, 1, true]} />
      <meshStandardMaterial color="#111827" side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, -0.4, 0]}>
      <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
      <meshStandardMaterial color="#111827" />
    </mesh>
    {/* Broth */}
    <mesh position={[0, 0.2, 0]}>
      <cylinderGeometry args={[0.92, 0.92, 0.02, 32]} />
      <meshStandardMaterial color="#3f2305" roughness={0.1} />
    </mesh>
    {/* Egg */}
    <mesh position={[0.3, 0.25, 0.2]} rotation={[0, 0, 0.2]}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <mesh position={[0.3, 0.32, 0.2]} rotation={[0, 0, 0.2]}>
      <sphereGeometry args={[0.08, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
    <Vapor count={8} />
  </group>
);

const TacoModel = () => (
  <group>
    {/* Shell */}
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.8, 0.8, 0.1, 32, 1, true, 0, Math.PI]} />
      <meshStandardMaterial color="#fcd34d" side={THREE.DoubleSide} />
    </mesh>
    {/* Meat Filling */}
    <mesh position={[0, 0.2, 0]}>
      <boxGeometry args={[1.2, 0.3, 0.4]} />
      <meshStandardMaterial color="#451a03" />
    </mesh>
    {/* Toppings */}
    <mesh position={[0, 0.35, 0]}>
      <boxGeometry args={[1, 0.1, 0.3]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
    <Vapor count={2} />
  </group>
);

const FriesModel = () => (
  <group>
    <mesh position={[0, -0.2, 0]}>
      <boxGeometry args={[0.8, 0.6, 0.4]} />
      <meshStandardMaterial color="#dc2626" />
    </mesh>
    {[...Array(15)].map((_, i) => (
      <mesh 
        key={i} 
        position={[
          (Math.random() - 0.5) * 0.7, 
          0.3 + Math.random() * 0.3, 
          (Math.random() - 0.5) * 0.3
        ]} 
        rotation={[Math.random() * 0.4, Math.random() * 0.4, (Math.random() - 0.5) * 0.4]}
      >
        <boxGeometry args={[0.07, 0.7, 0.07]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.6} />
      </mesh>
    ))}
  </group>
);

const DessertModel = () => (
  <group>
    <mesh>
      <sphereGeometry args={[0.65, 64, 64]} />
      <MeshDistortMaterial 
        color="#2e1065" 
        speed={1.5} 
        distort={0.3} 
        roughness={0.1} 
        metalness={1}
        emissive="#581c87"
        emissiveIntensity={0.2}
      />
    </mesh>
    <mesh rotation={[Math.PI/2, 0.5, 0]}>
      <torusGeometry args={[0.8, 0.02, 16, 100]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} />
    </mesh>
  </group>
);

export const FoodModel: React.FC<FoodModelProps> = ({ category, hovered }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      if (hovered) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
        groupRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
        {category === 'Burger' && <BurgerModel />}
        {category === 'Pizza' && <PizzaModel />}
        {category === 'Drink' && <DrinkModel />}
        {category === 'Fries' && <FriesModel />}
        {category === 'Dessert' && <DessertModel />}
        {category === 'Steak' && <SteakModel />}
        {category === 'Pasta' && <PastaModel />}
        {category === 'Sushi' && <SushiModel />}
        {category === 'Ramen' && <RamenModel />}
        {category === 'Taco' && <TacoModel />}
      </Float>
    </group>
  );
};

export const FoodScene: React.FC<{ category: FoodCategory; autoRotate?: boolean }> = ({ category }) => {
  return (
    <Stage environment="city" intensity={0.8} shadows="contact">
      <PresentationControls
        global
        // Fix for "Object literal may only specify known properties, and 'mass' does not exist in type 'Boolean'."
        // The snap prop's type definition appears to only accept boolean in the current environment's @react-three/drei version.
        snap
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <FoodModel category={category} hovered={true} />
      </PresentationControls>
    </Stage>
  );
};
