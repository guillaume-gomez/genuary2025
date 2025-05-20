import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

interface LeatherProps {
    scale: [number, number, number];
    position: [number, number, number];
}

function Leather({position, scale} : LeatherProps) {
    const [heightMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      '/black-leather-bl/black-leather_height.png',
      '/black-leather-bl/black-leather_normal-ogl.png',
      '/black-leather-bl/black-leather_roughness.png',
      '/black-leather-bl/black-leather_ao.png',
    ]);

    return (
        <mesh
            castShadow
            receiveShadow
            position={position}
            scale={scale}
        >
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial
                color="#222"
                normalMap={normalMap}
                displacementMap={heightMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}

export default Leather;