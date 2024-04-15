import * as React from "react";
import { Suspense, useRef } from "react";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";

function STLModel({ url }) {
  const stl = useLoader(STLLoader, url);
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current.rotation) {
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <>
      <mesh ref={meshRef} scale={[0.01, 0.01, 0.01]}>
        <primitive object={stl} attach="geometry"></primitive>
        <meshStandardMaterial color="orange" roughness={0.2} metalness={0.3} />
      </mesh>
    </>
  );
}

const STLViewer = ({ url }) => {
  return (
    <Canvas style={{ background: "lightblue" }}>
      <ambientLight />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <STLModel url={url} />
      </Suspense>
    </Canvas>
  );
};

export { STLViewer };
