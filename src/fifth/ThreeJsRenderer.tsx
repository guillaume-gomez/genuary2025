import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { BoxGeometry, MeshStandardMaterial } from "three";
import { useSpring, easings, useSpringRef, useSprings } from '@react-spring/web';
import { OrbitControls, GizmoHelper, GizmoViewport, Stage, Grid, Bounds, Stats, Box } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { animated } from '@react-spring/three';

interface ThreeJsRendererProps {
}

const LENGTH = 10;
const geometry = new BoxGeometry(0.9,0.9,1);
const material = new MeshStandardMaterial({color: "blue"});

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });

  const positions = useMemo(() => generate(), []);

  const [trails, api] = useSprings(
    positions.length,
    (index: number) => {
      const [x, y] = positions[index];
      const radiusX = Math.abs(LENGTH/2 - x);
      const radiusY = Math.abs(LENGTH/2 - y);
      const distance = Math.sqrt(radiusX * radiusX + radiusY * radiusY);

      return {
        from: { z: 0 },
        to: { z: 2 },
        delay: distance * 1000,
        config: {
          precision: 0.0001,
          //duration: 100, // peut etre que c'est duration qui doit changer
          easing: easings.easeOutQuart
        },
        loop: { reverse: true }
      };
    },
    []
  )

  useEffect(() => {
    api.start();
  },[api]);

  function generate() {
    let positions = [];
    for(let x=0; x < LENGTH; x++) {
      for(let y=0; y < LENGTH; y++) {
        positions.push([x, y]);
      }
    }
    return positions;
  }



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
         <fog attach="fog" color="pink" near={5} far={30} />
        <Suspense fallback={<FallBackLoader/>}>
            <Stage preset="upfront" preset="rembrandt" intensity={1} environment="city">
              <group rotation={[-Math.PI/2, 0, Math.PI/4]}>
              {
                trails.map((props, index) => {
                const [x, y] = positions[index];
                return (
                  <animated.mesh
                    key={index}
                    castShadow
                    receiveShadow
                    position-x={x}
                    position-y={y}
                    position-z={props.z}
                    geometry={geometry}
                    material={material}
                  >
                  </animated.mesh>
                );

              })
              }
              </group>
            </Stage>
        </Suspense>
        <OrbitControls
          makeDefault
          maxDistance={20}
          //autoRotate={true}
          //autoRotateSpeed={0.25}
          enableZoom={true}
          enableRotate={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;