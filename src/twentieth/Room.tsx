import { useEffect, useMemo } from 'react';
//import { BoxGeometry } from "three";
import { easings, useTrail, useSprings } from '@react-spring/web';
import { animated } from '@react-spring/three';

interface RoomProps {
    position: [number, number, number];
    width: number;
    height: number;
    depth: number;
}

function Room ({position, width, height, depth} : RoomProps) {
    return (
        <group position={position}>
            {/*floor*/}
            <mesh position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]} >
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial color={0x400000} />
            </mesh>

            <mesh position={[0, 0, 0]}>
              <meshStandardMaterial color={0x40FF00} />
              <boxGeometry args={[width, height, depth]}/>
            </mesh>
        </group>
    )

}

export default Room;