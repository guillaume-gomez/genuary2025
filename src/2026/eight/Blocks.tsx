import {
  Outlines
} from '@react-three/drei';
import { animated, SpringValue } from '@react-spring/three';


import Building from "./Building";

interface BlockData {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  
}

interface BlocksProps {
  position: [SpringValue<number>, number, SpringValue<number>];
  blocksData: BlockData[];
  scale: SpringValue<number>;
}

function Blocks({ position, blocksData, scale }: BlocksProps) {
	return (
		<animated.group
      position-x={position[0]}
      position-y={position[1]}
      position-z={position[2]}
      scale-x={scale}
      scale-y={scale}
      scale-z={scale}
      key={position.toString()}
    >
      {blocksData.map(({position, width, height, depth}) => 
        (
          <Building
            key={`${position.toString()}_${width}_${height}_${depth}`}
            position={position}
            width={width}
            height={height}
            depth={depth}
          />
        )
      )}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial
          color={[43/255 * 1, 26/255 * 1, 56/255 * 1]}
          wireframe={false}
        />
        <boxGeometry args={[20, 0.5, 20, 20, 1, 20]} />
        <Outlines
          thickness={5}
          color="hotpink"
        />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.3, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial
          color={[255/255 * 4, 255/255 * 4, 255/255 * 4]}
          wireframe={true}
        />
        <planeGeometry args={[20, 20, 20, 20]} />
      </mesh>
		</animated.group>
	)
}

export default Blocks;