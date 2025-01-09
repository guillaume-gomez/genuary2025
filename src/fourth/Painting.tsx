import { useEffect, useMemo } from 'react';
import { BoxGeometry } from "three";
import useBlackMaterials from "./useBlackMaterials";
import { easings, useTrail, useSprings } from '@react-spring/web';
import { animated } from '@react-spring/three';


function getRandomNumber(min: number, max: number) : number  {
  return Math.random() * (max - min) + min
}

const geometry = new BoxGeometry(1,1,1);

interface PaintingProps {
    onAnimationFinish: () => void;
}

function Painting ({onAnimationFinish} : PaintingProps) {
    const materials = useBlackMaterials();

    const framePosition = -20;
    const items = useMemo(() => generate(), [materials]);

    const [springs, api] = useSprings(
    items.length,
    (index: number) => {
      return {
          from: { x: 0, y: 0, z: 20, scaleX: 0, scaleY: 0, scaleZ: 0, done: 0 },
          to:  items[index],
          delay: index * 100,
          config: {
            precision: 0.0001,
            duration: 500,
            easing: easings.easeOutQuart
          },
          onRest:(result, spring) => {
            const numberOfAnimationFinished = springs.filter(({done}) => done.get() === 1).length;
            if(numberOfAnimationFinished === items.length) {
                onAnimationFinish();

            }
          }
        }
      },
    []
    );

    useEffect(() => {
    api.start();
    },[api]);

    function generate() {
        if(materials.length <= 0) {
          return [];
        }

        const types = ['leather', 'blanket', 'metal', 'other'];
        let attributes = []

        for(let index = 0; index < 50; index++) {
          const scaleZ = Math.random() * 2;
          attributes.push({
            x: getRandomNumber(0,20),
            y: getRandomNumber(0,20),
            z: framePosition + scaleZ,
            scaleX: getRandomNumber(1, 5),
            scaleY: getRandomNumber(1, 5),
            scaleZ,
            material: materials[Math.floor(types.length * Math.random())],
            done: 1
          })
        }
        return attributes;
    }

    return (
        <group position={[-10, -10, 0]}>
            {springs.map((props, index) => {
              return (
                <animated.mesh
                  castShadow
                  receiveShadow
                  key={index}
                  position-x={props.x}
                  position-y={props.y}
                  position-z={props.z}
                  scale-x={props.scaleX}
                  scale-y={props.scaleY}
                  scale-z={props.scaleZ}
                  geometry={geometry}
                  material={items[index].material}
                >
                </animated.mesh>
                )
            })
          }
          </group>
    )

}

export default Painting;