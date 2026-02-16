import { useRef, Suspense } from 'react';
import { useFullscreen } from "rooks";
import { Canvas } from '@react-three/fiber';
import { 
  Float,
  ContactShadows,
  OrbitControls,
  GizmoHelper,
  GizmoViewport, 
  Stats,
  Environment
} from '@react-three/drei';
import FallBackLoader from "../../2025/first/FallBackLoader";


interface ThreeJsRendererProps {
}

function ThreejsRenderer({
} : ThreeJsRendererProps ): React.ReactElement {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const {
    toggleFullscreen,
  } = useFullscreen({ target: canvasContainerRef });

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
          <ambientLight intensity={0.5 * Math.PI} />
          <Environment preset="night"/>
          <Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
          <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />

          <group position={[0, -1.5, 0]}>
          <Float position={[0, 2.15, 0]} speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh castShadow receiveShadow>
              <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />
              <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} />
            </mesh>
          </Float>
          <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
        </group>

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

function Striplight(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

export default ThreejsRenderer;