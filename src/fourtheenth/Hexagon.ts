https://www.redblobgames.com/grids/hexagons/#coordinates-cube

interface Hexagon {
	x: number; // q
	y: number; // s
	z: number; // r
}


function hexAdd(a: Hexagon, b: Hexagon ): Hexagon {
    //return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
	return {
		x: (a.x + b.x),
		y: (a.y + b.y),
		z: (a.z + b.z)	
	};
}

function hexSubtract(a: Hexagon, b: Hexagon) : Hexagon {
    //return Hex(a.q - b.q, a.r - b.r, a.s - b.s);
    return {
		x: (a.x - b.x),
		y: (a.y - b.y),
		z: (a.z - b.z)	
	};
}

function hexMultiply(a: Hexagon, k: number) : Hexagon {
    //return Hex(a.q * k, a.r * k, a.s * k);
    return {
		x: (a.x * k),
		y: (a.y * k),
		z: (a.z * k)	
	};
}

function hexLength(hexagon: Hexagon): number {
    //return int((abs(hexagon.q) + abs(hexagon.r) + abs(hexagon.s)) / 2);
	return (Math.abs(hexagon.x) + Math.abs(hexagon.z) + Math.abs(hexagon.y)) / 2;
}

function hexDistance(a: Hexagon, b: Hexagon) :number {
    //return hex_length(hex_subtract(a, b));
	return hexLength(hexSubtract(a, b));
}

const hexagonDirections : Hexagon[] = [
	{x:1, y: 0, z: -1},
	{x:1, y: -1, z: 0},
	{x:0, y: -1, z: 1},
	{x:-1, y: 0, z: 1},
	{x:-1, y: 1, z: 0},
	{x:0, y: 1, z: -1}
];

function hexDirection(direction: number /* 0 to 5 */) : Hexagon {
    return hexagonDirections[(6 + (direction % 6)) % 6]
}

function hexNeighbor(hexagon: Hexagon, direction: number): Hexagon {
    return hexAdd(hexagon, hexDirection(direction));
}

export function cubeRing(center: Hexagon, radius: number): Hexagon[] {
    let results : Hexagon[] = [];
    let hex : Hexagon = hexAdd(
    			center,
                hexMultiply(hexDirection(4), radius)
            );
    for (let i=0; i < 6; i++) {
        for(let j = 0; j < radius; j++) {
        	results.push(hex);
            hex = hexNeighbor(hex, i);
        }
    }
            
    return results;
}

export function hexToPixel(hexagon: Hexagon, size: number) : [number, number] {
    const x = size * (     3./2 * hexagon.x                   );
    const y = size * (Math.sqrt(3)/2 * hexagon.x  +  Math.sqrt(3) * hexagon.z);
    return [x, y];
}
/*
function(depth) {
	let  results = []
for each -N ≤ q ≤ +N:
    for each max(-N, -q-N) ≤ r ≤ min(+N, -q+N):
        var s = -q-r
        results.append(cube_add(center, Cube(q, r, s)))
}*/