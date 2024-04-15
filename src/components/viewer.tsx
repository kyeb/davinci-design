import * as React from "react";
import * as classes from "../styles/editor.module.scss";

import { ErrorBoundary } from "./error_boundary";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { extend } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "three-stdlib";
extend({ OrbitControls, TransformControls });

const { Suspense, useRef } = React;

const ErrorView = () => {
  return <p>An error ocurred while rendering your model 😔</p>;
};

const STLModel = ({ url }) => {
  const stl = useLoader(STLLoader, url);
  const meshRef = useRef<Mesh>();
  // useFrame((state, delta) => {
  //   if (meshRef.current.rotation) {
  //     meshRef.current.rotation.y -= delta / 2;
  //   }
  // });

  return (
    <>
      <mesh ref={meshRef} scale={[0.01, 0.01, 0.01]}>
        <primitive object={stl} attach="geometry"></primitive>
        <meshStandardMaterial color="orange" roughness={0.2} metalness={0.3} />
      </mesh>
    </>
  );
};

const STLViewer = ({ url }) => {
  return (
    <ErrorBoundary fallback={<ErrorView />}>
      <Canvas className={classes.canvas}>
        <ambientLight />
        <directionalLight color="white" position={[0, 0, 5]} />
        {/* @ts-ignore extends don't get TypeScript support by default */}
        {/* <orbitControls /> */}
        <Suspense fallback={null}>
          <STLModel url={url} />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export { STLViewer };
