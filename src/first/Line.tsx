import { useEffect } from "react";
import { useSpring, easings, useSpringRef } from '@react-spring/web';
import { animated } from '@react-spring/three';

interface LineProps {
    position: [number, number, number];
    size: [number, number, number];
    color: string;
}

function Line({position, size, color } : LineProps) {
    return (
        <animated.mesh position={position} scale={size}>
            <meshStandardMaterial color={color}  wireframe={false}/>
            <animated.boxGeometry />
        </animated.mesh>
    )
}

export default Line;