import { useRef, useMemo } from 'react';
import { MeshStandardMaterial, Group } from "three";
import { useFrame } from '@react-three/fiber';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { LENGTH } from "./const";

const geometry = new RoundedBoxGeometry(0.9,0.9,1);
const material = new MeshStandardMaterial({color: "blue", emissive: "#000000", roughness: 0.9, metalness: 0.2});


function Shape() {
    const groupRef = useRef<Group>(null);
    const positions = useMemo(() => generate(), []);

    useFrame(({ clock }) => {
      if(!groupRef.current) {
        return;
      }

      groupRef.current.children.forEach(child => {
        const { x, y } = child.position;
        const radiusX = Math.abs(LENGTH/2 - x);
        const radiusY = Math.abs(LENGTH/2 - y);
        const distance = Math.sqrt(radiusX * radiusX + radiusY * radiusY);
        const amplitude = 0.6;
        const sineFrequency = 1
        const sineWaveSpeedDir= 2.0;
        child.position.z =
          amplitude * Math.sin(sineFrequency * (distance - (clock.getElapsedTime() * sineWaveSpeedDir)))

      })
    })

    function generate() {
        let positions = [];
        for(let x=0; x < LENGTH; x++) {
          for(let y=0; y < LENGTH; y++) {
            positions.push([x, y]);
          }
        }
        return positions;
    }

    return (
        <group ref={groupRef}>
        {
          positions.map((props, index) => {
            const [x, y] = props;
            return (
              <mesh
                key={index}
                castShadow
                receiveShadow
                position={[x,y, 0]}
                geometry={geometry}
                material={material}
              >
              </mesh>
            );
          })
        }
        </group>
    );
}

export default Shape;