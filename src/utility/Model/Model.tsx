/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

const FerrariModel: React.FC = () => {
  const { scene } = useGLTF("/models/toyota.glb"); // Model faylini mos joyga joylashtiring
  const modelRef = useRef<any>(null);
  const spinComplete = useRef(false);
  const initialRotation = MathUtils.degToRad(-35); // Boshlang'ich 45° burilish
  const rotationSpeed = 6; // Tezlik koeffitsienti; delta * 2 ga oshiriladi

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = initialRotation;
    }
  }, [initialRotation]);

  useFrame((_, delta) => {
    if (modelRef.current && !spinComplete.current) {
      // Tezlikni oshirish uchun delta koeffitsientini ko'paytiramiz
      modelRef.current.rotation.y += delta * rotationSpeed;

      // Agar model boshlang'ich burchakdan to'liq (360° yoki 2π rad) aylanib bo'lsa, to'xtatamiz
      if (modelRef.current.rotation.y >= initialRotation + Math.PI * 2) {
        modelRef.current.rotation.y = initialRotation + Math.PI * 2;
        spinComplete.current = true;
      }
    }
  });
  return (
    <primitive
      ref={modelRef}
      position={[0, -0.5, 0]}
      object={scene}
      dispose={null}
    />
  );
};

const ModelViewer: React.FC = () => {
  return (
    <Canvas
      style={{
        background: "#eeeeee",
        width: "450px",
        height: "350px",
        cursor: "grab",
      }}
      camera={{ position: [0, 0, 4] }}
    >
      {/* Yoritish manbalari */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Modelni asenkron yuklashda fallback */}
      <Suspense
        fallback={
          <Html>
            <div>Model yuklanmoqda...</div>
          </Html>
        }
      >
        <FerrariModel />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        {/* shadowMaterial soya effektini beradi */}
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      {/* OrbitControls foydalanuvchiga sichqoncha orqali modelni aylantirish imkoniyatini beradi */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ModelViewer;
