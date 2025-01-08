import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';

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
  const { y } = useControls("Light", {y: {value: 5, step: 0.2, min: -10, max: 10}})

  const framePosition = -20;
  const frameRef = useRef();
  const cameraControllerRef = useRef<CameraControls|null>(null);

  function recenter() {
     if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }
    cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 }
    );
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
        <color attach="background" args={["#999"]} />
        {/*<fog attach="fog" color="red" near={0} far={10} />*/}
        <pointLight position={[5,y,5]} intensity={200} />
        <pointLight position={[-3,-3,2]} intensity={1} />
        <ambientLight />
        <Suspense fallback={<FallBackLoader/>}>
           {/*<Stage adjustCamera={false} preset="soft" intensity={0.1} environment="warehouse" shadows="accumulative">*/}
              {/*<mesh castShadow receiveShadow position={[0,3,0]}>
                <torusKnotGeometry args={[1, 0.4, 64, 16]} />
                <meshToonMaterial color={"red"} />
              </mesh>*/}

              <mesh ref={frameRef} castShadow receiveShadow position={[0,0,framePosition]}>
                <boxGeometry args={[20, 20, 0.5]} />
                <meshToonMaterial color={"red"} />
              </mesh>

              <Painting />

            {/* <Leather position={[-2,-1,0]} scale={[2,1,0.5]}/>
             <Metal position={[0,0,0]} scale={[1,1,0.2]} />
             <Blanket position={[0,2,0]} scale={[1,1,0.2]} />
*/}
            {/*</Stage>*/}

           <EffectComposer multisampling={ 0 }>
               <Pixelation granularity={2} />
               <Noise premultiply={true} />
               <Vignette />
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
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;