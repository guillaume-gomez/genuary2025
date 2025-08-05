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
            
            function renderShape(size: number) {
                let graphic = p.createGraphics(size, size);
                graphic.background(224);
                graphic.noFill();
                graphic.stroke(96);
                graphic.strokeWeight(size * 0.1);
                graphic.circle(0, 0, size);
                graphic.circle(size, size, size);
                return graphic;
            }
        
            p.setup = () => {
              const width = 640;
              const height = width;
              const iteration = 10;

              p.createCanvas(width, height).parent(renderRef.current);
              p.imageMode(p.CENTER);


              const widthIteration = p.width/iteration;
              const heightIteration = p.height/iteration;
              
              const cell = renderShape(p.floor(width / iteration));

                p.background(224);
                
                // debug
                //p.image(cell, 40, 40);
                      

                for (let x = 0; x < iteration; x++) {
                    for (let y = 0; y < iteration; y++) {
                      p.push();
                      p.translate((x + 0.5) * p.width / iteration, (y + 0.5) * p.height / iteration);
                      if (p.random(1.0) < 0.5) {
                        p.rotate(-p.PI/2);
                      }
                      p.image(cell, 0, 0);
                      p.pop();
                    }
                }


            }

            p.draw = () => {
                p.frameRate(30);

                let s = p.millis() / 1000;
                
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
