import { useEffect, useRef } from 'react';
import p5 from "p5";

const duration = 5000;

export default function P5Sketch() {
    const renderRef = useRef<HTMLDivElement>(null);
    const rendered = useRef(false);

    useEffect(() => {
        if(rendered.current) {
            return;
        }

        const width = 500 //document.body.offsetWidth - 15;
        const height = 500 //document.body.offsetHeight - 15;

        new p5((p: any) => {
            // flag to avoid to many instances of p5
            rendered.current = true;

            p.setup = () => {
              p.createCanvas(width, height).parent(renderRef.current);
            }

            p.draw = () => {
              p.frameRate(30);
              p.background(51,51,51);
              //p.noLoop();

              p.strokeWeight(4);
              const time = p.millis() / duration % 1; // (%1) to convert if in seconds

              p.circle(
                width/2,
                height/2,
                p.lerp(10, 100, p.sin(time))
              );
              //p.noStroke();
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
