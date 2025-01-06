import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { BoxGeometry, MeshStandardMaterial } from "three";
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Stats } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import Lights from "./Lights";
import Shape from "./Shape";
import { LENGTH } from "./const"

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });

  return (
    <div ref={canvasContainerRef} className="w-full h-full max-h-[92%]" style={{width: '100%', height: '100vh'}} >
      <Canvas
        camera={{ position: [0,2, 3], fov: 75, far: 50 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
        }}
        /*gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false
        }}*/
      >
        <color attach="background" args={["#333333"]} />
        <fog attach="fog" color="pink" near={0} far={LENGTH * 2.25} />
        <Suspense fallback={<FallBackLoader/>}>
            <Stage preset="rembrandt" intensity={0.1} environment="city">
              <group rotation={[-Math.PI/2, 0, Math.PI/4]}>
                <Lights />
                <Shape />
              </group>
            </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          maxDistance={20}
          autoRotate={true}
          autoRotateSpeed={0.25}
          enableZoom={true}
          enableRotate={true}
          enablePan={false}
        />
      { import.meta.env.MODE === "development" &&
        <>
        <Stats/>
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        </>
      }
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;