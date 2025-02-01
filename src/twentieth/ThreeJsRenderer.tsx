import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { MeshStandardMaterial } from "three";
import { Canvas } from '@react-three/fiber';
import { easings, useSpring, useSpringRef } from '@react-spring/web';
import { animated } from '@react-spring/three';
import { CameraControls, GizmoHelper, GizmoViewport, Stage, Stats, Grid, Edges, Outlines } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { Bloom, EffectComposer, Noise, Vignette, Pixelation,BrightnessContrast  } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva';
import Room from "./Room";

const material = new MeshStandardMaterial({
  color: "#151515",
  emissive: "#000000",
  metalness: 0.758,
  roughness:0.351
})

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const [hovered, hover] = useState<boolean>(false)
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });
 
  const cameraControllerRef = useRef<CameraControls|null>(null);

  const width = 20;
  const height = 15;
  const depth = 0.5;

  return (
    <div ref={canvasContainerRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0,2, 15], fov: 75, far: 100 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
        }}
      >
        <color attach="background" args={["#FFF"]} />
        <Suspense fallback={<FallBackLoader/>}>
          <ambientLight intensity={0.5} />
          {/*<Stage preset="rembrandt" intensity={0.1} environment={null}>*/}
           {/* <group rotation={[Math.PI/2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                position={[0,0,0]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color="#FF00F0" />
                  <Edges linewidth={20} threshold={15} color={hovered ? "#c02040" : "black"} />
                  <Outlines thickness={0.01} color={hovered ? "#c02040" : "black"} />
              </mesh>
            </group>*/} 
            {/* house */}
            <Room position={[0, 0, 0]} width={20} height={15} depth={1} />

            <Grid args={[50, 50]} position={[0,0,0]} cellColor='blue' />
          {/*</Stage>*/}
        </Suspense>
        { import.meta.env.MODE === "development"  && <>
          <Stats/>
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          </>
        }

        <CameraControls
          makeDefault
          smoothTime={0.25}
          restThreshold={0.1}
          ref={cameraControllerRef}
          /*minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/1.4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}*/
          minDistance={5}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;