import { useRef } from "react";
import { useLoader, useFrame } from '@react-three/fiber';
import { RepeatWrapping, NearestFilter, DoubleSide, Group, TextureLoader, Mesh, Object3D, MeshBasicMaterial } from "three";

interface SeatProps {
    position: [number, number, number];
}
/*
const [heightMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      '/black-leather-bl/black-leather_height.png',
      '/black-leather-bl/black-leather_normal-ogl.png',
      '/black-leather-bl/black-leather_roughness.png',
      '/black-leather-bl/black-leather_ao.png',
    ]);*/

function Seat({position} : SeatProps) {

    const groupRef = useRef<Group>(null);
    const [alphaMap, map] = useLoader(TextureLoader, [
        '/ninth.png',
        //'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGUlEQVQoU2NkYGD4z4AHMP7//x+/gmFhAgCXphP14bko/wAAAABJRU5ErkJggg==',
        '/seat-map.png'
    ]);
    alphaMap.magFilter = NearestFilter;
    alphaMap.wrapT = RepeatWrapping;
    alphaMap.offset.y = 0;
    alphaMap.repeat.y = 1;

    useFrame(({ clock }) => {
        if(!groupRef.current) {
            return;
        }
        groupRef.current.children.map((child: Object3D) => {
            const { material } = child as Mesh;
            (material as MeshBasicMaterial)!.alphaMap!.offset!.y = clock.getElapsedTime() * 0.15;
        })
    })


    return (
        <group ref={groupRef} position={position}>
            <mesh
                castShadow
                receiveShadow
                position={[0,0,0]}
            >
            <boxGeometry args={[1,1.5,0.1]} />
            <meshStandardMaterial
                color={"transparent"}
                emissive={"#000000"}
                alphaTest={0.5}
                metalness={0.758}
                roughness={0.351}
                map={map}
                alphaMap={alphaMap}
                side={DoubleSide}
                opacity={1.0}
            />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                position={[0,-0.25,0.57]}
            >
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial
                color={"transparent"}
                emissive={"#000000"}
                alphaTest={0.5}
                metalness={0.758}
                roughness={0.351}
                map={map}
                alphaMap={alphaMap}
                side={DoubleSide}
                opacity={1.0}
            />
            </mesh>
        </group>

    )
}

export default Seat;