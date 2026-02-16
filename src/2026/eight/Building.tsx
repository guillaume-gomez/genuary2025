import {
  Outlines,
} from '@react-three/drei';

interface BuildingProps {
  position?: [number, number, number];
  width: number;
  height: number;
  depth: number;
}

function Building({position = [0, 0, 0], width, height, depth } : BuildingProps ) {
  return (
    <mesh position={position}>
      <meshStandardMaterial color="purple"/>
      <boxGeometry args={[width, height, depth]} />
      <Outlines thickness={4} color={[255/255 * 3, 0, 0]} />
    </mesh>
  )
}

export default Building;