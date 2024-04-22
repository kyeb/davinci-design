import * as React from "react";
import * as classes from "../styles/editor.module.scss";

import { ErrorBoundary } from "./error_boundary";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Mesh, Box3, Vector3 } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const { Suspense, useRef, useEffect } = React;

const ErrorView = () => {
  return <p>An error ocurred while rendering your model 😔</p>;
};

const STLModel = ({ url }) => {
  const stl = useLoader(STLLoader, url);
  const meshRef = useRef<Mesh>();
  const { scene } = useThree();

  // Compute the center of our mesh and move it to 0, 0, 0
  useEffect(() => {
    if (meshRef.current) {
      const bbox = new Box3().setFromObject(meshRef.current);

      const center = new Vector3();
      bbox.getCenter(center);

      meshRef.current.position.x -= center.x;
      meshRef.current.position.y -= center.y;
      meshRef.current.position.z -= center.z;
    }
  }, [scene, stl]);

  return (
    <>
      <mesh ref={meshRef} scale={[0.01, 0.01, 0.01]}>
        <primitive object={stl} attach="geometry"></primitive>
        <meshStandardMaterial color="pink" roughness={0.2} metalness={0.5} />
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
        <directionalLight color="white" position={[0, 0, -5]} />
        <PerspectiveCamera makeDefault position={[3, 2, 5]} />
        <OrbitControls rotateSpeed={0.5} />
        <Suspense fallback={null}>
          <STLModel url={url} />
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export { STLViewer };
