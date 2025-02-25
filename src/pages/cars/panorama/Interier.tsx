/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

const InteriorModel: React.FC = () => {
  const { scene } = useGLTF("/models/mers.glb");
  const modelRef = useRef<any>(null);
  const [rotationY, setRotationY] = useState(0); // Y o‘qi bo‘yicha burilish
  const [rotationX, setRotationX] = useState(0); // X o‘qi bo‘yicha burilish
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = MathUtils.degToRad(0); // 🎯 Model boshlang‘ich joylashuvi
      modelRef.current.rotation.x = MathUtils.degToRad(0);
    }
  }, []);

  // 🖱 Sichqoncha bosilganda holatni eslab qolish
  const onPointerDown = (e: MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };

  // 🔄 Sichqoncha harakatlanganda modelni x va y o‘qi bo‘yicha aylantirish
  const onPointerMove = (e: MouseEvent) => {
    if (isDragging.current) {
      const deltaX = e.clientX - lastX.current;
      const deltaY = e.clientY - lastY.current;

      setRotationY((prev) => prev + deltaX * 0.005); // 🎯 Y o‘qi bo‘yicha aylantirish
      setRotationX((prev) =>
        Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev + deltaY * 0.005))
      ); // 🎯 X o‘qi bo‘yicha aylantirish

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    }
  };

  // 🖱 Sichqoncha qo‘yib yuborilganda aylantirishni to‘xtatish
  const onPointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = rotationY; // Y o‘qi bo‘yicha aylantirish
      modelRef.current.rotation.x = rotationX; // X o‘qi bo‘yicha aylantirish
    }
  });

  return (
    <primitive
      ref={modelRef}
      position={[0, 0, 0]}
      object={scene}
      dispose={null}
    />
  );
};

const Interier: React.FC = () => {
  return (
    <Canvas
      style={{
        background: "#eeeeee",
        width: "100vw",
        height: "100vh",
        cursor: "grab",
      }}
      camera={{ position: [0, 1.5, 0], fov: 75 }} // 🚗 Kamera avtomobil ichida shift roofga joylashadi
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      <Suspense
        fallback={
          <Html>
            <h1>Yuklanmoqda ...</h1>
          </Html>
        }
      >
        <InteriorModel />
      </Suspense>

      {/* ❌ OrbitControls ishlatilmaydi - Kamera qimirlamaydi */}
    </Canvas>
  );
};

export default Interier;
