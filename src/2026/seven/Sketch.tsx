import { useEffect, useRef } from 'react';
import { compact, uniq } from "lodash";
import p5 from "p5";

interface Shape {
  x: number;
  y: number;
  visited: boolean;
  operator: string;
  color: string;
}

const colors = [
  "#392759",
  "#6874E8",
  "#E8F0FF",
  "#F7ACCF",
  "#7A5C61"
];

const operators = [
  ".",
  "|",
  "-",

  // "A",
  // "B",
  // "C"
];

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

function neighbours(x: number, y: number, widthGrid: number, heightGrid: number): number[] {
  const candidates = compact([left(x, y), right(x,y, widthGrid), up(x,y), down(x, y, heightGrid) ]);
  return candidates.map(([x, y]) => fromXYToIndex(x, y, widthGrid));
}

function computeOperation(shape: Shape, neighbour: Shape): string {
  return ".";
}

function computeColor(shapes: Shape[], shape: Shape, neighboursIndexed: number[]): string {
  return "#00FFAA";
}


function visit(visitedIndexes: number[], shapes: Shape[], widthGrid: number, heightGrid: number): number[] {
  let newVisitedIndexes = [];
  visitedIndexes.forEach(visitIndex => {
    const shape = shapes[visitIndex];
    const neighboursIndexed = neighbours(shape.x, shape.y, widthGrid, heightGrid);
    shapes[visitIndex] = { ...shape, visited: true, color: "#FF0055" };


    const neighboursIndexedNoVisited = neighboursIndexed.filter(index => !shapes[index]?.visited);
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
    const cellSize = 50;

    const widthGrid = width / cellSize;
    const heightGrid = height / cellSize;
    const durationGrow = 1000;

    let shapes : Shape[] = [];
    let visitedIndexes : number[] = [];

    function drawCell(p: any, x: number, y: number, size: number, operator: string, color: string) {
      p.fill(color);
      p.square(x, y, size, 5);
      p.textSize(22);
      p.fill(0, 0, 0);
      p.text(operator, x + 11, y + 11);
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
                color: "#F900DD",
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
            p.noLoop();
          }
          //p.noLoop();

          p.strokeWeight(2);
          const time = p.millis() / durationGrow;
          const size = p.lerp(0, cellSize, Math.sin(time));

          shapes.forEach( ({x, y, operator, color}) => {
            drawCell(
              p,
              x * cellSize,
              y * cellSize,
              cellSize,
              operator,
              color
            );
          });

          if((p.millis()/ 2000) % 1) {
            visitedIndexes = visit(visitedIndexes, shapes, widthGrid, heightGrid);
            console.log(visitedIndexes.map(index => shapes[index]))
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
