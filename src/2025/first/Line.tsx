import { animated } from '@react-spring/three';

interface LineProps {
    position: [x: number, y: number, z: number];
    size: [x:number, y:number, z:number];
    color: string;
}

function Line({position, size, color } : LineProps) {
    return (
        <animated.mesh position={position} scale={size}>
            <meshStandardMaterial color={color} emissive={0x0000FF} roughness={0.2} metalness={0.5} flatShading={true} />
            <animated.boxGeometry />
        </animated.mesh>
    )
}

export default Line;