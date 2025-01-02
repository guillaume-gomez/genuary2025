import { useEffect } from "react";
import { useSpring, easings, useSpringRef } from '@react-spring/web';
import { animated } from '@react-spring/three';
import { RoundedBox } from '@react-three/drei';

interface LineProps {
    position: [number, number, number];
    size: [number, number, number];
    color: string;
}

function Line({position, size, color } : LineProps) {
    return (
        <animated.mesh position={position} scale={size}>
            <meshStandardMaterial color={color} emissive={0x0000FF} roughness={0.2} metalness={0.5} flatshading={true} />
            <animated.boxGeometry />
        </animated.mesh>
    )
}

export default Line;