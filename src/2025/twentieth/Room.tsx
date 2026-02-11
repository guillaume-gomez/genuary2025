import { MeshStandardMaterial } from "three";

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
    thicknessWall?: number;
    holes: Hole[];
    hideWall?: WallDirection[];

}

const material = new MeshStandardMaterial({ color: "red", wireframe: false });

function Room ({
    position,
    width,
    height,
    depth,
    thicknessWall = 1,
    holes,
    hideWall = []
} : RoomProps) {

    function findHolesByWall(direction: WallDirection) : Hole[] {
        return holes.filter((hole) => hole.direction === direction);
    }

    function sortHoles(direction: WallDirection) {
        let holesByDirection = findHolesByWall(direction);
        holesByDirection.sort((a,b) => a.begin - b.begin);
        return holesByDirection;
    }


    function buildNorth() {
        const sortedHoles = sortHoles("N");
        if(sortedHoles.length === 0) {
            return buildNorthAndSouth([{begin: width, end: -1, direction: "N"}])
        }
        return buildNorthAndSouth(sortedHoles);
    }

    function buildSouth() {
        const sortedHoles = sortHoles("S");
        if(sortedHoles.length === 0) {
            return buildNorthAndSouth([{begin: width, end: -1, direction: "S"}])
        }
        return buildNorthAndSouth(sortedHoles);        
    }


    function buildEast() {
        const sortedHoles = sortHoles("E");
        if(sortedHoles.length === 0) {
            return buildEstAndWestAndSouth([{begin: depth, end: -1, direction: "E"}])
        }
        return buildEstAndWestAndSouth(sortedHoles);        
    }

    function buildWest() {
        const sortedHoles = sortHoles("W");
        if(sortedHoles.length === 0) {
            return buildEstAndWestAndSouth([{begin: depth, end: -1, direction: "W"}])
        }
        return buildEstAndWestAndSouth(sortedHoles);        
    }


    function buildNorthAndSouth(holes: Hole[]) {
        let xBegin = 0;
        let geometriesData = holes.map((hole) => {
            const coords = [xBegin, hole.begin]; 
            xBegin = hole.end;
            return coords;
        });

        if(holes[holes.length -1].end != width) {
           geometriesData = [...geometriesData, [holes[holes.length -1].end, width]]
        }

        return geometriesData.map(([start, end]) => {
            const distanceWidth = end - start;
            return <mesh
                key={`${start}-${end}`}
                position={[start + distanceWidth/2,0,0]}
                material={material}
                >
               {/* //<meshStandardMaterial color={Math.random() * 0xFFFFFF} />*/}
                <boxGeometry args={[distanceWidth, height, thicknessWall]}/>
                </mesh>
        });

    }


    function buildEstAndWestAndSouth(holes: Hole[]) {
        let xBegin = 0;
        let geometriesData = holes.map((hole) => {
            const coords = [xBegin, hole.begin]; 
            xBegin = hole.end;
            return coords;
        });

        if(holes[holes.length -1].end != depth) {
           geometriesData = [...geometriesData, [holes[holes.length -1].end, depth]]
        }

        return geometriesData.map(([start, end]) => {
            const distanceDepth = (end - start);
            return <mesh
                key={`${start}-${end}`}
                position={[0,0,start + distanceDepth/2 ]}
                material={material}
                >
                {/*<meshStandardMaterial color={Math.random() * 0xFFFFFF} />*/}
                <boxGeometry args={[thicknessWall, height, distanceDepth]}/>
                </mesh>
        });
    }

    const scaleWall = (depth - 2*thicknessWall) / depth;

    return (
        <group position={position}>
            {/*floor*/}
            <mesh
                position={[0,0,0]} rotation={[-Math.PI/2, 0, 0]}
            >
              <planeGeometry args={[width, depth]} />
              <meshStandardMaterial color={0x400000} />
            </mesh>

            {/* North */}
            {
                !hideWall.includes("N") &&
                <group
                    position={[-width/2, height/2, depth/2 - thicknessWall/2]}
                >
                    { buildNorth() }
                </group>
            }
            {/* South */}
            {
                !hideWall.includes("S") &&
                <group
                position={[-width/2, height/2, -(depth/2 - thicknessWall/2)]}
                >
                    { buildSouth() }
                </group>
            }
            {/* East */}
            {
               !hideWall.includes("E") &&
                <group
                    position={[-(width/2 - thicknessWall/2), height/2, -depth/2  + thicknessWall]}
                    scale={[1,1, scaleWall]}
                >
                    { buildEast() }
                </group>
            }
            {/* West */}
            {
                !hideWall.includes("W") &&
                <group
                    position={[width/2 - thicknessWall/2, height/2, -depth/2 + thicknessWall]}
                    scale={[1,1, scaleWall]}
                >
                    { buildWest() }
                </group>
            }


        </group>
    )

}

export default Room;