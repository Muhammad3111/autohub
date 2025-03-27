/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { MathUtils, MeshStandardMaterial } from "three";
import { useNavigate } from "react-router-dom";

const Loader: React.FC = () => {
  const { progress } = useProgress(); // Yuklanish foizini olish

  return (
    <Html center>
      <div style={{ width: "200px", textAlign: "center" }}>
        <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
          Yuklanmoqda... {Math.round(progress)}%
        </p>
        <div
          style={{
            width: "100%",
            height: "10px",
            background: "#ddd",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "blue",
              borderRadius: "5px",
              transition: "width 0.2s ease-out",
            }}
          />
        </div>
      </div>
    </Html>
  );
};

const FerrariModel: React.FC = () => {
  const { scene } = useGLTF("/models/mers.glb");
  const modelRef = useRef<any>(null);
  const [color, setColor] = useState(""); // Default: Qizil rang
  const navigate = useNavigate();
  // Modelni boshlang'ich pozitsiyada aylantirish
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = MathUtils.degToRad(-35);
    }
  }, []);

  // Rangni almashtirish uchun funksiya
  const changeColor = (color: string) => {
    // Qizil yoki Ko'k
    setColor(color);
  };

  // Materialni o‘zgartirish
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child: any) => {
        if (child.isMesh && child.name.includes("Plane")) {
          // Agar meshning nomi "Body" bo‘lsa, rangini o‘zgartiramiz
          child.material = new MeshStandardMaterial({ color });
        }
      });
    }
  }, [color]);

  return (
    <>
      <primitive
        ref={modelRef}
        position={[0, -0.5, 0]}
        object={scene}
        dispose={null}
      />

      {/* Button 3D sahnada joylashgan */}
      <Html transform={false} zIndexRange={[1, 0]} className="h-screen">
        <div className="flex gap-4 items-center absolute left-1/2 top-[40%] -translate-x-1/2">
          <button
            onClick={() => changeColor("white")}
            className="w-5 h-5 rounded-full bg-white"
          ></button>
          <button
            onClick={() => changeColor("blue")}
            className="w-5 h-5 rounded-full bg-blue-600"
          ></button>
          <button
            onClick={() => changeColor("red")}
            className="w-5 h-5 rounded-full bg-red-600"
          ></button>
          <button
            onClick={() => changeColor("black")}
            className="w-5 h-5 rounded-full bg-black"
          ></button>
          <button
            onClick={() => navigate(`/cars/3dmodel/interier`)}
            className="bg-primary text-white text-sm px-2 py-1"
          >
            <span className="text-black">Interier</span>
          </button>
        </div>
      </Html>
    </>
  );
};

const Panorama: React.FC = () => {
  return (
    <Canvas
      style={{
        background: "#eeeeee",
        width: "100vw",
        height: "100vh",
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
      <Suspense fallback={<Loader />}>
        <FerrariModel />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        {/* shadowMaterial soya effektini beradi */}
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      {/* OrbitControls foydalanuvchiga sichqoncha orqali modelni aylantirish imkoniyatini beradi */}
      <OrbitControls
        enableZoom={false}
        rotateSpeed={0.5}
        dampingFactor={0.1}
        enableDamping={true}
      />
    </Canvas>
  );
};

export default Panorama;
