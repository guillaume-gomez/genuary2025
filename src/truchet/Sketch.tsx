import { useEffect, useRef } from 'react';
import p5 from "p5";

//https://www.mathkang.org/cite/expo20001.html

interface Shape {
    x: number;
    y: number;
    color: string;
    angle: number;
}

function easeInOutElastic(x: number): number {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
  : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }
        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            const colors = [
                "#f4a0b6",
                "#c60b27",
                "#0baee8",
                "#04aa34",
                "#ebcf06",
                "#f0a500",
                "#e23721",
                "#0069b3"
            ];
            let shapes : Shape[] = [];
            const iteration = 10;
            let cell = null;
            let cells = [];
            let cellIndex = 0;
            let lock = false;
            
            function renderShape(size: number, color: string) {
                let graphic = p.createGraphics(size, size);
                graphic.background(224);
                graphic.noFill();
                graphic.stroke(color);
                graphic.strokeWeight(size * 0.1);
                graphic.circle(0, 0, size);
                graphic.circle(size, size, size);
                return graphic;
            }

            
        
            p.setup = () => {
              const width = 640;
              const height = width;

              p.createCanvas(width, height).parent(renderRef.current);
              p.imageMode(p.CENTER);


              const widthIteration = p.width/iteration;
              const heightIteration = p.height/iteration;
              
              const colorIndex = p.floor(p.random(0, colors.length));
              const color = colors[colorIndex];
              cell = renderShape(p.floor(width / iteration), color);
              cells = colors.map(color => renderShape(p.floor(width / iteration), color));

                p.background(224);
                

                // debug
                //const size=p.floor(width / iteration);
                //p.image(cell, size, size * 2);

                      
                for (let x = 0; x < iteration; x++) {
                    for (let y = 0; y < iteration; y++) {
                     // p.push();
                      const xx = (x + 0.5) * p.width / iteration;
                      const yy = (y + 0.5) * p.height / iteration
                //    p.translate(xx, yy);
                      let angle = 0;
                      if (p.random(1.0) < 0.5) {
                        p.rotate(-p.PI/2);
                        angle = - p.PI/2;
                      }
                //     p.image(cell, 0, 0);
                      shapes.push({x: xx, y: yy, color, angle, size: p.floor(width / iteration) });
                //      p.pop();
                    }
                }

                console.log(shapes)

            }

            p.draw = () => {
                p.frameRate(30);

                let s = p.millis() / 1000;
                p.background(224);
                

                shapes.map(shape => {
                    const { x, y, color, angle } = shape;
                    const sinValue = p.sin(s);
                    /*if(p.floor(s) % 3 === 0) {
                        cellIndex = (cellIndex + 1) % colors.length;
                    }*/
                    p.push();
                    p.translate(x,y);
                    p.rotate(easeInOutElastic(p.sin(s)) * p.PI/2 + angle);
                    p.image(cells[cellIndex], 0, 0);
                    p.pop(); 
                }) 

            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
