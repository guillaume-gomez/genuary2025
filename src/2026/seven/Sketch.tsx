import { useEffect, useRef } from 'react';
import { compact, uniq, sample } from "lodash";
import p5 from "p5";

interface Shape {
  x: number;
  y: number;
  visited: boolean;
  operator: string;
  color: string;
}


const colors = [
  "#084C61",
  "#DB504A",
  "#E3B505",
  "#4F6D7A",
  "#56A3A6",

  "#8D6A9F",
  "#C5CBD3",
  "#8CBCB9",
  "#DDA448",
  "#BB342F"
];

const operators = [
  ".",
  "|",
  "-",

  // "A",
  // "B",
  // "C"
];

function fromColorToHex(color: string): number {
  return parseInt(
    color.replace('#', '0x'),
    16
  );
}

function fromHexNumberToString(color: number): string {
  return "#" + color.toString(16);
}


function andOperation(a: number, b: number): number {
  return a & b;
}

function orOperation(a: number, b: number): number {
  return a | b;
}

function xorOperation(a: number, b: number): number {
  return a ^ b;
}

function fromXYToIndex(x: number, y: number, widthGrid: number): number {
  return x + (y * widthGrid);
}

function left(x: number, y: number): [number, number] | null {
  if(x - 1 < 0) {
    return null;
  }

  return [x - 1, y];
}

function right(x: number, y: number,  widthGrid: number): [number, number] | null {
  if( (x+1) >= widthGrid) {
    return null;
  }

  return [x + 1, y];
}

function up(x: number, y: number): [number, number] | null {
  if(y - 1 < 0) {
    return null;
  }

  return [x, y - 1];
}

function down(x: number, y: number, heightGrid: number): [number, number] | null {
  if( (y+1) >= heightGrid) {
    return null;
  }
  return [x, y + 1];
}

function neighboursIndexes(x: number, y: number, widthGrid: number, heightGrid: number): number[] {
  const candidates = compact([left(x, y), right(x,y, widthGrid), up(x,y), down(x, y, heightGrid) ]);
  return candidates.map(([x, y]) => fromXYToIndex(x, y, widthGrid));
}

function computeOperation(operator: string, shapeAColor: number, shapeBColor: number): string {
  switch(operator) {
    case ".": {
      return andOperation(
        shapeAColor,
        shapeBColor
      );
    }
    case "|": {
      return orOperation(
        shapeAColor,
        shapeBColor
      );
    }
    case "-":
    default: {
      return xorOperation(
        shapeAColor,
        shapeBColor
      );
    }
  }
}

function computeColor(shape: Shape, neighbours: Shape[]): string {
  const neighbourValue = neighbours.reduce((acc, currentValue) => computeOperation(currentValue.operator, fromColorToHex(currentValue.color), acc) , 0xFFFFFF)
  const finalColorHex = computeOperation(shape.operator, fromColorToHex(shape.color), neighbourValue);
  return fromHexNumberToString(finalColorHex);

  const randomNeighbour = sample(neighbours);
  return fromHexNumberToString(computeOperation(shape.operator, fromColorToHex(shape.color), fromColorToHex(randomNeighbour.color)))
}

function visit(visitedIndexes: number[], shapes: Shape[], widthGrid: number, heightGrid: number): number[] {
  let newVisitedIndexes = [];
  visitedIndexes.forEach(visitIndex => {
    const shape = shapes[visitIndex];
    
    const neighboursIndexes_ = neighboursIndexes(shape.x, shape.y, widthGrid, heightGrid);
    const neighbours = neighboursIndexes_.map(index => shapes[index]);

    shapes[visitIndex] = { 
      ...shape,
      visited: true,
      color: computeColor(shape, neighbours)
    };

    const neighboursIndexedNoVisited = neighboursIndexes_.filter(index => !shapes[index]?.visited);
    newVisitedIndexes.push(...neighboursIndexedNoVisited);
  });
  return uniq(newVisitedIndexes);
}

export default function P5Sketch() {
  const renderRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if(rendered.current) {
        return;
    }

    const width = 600 //document.body.offsetWidth - 15;
    const height = 600 //document.body.offsetHeight - 15;
    const cellSize = 20;

    const widthGrid = width / cellSize;
    const heightGrid = height / cellSize;
    const durationGrow = 1000;

    let shapes : Shape[] = [];
    let visitedIndexes : number[] = [];

    function drawCell(p: any, shape: Shape, size: number) {
      p.fill(shape.color);
      p.square(shape.x * size, shape.y * size, size, 5);
      
      if(!shape.visited) {
        p.textSize(22);
        p.fill(0, 0, 0);
        p.text(shape.operator, (shape.x * cellSize) + 11, (shape.y * cellSize) + 11);
      }
    }

    const p5Instance = new p5((p: any) => {
        // flag to avoid to many instances of p5
        rendered.current = true;

        p.setup = () => {
          p.createCanvas(width, height).parent(renderRef.current);

          p.textAlign(p.CENTER, p.CENTER);

          for(let y = 0; y < heightGrid; y++) {
            for(let x = 0; x < widthGrid; x++) {
              shapes.push({
                x,
                y,
                operator: operators[ Math.floor(Math.random() * operators.length) ],
                color: colors[ Math.floor(Math.random() * colors.length)],
                visited: false,
              })
            }
          }
          visitedIndexes = [ fromXYToIndex(widthGrid/2, heightGrid/2, widthGrid) ];

        }

        p.draw = () => {
          p.frameRate(10);
          p.background(50, 50, 50);
          if(visitedIndexes.length === 0) {
            // restart the animation
            // for(let index = 0; index < shapes.length; index++) {
            //   shapes[index] = { ...shapes[index], visited: false }; 
            // }
            // visitedIndexes = [ fromXYToIndex(widthGrid/2, heightGrid/2, widthGrid) ];

            p.noLoop();
          }
          

          p.strokeWeight(2);
          const time = p.millis() / durationGrow;
          const size = p.lerp(0, cellSize, Math.sin(time));

          shapes.forEach(shape => {
            drawCell(
              p,
              shape,
              cellSize,
            );
          });

          if((p.millis()/ 2000) % 1) {
            visitedIndexes = visit(visitedIndexes, shapes, widthGrid, heightGrid);
          }

        }
    });
    return () => {
      p5Instance.remove();
      rendered.current = false;
    };
  }, []);

  return(
    <div ref={renderRef}></div>
  )
}
