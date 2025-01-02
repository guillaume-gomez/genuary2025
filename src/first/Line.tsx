import { useEffect } from "react";
import { useSpring, easings, useSpringRef } from '@react-spring/web';
import { animated } from '@react-spring/three';

interface LineProps {
    position: [number, number, number];
    size: [number, number, number];
}

function Line({position, size} : LineProps) {
    return (
        <animated.mesh position={position} scale={size}>
            <meshStandardMaterial color={0x0000FF}  wireframe={false}/>
            <animated.boxGeometry />
        </animated.mesh>
    )
}

export default Line;