import { useRef, Suspense, useEffect, useState } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { useSpring, easings, useSpringRef } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Grid, Bounds, Stats, Box } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";
import Line from "./Line";

interface ThreeJsRendererProps {
}

const FROM = [4,1,0.5];
const TO = [1,4,0.5]

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });

    const [springs, api] = useSpring(() => ({
        from: { size: FROM, endIteration: false },
        to: { size: TO, endIteration: true },
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
                from: { size: FROM, endIteration: true }, to: { size: TO, endIteration: false }
              }
            )
          } else {
            api.start(
              {
                from: { size: TO, endIteration: false }, to: { size: FROM, endIteration: true }
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
    let positions = []
    for(let x=-10; x < 10; x = x + 1.0) {
        const z = Math.random() * 10;
        const y = - Math.random() * 10;
        positions.push([x, y,z]);
    }
    return positions;
  }

  return (
    <div ref={canvasContainerRef} className="w-full h-full max-h-[92%]" style={{width: '100%', height: '100vh'}} >
      <Canvas
        camera={{ position: [0,0.75, 15], fov: 75, far: 50 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
         // recenter();
        }}
      >
        <color attach="background" args={['#1E4174']} />
        { import.meta.env.MODE === "development" ? <Stats/> : <></> }
        <Suspense fallback={<FallBackLoader/>}>
          <Stage
            preset="upfront"
            adjustCamera={false}
            intensity={1.0}
            environment={'studio'}
            shadows="contact"
          >
             <group position={[0,10,0]}>
             {placeRandomly().map((position, index) =>
                <Line key={index} position={position} size={springs.size} color={"#DDA94B"} />
              )
            }
            </group>
          </Stage>
        </Suspense>
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
        <OrbitControls makeDefault maxDistance={15} />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;