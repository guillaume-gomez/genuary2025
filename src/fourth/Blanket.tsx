import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

interface BlanketProps {
    scale: [number, number, number];
    position: [number, number, number];
}


function Blanket({position, scale} : BlanketProps) {
    const [heightMap, normalMap, aoMap] = useLoader(TextureLoader, [
      '/soft-blanket-unity/soft-blanket_height.png',
      '/soft-blanket-unity/soft-blanket_normal-ogl.png',
      '/soft-blanket-unity/soft-blanket_ao.png',
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
                color="#111"
                normalMap={normalMap}
                displacementMap={heightMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}

export default Blanket;