import { useEffect, useRef } from 'react';
import p5 from "p5";

//https://www.mathkang.org/cite/expo20001.html

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);


    useEffect(() => {
        if(rendered.current) {
            return;
        }
        new p5(p => {
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
            let waves = [];
            const depth = 250;
            
            function wave(speed: number, depth: number) {
                const radius = 10;
                const numberOfPoints = Math.floor(p.width * 50 / (radius * 2));
                p.strokeWeight(1);
                p.beginShape();
                for(let it = 0; it < numberOfPoints; it++) {
                    const y = p.map(Math.sin(2 * it * speed), -1, 1, -depth/4,depth/4)
                    p.vertex(it, depth + y);
                }
                for(let it = numberOfPoints; it >= 0; it--) {
                    const y = p.map(Math.sin(2*it * speed), -1, 1, -depth/4,depth/4)
                    p.vertex(it, 0 + y);
                }
                p.endShape(p.CLOSE);


            }

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 1000).parent(renderRef.current);
              p.background(30);

              const numberOfWave = p.height/depth;
              for(let it=0; it < numberOfWave; it++) {
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  waves.push(color);
              }

            }

            p.draw = () => {
                p.frameRate(30);

                let s = p.millis() / 1000;
                let duration = s / 1.5;

                waves.forEach((color) => {
                    p.fill(color);
                    wave(duration, depth);
                    p.translate(0, depth);

                });
                //p.drawingContext.filter = "blur(2px)";
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
