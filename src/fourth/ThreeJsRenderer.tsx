import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { easings, useSpring, useSpringRef } from '@react-spring/web';
import { animated } from '@react-spring/three';
import { CameraControls, GizmoHelper, GizmoViewport, Stage, Stats } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { Bloom, EffectComposer, Noise, Vignette, Pixelation,BrightnessContrast  } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva';
import Leather from "./Leather";
import Blanket from "./Blanket";
import Metal from "./Metal";
import Painting from "./Painting";

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });
  /*const { x, y, z } = useControls("Light", {
    x: {value: 0, step: 0.2, min: -10, max: 10},
    y: {value: 0, step: 0.2, min: -10, max: 10},
    z: {value: 2, step: 0.2, min: -10, max: 10},

  })*/

  const api = useSpringRef();
  const [spring] = useSpring(
    () => {
      return {
          ref: api,
          from: { intensity: 0.1,  },
          to:  { intensity: 3.1 },
          config: {
            precision: 0.0001,
            easing: easings.easeOutQuart
          },
        }
      },
    []
  );
  const apiLight = useSpringRef();
  const [springLight] = useSpring(
    () => {
      return {
          ref: apiLight,
          from: { leftX: -5, leftY: 5, rightX: 5, rightY: -5, visible: true },
          to:  { leftX: 5, leftY: -5, rightX: -5, rightY: 5, visible: true },
          loop: { reverse: true },
          config: {
            duration: 5000,
            precision: 0.0001,
            easing: easings.easeInQuad
          },
        }
      },
    []
  );

  const framePosition = -20;
  const frameRef = useRef();
  const cameraControllerRef = useRef<CameraControls|null>(null);


  function recenter() {
     if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }
    cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: 2, paddingRight: 2, paddingBottom: 2, paddingTop: 2 }
    );
    api.start();
    apiLight.start();
  }

  return (
    <div ref={canvasContainerRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0,2, 15], fov: 75, far: 100 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
        }}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: true,
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={["#111"]} />
        {/*<fog attach="fog" color="red" near={0} far={10} />*/}
        <pointLight position={[5,5,5]} intensity={200} />
        <pointLight position={[-3,-3,2]} intensity={10} />
        <animated.spotLight visible={springLight.visible} color="#DDDDDD" angle={0.7} penumbra={0.2}  position-x={springLight.leftX} position-y={springLight.leftY} position-z={2} intensity={1000} />
        <animated.spotLight visible={springLight.visible} color="#FFFFFF" angle={0.7} penumbra={0.2} position-x={springLight.rightX} position-y={springLight.rightY} position-z={2} intensity={1000} />
        <animated.ambientLight intensity={spring.intensity} />
        <Suspense fallback={<FallBackLoader/>}>
          <mesh ref={frameRef} castShadow receiveShadow position={[0,0,framePosition]}>
            <boxGeometry args={[20, 20, 0.5]} />
            <meshStandardMaterial color={"#151515"} emissive={"#000000"} metalness={0.758} roughness={0.351} />
          </mesh>
          <Painting onAnimationFinish={() => recenter()} />

           <EffectComposer multisampling={ 0 }>
               <Pixelation granularity={0} />
               <Noise premultiply={true} />
            </EffectComposer>

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
          minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/1.4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={5}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;