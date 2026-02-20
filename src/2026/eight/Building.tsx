import {
  Outlines,
} from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from "three";

const { BASE_URL } = import.meta.env;

interface BuildingProps {
  position?: [number, number, number];
  width: number;
  height: number;
  depth: number;
}


function Building({position = [0, 0, 0], width, height, depth } : BuildingProps ) {
  const [texture] = useLoader(TextureLoader, [
      `${BASE_URL}/window.png`,
    ]);

  return (
    <mesh position={position}>
      <meshPhysicalMaterial
        color={[3, 3, 3]}
        emissive={[0.01, 0.01, 0.01]}
        roughness={0.8}
        metalness={0.8}
        ior={1.5}
        reflectivity={0.1}
        irridience={0.3}
        map={texture}
      />
      <boxGeometry args={[width, height, depth]} />
      <Outlines thickness={4} color={[3, 3, 3]} />
      <mesh position={[0.1/2, height/2 + 0.1/2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[width - 0.1, 0.1, depth]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </mesh>
  )
}

export default Building;