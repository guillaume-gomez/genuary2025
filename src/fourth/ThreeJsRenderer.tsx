import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { useSpring, easings, useSpringRef, useTrail } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Grid, Bounds, Stats, Box } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { Bloom, EffectComposer, Noise, Vignette, Pixelation, ToneMapping, Glitch } from '@react-three/postprocessing'

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });

  const [trails, api] = useTrail(
    5,
    () => ({
        from: { size: [0,0,0] },
        to: { size: [1,1,1] },
        delay: 500,
        config: {
          precision: 0.0001,
          duration: 2000,
          easing: easings.easeOutQuart
        },
        loop: { reverse: true }
      }),
    []
  )

  useEffect(() => {
    api.start();
  },[api]);



  return (
    <div ref={canvasContainerRef} className="w-full h-full max-h-[92%]" style={{width: '100%', height: '100vh'}} >
      <Canvas
        camera={{ position: [0,0.75, 3], fov: 75, far: 50 }}
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
        { import.meta.env.MODE === "development" ? <Stats/> : <></> }
        <color attach="background" args={["grey"]} />
        <fog attach="fog" color="black" near={0} far={2} />
        <Suspense fallback={<FallBackLoader/>}>
            <Stage preset="upfront" preset="rembrandt" intensity={1} environment="city">
              <mesh castShadow receiveShadow position={[0,2,0]}>
                <boxGeometry args={[1,2,1]} />
                <meshStandardMaterial color="blue"/>

              </mesh>

              <mesh castShadow receiveShadow position={[-2,2,0]}>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color="red"/>

              </mesh>
            </Stage>
        </Suspense>

        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <OrbitControls makeDefault maxDistance={20} autoRotate={true} autoRotateSpeed={0.25} enableZoom={true} enableRotate={true} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;