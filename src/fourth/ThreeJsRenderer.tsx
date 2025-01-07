import { useRef, Suspense, useEffect, useState, useMemo } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { easings, useTrail, useSprings } from '@react-spring/web';
import { animated } from '@react-spring/three';
import { CameraControls, GizmoHelper, GizmoViewport, Stage, Stats } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
import { Bloom, EffectComposer, Noise, Vignette, Pixelation,BrightnessContrast  } from '@react-three/postprocessing'
import { ToneMappingMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva';
import Leather from "./Leather";
import Blanket from "./Blanket";
import Metal from "./Metal";
import { BoxGeometry } from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';


interface ThreeJsRendererProps {
}

function getRandomNumber(min: number, max: number) : number  {
  return Math.random() * (max - min) + min
}

const geometry = new BoxGeometry(1,1,1);

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });
  const { y } = useControls("Light", {y: {value: 5, step: 0.2, min: -10, max: 10}})

  const frameRef = useRef();
  const cameraControllerRef = useRef<CameraControls|null>(null);

  const framePosition = -20;
  const items = useMemo(() => generate(), []);
  const [trails, api] = useSprings(
    items.length,
    (index: number) => {
      return {
          from: { x: 0, y: 0, z: 20, scaleX: 0, scaleY: 0, scaleZ: 0, type: items[index].type },
          to:  items[index],
          delay: 0,//index * 500,
          config: {
            precision: 0.0001,
            duration: 500,
            easing: easings.easeOutQuart
          },
        }
      },
    []
  );

  useEffect(() => {
    api.start();
  },[api]);

  function recenter() {
     if(!frameRef.current || !cameraControllerRef.current) {
      return;
    }
    cameraControllerRef.current.fitToBox(frameRef.current, true,
      { paddingLeft: .1, paddingRight: .1, paddingBottom: .1, paddingTop: .1 }
    );
  }

  function generate() {
    const types = ['leather', 'metal', 'blanket', 'other'];
    let attributes = []

    for(let index = 0; index < 50; index++) {
      attributes.push({
        x: getRandomNumber(0,20),
        y: getRandomNumber(0,20),
        z: framePosition +1 ,
        scaleX: getRandomNumber(1, 5),
        scaleY: getRandomNumber(1, 5),
        scaleZ: Math.random(),
        type: types[Math.floor(types.length * Math.random())]
      })
    }
    return attributes;
  }


  return (
    <div ref={canvasContainerRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0,2, 15], fov: 75, far: 50 }}
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
          depth: false
        }}
      >
        <color attach="background" args={["#999"]} />
       {/* <fog attach="fog" color="black" near={0} far={10} />*/}
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

              <group position={[-10, -10, 0]}>
                 {/*{trails.map((props, index) => {
                    switch(props.type) {
                      case "leather": return <Leather position={props.position} scale={props.scale}/>;
                      case "metal": return <Metal position={props.position} scale={props.scale}/>;
                      case "blanket": return <Blanket position={props.position} scale={props.scale}/>;
                      case "other": return (<mesh position={props.position} scale={props.scale}>
                                                <boxGeometry args={[1,1,1]} />
                                                <meshStandardMaterial color={"blue"}/>
                                            </mesh>);
                    }
                    return <mesh position={props.position} scale={props.scale}>
                                                <boxGeometry args={[1,1,1]} />
                                                <meshStandardMaterial color={"blue"}/>
                                            </mesh>
                 })
                }*/}

                {trails.map((props, index) => {
                  return (
                    <animated.mesh
                      castShadow
                      receiveShadow
                      key={index}
                      position-x={props.x}
                      position-y={props.y}
                      position-z={props.z}
                      scale-x={props.scaleX}
                      scale-y={props.scaleY}
                      scale-z={props.scaleZ}
                      geometry={geometry}
                    >
                                                <meshStandardMaterial color={"black"}/>
                                            </animated.mesh>)
                })
              }
              </group>

             <Leather position={[-2,-1,0]} scale={[2,1,0.5]}/>
             <Metal position={[0,0,0]} scale={[1,1,0.2]} />
             <Blanket position={[0,2,0]} scale={[1,1,0.2]} />

            {/*</Stage>*/}

           <EffectComposer multisampling={ 0 }>
               <Pixelation granularity={4} />
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