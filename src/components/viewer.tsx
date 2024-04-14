import * as React from "react";
import { Suspense } from "react";

import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Canvas, useLoader } from "@react-three/fiber";

function STLModel({ url }) {
  const stl = useLoader(STLLoader, url);
  return <primitive object={stl} scale={[0.5, 0.5, 0.5]} />;
}

const STLViewer = ({ url }) => {
  return (
    <Canvas style={{ background: "lightblue" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <STLModel url={url} />
      </Suspense>
    </Canvas>
  );
};

export { STLViewer };
