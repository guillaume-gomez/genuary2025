import { useRef, Suspense } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { CameraControls, GizmoHelper, GizmoViewport, Stats, Grid } from '@react-three/drei';
import FallBackLoader from "../first/FallBackLoader";
//import { useControls } from 'leva';
import Room from "./Room";


interface ThreeJsRendererProps {
}

const grid = [
  [-20,-20], [-10,-20], [0,-20], [10,-20], [20,-20],
  [-20,-10], [-10,-10], [0,-10], [10,-10], [20,-10],
  [-20,0], [-10,0], [0,0], [10,0], [20,0],
  [-20,10], [-10,10], [0,10], [10,10], [20,10],
  [-20,20], [-10,20], [0,20], [10,20], [20,20],
]

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
    //isFullscreenEnabled
  } = useFullscreen({ target: canvasContainerRef });
 
  const cameraControllerRef = useRef<CameraControls|null>(null);

  const width = 10;
  const depth = 10;
  const height = 4;

  return (
    <div ref={canvasContainerRef} className="w-full h-screen">
      <Canvas
        camera={{ position: [0,2, 15], fov: 75, far: 100 }}
        dpr={window.devicePixelRatio}
        shadows
        onDoubleClick={() => {
          toggleFullscreen();
        }}
      >
        <color attach="background" args={["#FFF"]} />
        <Suspense fallback={<FallBackLoader/>}>
          <ambientLight intensity={0.5} />
          {/*<Stage preset="rembrandt" intensity={0.1} environment={null}>*/}
           {/* <group rotation={[Math.PI/2, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                position={[0,0,0]}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}
              >
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color="#FF00F0" />
                  <Edges linewidth={20} threshold={15} color={hovered ? "#c02040" : "black"} />
                  <Outlines thickness={0.01} color={hovered ? "#c02040" : "black"} />
              </mesh>
            </group>*/} 
            {/* house */}
            {grid.map(([x, z]) => 
              <Room
              holes={[
                {direction: "N", begin:3, end: 5},
                {direction: "N", begin:7, end: 9},
                {direction: "S", begin:5, end: 10},
                {direction: "E", begin:3, end: 4},
                {direction: "E", begin:1, end: 2},
                {direction: "W", begin:4, end: 6},
              ]}
              position={[x, 0, z]}
              width={width}
              depth={depth}
              height={height}
            />)
          }

            <Grid args={[50, 50]} position={[0,0,0]} cellColor='blue' />
          {/*</Stage>*/}
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
          /*minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/1.4}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}*/
          minDistance={5}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}

export default ThreejsRenderer;