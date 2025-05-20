import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

interface MetalProps {
    scale: [number, number, number];
    position: [number, number, number];
}



function Metal({position, scale} : MetalProps) {
    const [heightMap, normalMap, aoMap] = useLoader(TextureLoader, [
      '/warped-sheet-metal-unity/warped-sheet-metal_height.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_normal-ogl.png',
      '/warped-sheet-metal-unity/warped-sheet-metal_ao.png',
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
                color="#444"
                normalMap={normalMap}
                displacementMap={heightMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}

export default Metal;