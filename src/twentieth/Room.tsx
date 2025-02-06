import { useEffect, useMemo } from 'react';
import { MeshStandardMaterial, BoxGeometry } from "three";
import { easings, useTrail, useSprings } from '@react-spring/web';
import { animated } from '@react-spring/three';

type WallDirection = "N"|"S"|"W"|"E";

interface Hole {
    direction: WallDirection;
    begin: number;
    end: number;
}

interface RoomProps {
    position: [number, number, number];
    width: number;
    height: number;
    depth: number;
    wallHeight?: number;
    holes: Hole[]; // one hole by wall maximum
}

const material = new MeshStandardMaterial({ color: "red", wireframe: false });

function Room ({
    position,
    width,
    height,
    depth,
    wallHeight = 5,
    holes
} : RoomProps) {

    function findHolesByWall(direction: WallDirection) : Hole[] {
        return holes.filter((hole) => hole.direction === direction);
    }

    function sortHoles(direction: WallDirection) {
        let holesByDirection = findHolesByWall(direction);
        holesByDirection.sort((a,b) => a.begin < b.begin);
        return holesByDirection;
    }

    function buildNorth() {
        const sortedHoles = sortHoles("N");
        return buildNorthAndSouth(sortedHoles);
    }

    function buildSouth() {
        const sortedHoles = sortHoles("S");
        return buildNorthAndSouth(sortedHoles);        
    }



    function buildNorthAndSouth(holes: Hole[]) {
        let xBegin = 0;
        let geometriesData = holes.map((hole, index) => {
            const coords = [xBegin, hole.begin]; 
            xBegin = hole.end;
            return coords;
        });

        if(holes[holes.length -1].end != width) {
           geometriesData = [...geometriesData, [holes[holes.length -1].end, width]]
        }

        return geometriesData.map(([start, end], index) => {
            const distanceWidth = end - start;
            return <mesh
                key={`${start}-${end}`}
                position={[start + distanceWidth/2,0,0]}
                material={material}
                >
                <boxGeometry args={[distanceWidth, wallHeight, depth]}/>
                </mesh>
        });

    }

    return (
        <group position={position}>
            {/*floor*/}
            <mesh
                position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]}
            >
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial color={0x400000} />
            </mesh>

            {/* south */}
            <group
                position={[-width/2, wallHeight/2, height/2 - depth/2]}
            >
                { buildNorth() }
            </group>

            {/* north */}
{/*            /*<mesh
                position={[0, wallHeight/2, -(height/2 - depth/2)]}
                material={material}
            >
              <boxGeometry args={[width, wallHeight, depth]}/>
            </mesh>*/}

            <group
                position={[-width/2, wallHeight/2, -(height/2 - depth/2)]}
            >
                { buildSouth() }
            </group>

            <mesh
                position={[width/2 - depth/2, wallHeight/2,0]}
                material={material}
            >
              <boxGeometry args={[depth, wallHeight, height - 2]}/>
            </mesh>

            <mesh
                position={[-(width/2 - depth/2), wallHeight/2,0]}
                material={material}
            >
              <boxGeometry args={[depth, wallHeight, height - 2]}/>
            </mesh>
        </group>
    )

}

export default Room;
/*

[0-3][5-7][9-20]

*/

