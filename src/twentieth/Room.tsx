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
        return holes.find((hole) => hole.direction === direction);
    }

    function computeNorth() {

    }

    function buildTheWall(direction: WallDirection) {
        let holes = findHolesByWall(direction);
        holes.sort((a,b) => a.begin < b.begin);
    }

    function buildNorthAndSouth(holes: Hole[]) {
        let xBegin = 0;
        let geometriesData = holes.map((hole, index) => {
            const coords = [xBegin, hole.begin]; 
            xBegin = hole.end;
            return coords;
        });

        console.log(geometriesData);


        if(holes[holes.length -1].end != width) {
           geometriesData = [...geometriesData, [holes[holes.length -1].end, width]]
        }

        console.log(geometriesData)

        return geometriesData.map(([start, end]) => {
            return <mesh
                position={[start,0,0]}
                material={material}
                >

                </mesh>
        });

    }

    console.log(buildNorthAndSouth([{begin:7, end: 8}, {begin:3, end: 5}]));

    return (
        <group position={position}>
            {/*floor*/}
            <mesh
                position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]}
            >
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial color={0x400000} />
            </mesh>

            <mesh
                position={[0, wallHeight/2, height/2 - depth/2]}
                material={material}
            >
              <boxGeometry args={[width, wallHeight, depth]}/>
            </mesh>

            <mesh
                position={[0, wallHeight/2, -(height/2 - depth/2)]}
                material={material}
            >
              <boxGeometry args={[width, wallHeight, depth]}/>
            </mesh>

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


0 ----- -----           10
0 --- -- -----          10
0 --- --------          10


0-3 3-5 5-10

0 - width   [0 - width]
start - end [3-5]
end - width [5-width]

[0,3,5,10]

[3,5]

begin 0,
end = null

begin 0
end 3->it.begin
begin =  it.end


if(begin != width) {
    it.end
    width
}


*/

