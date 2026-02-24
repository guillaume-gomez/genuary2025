import { useEffect, useRef } from 'react';
import p5 from "p5";

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

export default function P5Sketch() {
  const renderRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  
  useEffect(() => {
    if(rendered.current) {
        return;
    }

    const width = 500 //document.body.offsetWidth - 15;
    const height = 500 //document.body.offsetHeight - 15;
    const cellSize = 20;
    const durationGrow = 1000;

    const shapes = [];

    function drawCell(p: any, x: number, y: number, size: number, operator: string) {
      p.fill(200, 100, 0);
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

          for(let x = 0; x < width; x+= cellSize) {
            for(let y = 0; y < height; y+= cellSize) {
              shapes.push({
                x,
                y,
                operator: operators[ Math.floor(Math.random() * operators.length) ]
              })
            }
          }

        }

        p.draw = () => {
          p.frameRate(30);
          p.background(50, 50, 50);
          //p.noLoop();

          p.strokeWeight(2);
          const time = p.millis() / durationGrow;
          const size = p.lerp(0, cellSize, Math.sin(time));

          shapes.forEach( ({x, y, operator}) => {
            drawCell(
              p,
              x,
              y,
              cellSize,
              operator
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
