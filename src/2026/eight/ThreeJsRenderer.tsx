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
  Environment,
  Outlines,
  Fog,
} from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import FallBackLoader from "../../2025/first/FallBackLoader";
import Striplight from "./Striplight";
import Building from "./Building";


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
          <ambientLight intensity={1.} />
          <color attach="background" args={["#333333"]} />

          <Environment preset="night"/>
          <fog attach="fog" color="black" near={10} far={300} />
          {/*<Striplight position={[10, 2, 0]} scale={[1, 3, 10]} />
          <Striplight position={[-10, 2, 0]} scale={[1, 3, 10]} />*/}

          <group position={[0, -1.5, 0]}>
            <Float position={[0, 2.15, 0]} speed={2} rotationIntensity={2} floatIntensity={2}>
              <mesh castShadow receiveShadow>
                <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />
                <meshStandardMaterial color="white" roughness={0.1} metalness={0.925} />
              </mesh>
            </Float>
            <ContactShadows scale={10} blur={3} opacity={0.25} far={10} />
          </group>

          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <meshStandardMaterial color={[43/255 * 1, 26/255 * 1, 56/255 * 1]} wireframe={false} />
            <boxGeometry args={[20, 0.5, 20, 20, 1, 20]} />
            <Outlines thickness={5} color="hotpink" />
          </mesh>

          <mesh castShadow receiveShadow position={[0, 0.3, 0]} rotation={[Math.PI/2, 0, 0]}>
            <meshStandardMaterial color={[255/255 * 4, 255/255 * 4, 255/255 * 4]} wireframe={true} />
            <planeGeometry args={[20, 20, 20, 20]} />
          </mesh>

          <Building
            position={[5, 5, 5]}
            width={4}
            height={10}
            depth={4}
          />

          {/*<mesh>
            <boxGeometry />
            <meshBasicMaterial  color={[1, 2, 0]} />
            <Outlines thickness={2} color="hotpink" />
          </mesh>*/}

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
          maxDistance={20}
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