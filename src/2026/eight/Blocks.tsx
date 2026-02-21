import {
  Outlines,
} from '@react-three/drei';
import { ForwardRef } from "react";
import { Group } from "three";
import { animated } from '@react-spring/three'

import Building from "./Building";

interface BlockData {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  
}

interface BlocksProps {
  position: [number, number, number];
  blocksData: BlockData[];
  visible: number;
  //ref: ForwardRef<Group>
}

function Blocks({ position, blocksData, visible = false }: BlocksProps) {
	return (
		<animated.group
      position-x={position[0]}
      position-y={position[1]}
      position-z={position[2]}
      visible={visible}
    >
      {blocksData.map(({position, width, height, depth}) => 
        (
          <Building
            position={position}
            width={width}
            height={height}
            depth={depth}
          />
        )
      )}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial color={[43/255 * 1, 26/255 * 1, 56/255 * 1]} wireframe={false} />
        <boxGeometry args={[20, 0.5, 20, 20, 1, 20]} />
        <Outlines thickness={5} color="hotpink" />
      </mesh>

      <mesh castShadow receiveShadow position={[0, 0.3, 0]} rotation={[Math.PI/2, 0, 0]}>
        <meshStandardMaterial color={[255/255 * 4, 255/255 * 4, 255/255 * 4]} wireframe={true} />
        <planeGeometry args={[20, 20, 20, 20]} />
      </mesh>
		</animated.group>
	)
}

export default Blocks;