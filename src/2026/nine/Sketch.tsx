import { useEffect, useRef } from 'react';
import { compact, uniq, sample } from "lodash";
import p5 from "p5";

interface Shape {
  x: number;
  y: number;
  visited: boolean;
  operator: string;
  color: string;
  textColor: string;
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

export default function P5Sketch() {
  const renderRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if(rendered.current) {
        return;
    }

    const width = 800 //document.body.offsetWidth - 15;
    const height = 800 //document.body.offsetHeight - 15;
    const cellSize = 50;

    const widthGrid = width / cellSize;
    const heightGrid = height / cellSize;

    let shapes : Shape[] = [];

    function drawCell(p: any, shape: Shape, size: number) {
      p.fill(shape.color);
      p.square(shape.x * size, shape.y * size, size, 4);

      p.textSize(30);
      p.fill(shape.textColor);
      p.text(shape.operator, (shape.x * cellSize) + 25, (shape.y * cellSize) + 25);
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
                textColor: colors[ Math.floor(Math.random() * colors.length)],
                visited: false,
              })
            }
          }
        }

        p.draw = () => {
          p.frameRate(50);
          p.background(50, 50, 50);
          p.strokeWeight(2);

          const time = (p.millis() / 1500);
          const scale = p.map(p.sin(time), -Math.PI, Math.PI, 0.1, 1.5);

          shapes.forEach(shape => {
            drawCell(
              p,
              shape,
              cellSize * scale,
            );
          });

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
