import { useRef, Suspense, useEffect, useState } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { useSpring, easings, useSpringRef } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Grid, Bounds, Stats, Box } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";
import Line from "./Line";

interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });

    const [springs, api] = useSpring(() => ({
        from: { size: [1,4,1], endIteration: false },
        to: { size: [4,1,1], endIteration: true },
        delay: 500,
        config: {
          precision: 0.0001,
          duration: 2000,
          easing: easings.easeOutQuart
        },
        reset: false,
        onRest: (event) => {
          if(event.value.endIteration) {
            api.start(
              {
                from: { size: [4,1,1], endIteration: true }, to: { size: [1,4,1], endIteration: false }
              }
            )
          } else {
            api.start(
              {
                from: { size: [1,4,1], endIteration: false }, to: { size: [4,1,1], endIteration: true }
              }
            )
          }
        }
      })
    );

  useEffect(() => {
    api.start();
  },[api]);

  function placeRandomly() {
    return [
      [0.1, 2, 3],
      [3, 1, 0.5],
      [1.5, 4, 1.75],
      [0.9, -2, 3],
      [1.5, 1, 1],
      [1.5, 0.4, 3],
      [2, 0, 1.5],
      [-2, 2, -1.5],
      [-2.5, 1, 2],
      [-1, -2, 3],
    ]
  }

  return (
    <div ref={canvasContainerRef} className="w-full h-full max-h-[92%]" style={{width: '100%', height: '100vh'}} >
      <Canvas
        camera={{ position: [0,0.75, 1.5], fov: 75, far: 50 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
         // recenter();
        }}
      >
        <color attach="background" args={['#06092c']} />
        { import.meta.env.MODE === "development" ? <Stats/> : <></> }
        {/*<Suspense fallback={<FallBackLoader/>}>*/}
          <Stage preset="rembrandt" adjustCamera={false} intensity={1.0} environment={null}>
             {placeRandomly().map((position, index) =>
                <Line key={index} position={position} size={springs.size}/>
              )
            }

             <Grid args={[50, 50]} position={[0,0,0]} cellColor='white' />
          </Stage>
        {/*</Suspense>*/}
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <OrbitControls makeDefault maxDistance={20} />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;