import { useRef, Suspense } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport, Stage, Stats, OrbitControls } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { EffectComposer, Noise } from '@react-three/postprocessing'
import Seat from "./Seat";

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
  } = useFullscreen({ target: canvasContainerRef });

  const cameraControllerRef = useRef(null);


  return (
    <div ref={canvasContainerRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0,1.5, 3.5], fov: 75, far: 50 }}
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
        <color attach="background" args={["pink"]} />
        {/*<fog attach="fog" color="pink" near={0} far={12 * 2.25} />*/}
        <Suspense fallback={<FallBackLoader/>}>
          <Stage preset="rembrandt" intensity={1.0} shadows={false} environment="city">
            <Seat position={[0,2,0]} />

           <EffectComposer multisampling={ 0 }>
               <Noise premultiply={true} />
            </EffectComposer>

          </Stage>
        </Suspense>
        <OrbitControls
          ref={cameraControllerRef}
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