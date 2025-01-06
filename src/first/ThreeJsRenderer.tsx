import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { useSpring, easings, useSpringRef, useTrail } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Grid, Bounds, Stats, Box } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";
import Line from "./Line";
import { GradientTexture } from '@react-three/drei';
import SkyBox from "./SkyBox";


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

  const items = useMemo(() => placeRandomly(), []);
  const [trails, api] = useTrail(
    items.length,
    () => ({
        from: { size: FROM },
        to: { size: TO },
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

  function placeRandomly() {
    let positions = []
    for(let x=-10; x < 10; x = x + 1.0) {
        for(let z=-10; z < 10; z = z + 1.0) {
          const y = - Math.random() * 10;
          if(Math.random() > 0.85) {
            positions.push([x, y,z]);
          }
        }
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
        }}
      >
        <Suspense fallback={<FallBackLoader/>}>
          <Stage
            preset="upfront"
            adjustCamera={false}
            intensity={0.50}
            environment={'studio'}
            shadows="contact"
          >
             <group position={[0,10,0]}>
             {trails.map((props, index) =>
                <Line key={index} position={items[index]} size={props.size} color={"#DDA94B"} />
              )
            }
            </group>
            <Box  args={[1, 1, 1]}  color-material="white">
          </Stage>
          <SkyBox  size={25}/>
        </Suspense>
         { import.meta.env.MODE === "development" &&
          <>
          <Stats/>
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          </>
        }
        <OrbitControls makeDefault maxDistance={20} autoRotate={true} autoRotateSpeed={0.25} enableZoom={true} enableRotate={true} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;