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
        emissive="#101010"
        roughness={0.8}
        metalness={0.8}
        ior={1.5}
        reflectivity={0.1}
        irridience={0.3}
        map={texture}
      />
      <boxGeometry args={[width, height, depth]} />
      <Outlines thickness={4} color={[3, 3, 3]} />
    </mesh>
  )
}

export default Building;