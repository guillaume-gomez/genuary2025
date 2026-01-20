import { useRef, Suspense, useEffect, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { easings, useTrail } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Stats } from '@react-three/drei';
import FallBackLoader from "./FallBackLoader";
import Line from "./Line";
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
    <div ref={canvasContainerRef} className="w-full h-full h-screen">
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
            intensity={0.2}
            environment={'studio'}
            shadows="contact"
          >
             <group position={[0,10,0]}>
             {trails.map((props, index) => {
                console.log(props.size)
                return <Line
                  key={index}
                  position={items[index] as unknown as [number, number, number] }
                  size={props.size as unknown as [number, number, number]}
                  color={"#DDA94B"}
                />
              })
            }
            </group>
          </Stage>
          <SkyBox  size={25}/>

        </Suspense>
         { import.meta.env.MODE === "development" && (<>
          <Stats/>
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          </>)

        }
        <OrbitControls makeDefault maxDistance={20} autoRotate={true} autoRotateSpeed={0.25} enableZoom={true} enableRotate={true} enablePan={false} />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;