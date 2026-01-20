import { useEffect, useRef } from 'react';
import p5 from "p5";

//https://www.mathkang.org/cite/expo20001.html

interface Shape {
    x: number;
    y: number;
    color: string;
    angle: number;
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
            
            function renderShape(xCenter: number, yCenter: number, color: string, piMoving: number, rotate: number) {
                const perimeterCircle = 350;
                const diameterCircle = perimeterCircle/p.PI;
                const diameterLine = perimeterCircle/piMoving;
                const radius = diameterLine / 2;

                p.push();

                p.fill(color);       
                p.translate(xCenter,yCenter);
                p.rotate(rotate);
                p.strokeWeight(4);
                p.circle(0,0, diameterCircle);
                p.strokeWeight(6);
                p.line(-radius, 0, radius, 0);

                p.pop();
            }
        
            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 1000).parent(renderRef.current);
              const index = Math.floor(Math.random() * colors.length);
              p.fill(colors[index]);
              // remove the color selected for the shapes
              let colorsShape = colors.slice();
              colorsShape.splice(index,1)

              const iteration = 8;
              const widthIteration = p.width/iteration;
              const heightIteration = p.height/iteration;
              for(let x=0; x < iteration; x++) {
                const color = colorsShape[ Math.floor(Math.random() * colorsShape.length) ];
                for(let y=0; y < iteration; y++) {
                    shapes.push({
                        x: (x * widthIteration) + widthIteration/2 ,
                        y: (y * heightIteration) + heightIteration/2,
                        color,
                        angle: Math.random() * Math.PI/1.2
                    });
                }
              }

              p.background(30);
            }

            p.draw = () => {
                p.frameRate(30);

                let s = p.millis() / 1000;
                const piMoving = p.map(p.sin(s), -1, 1, p.PI, 4); 
                
                shapes.forEach(({x, y, color, angle}) => {
                    renderShape(x, y, color, piMoving, angle * p.sin(2*piMoving) );
                });
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
