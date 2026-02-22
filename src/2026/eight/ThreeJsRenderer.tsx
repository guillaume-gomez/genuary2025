import { useRef, Suspense, useEffect, useState } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { useTrail,useSprings } from '@react-spring/three'
import {
  Float,
  ContactShadows,
  OrbitControls,
  GizmoHelper,
  GizmoViewport,
  Stats,
  Environment,
  Outlines,
  Stage,
} from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import FallBackLoader from "../../2025/first/FallBackLoader";
import Striplight from "./Striplight";
import Blocks from "./Blocks";


interface ThreeJsRendererProps {
}


function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef(null);
  const currentFocusBlock = useRef(null);

  const {
    toggleFullscreen,
  } = useFullscreen({ target: canvasContainerRef });

  const [trails, api] = useSprings(
    49,
    (springIndex: number) => {
      const offset = (7 * 20) /2;
      const xPos = (springIndex % 7) * 20;
      const yPos = (Math.floor(springIndex / 7)) * 20;

      return (
        {
          from: { scale: 0, x: (-offset + xPos), z: (-offset + yPos) },
          to: { scale: 1, x:  -offset + xPos, z:  -offset + yPos },
          config: {
            duration: 1000
          },
          delay: springIndex * 1100,
        }
      );
    },
    []
  );

  return (
    <div ref={canvasContainerRef} className="w-full h-full h-screen">
      <Canvas
        camera={{ position: [0,200, 400], fov: 75, far: 500 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
        }}
      >
        <fogExp2 attach="fog" color="pink" density={0.01} />
        <Suspense fallback={<FallBackLoader/>}>
          <color attach="background" args={["#404040"]} />
          <ambientLight intensity={1.5} />
          <hemisphereLight args={[ 0xffffbb, 0xFF0000, 1 ]} />
          
          {/*
            <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
            <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />
          */}
        

          <group position={[0, -1.5, 0]}>
            <Float position={[0, 2.15, 0]} speed={2} rotationIntensity={2} floatIntensity={2}>
              <mesh castShadow receiveShadow>
                <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />
                <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} />
              </mesh>
            </Float>
            <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
          </group>

          {
            trails.map( (props) => {
              return (
                <Blocks
                  scale={props.scale}
                  //ref={indexX + 7 * indexZ === currentFocusIndex.current ? currentFocusBlock : null}
                  position={[props.x, 0, props.z]}
                  blocksData={
                    [
                      { position: [2, 5, 5], width:8, height: 10, depth: 4 }
                    ]
                  }
                />
              )
            }
          )}
 
          <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={1} />
          </EffectComposer>

        </Suspense>
        
        { import.meta.env.MODE === "development" && (<>
          <Stats/>
          <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
          </>)
        }
        <OrbitControls
          makeDefault
          maxDistance={50}
          //autoRotate={true}
          autoRotateSpeed={0.25}
          enableZoom={true}
          enableRotate={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;