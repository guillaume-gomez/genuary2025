import React, { useEffect, useRef } from 'react';
import p5 from "p5";
import { lineCircle } from "./collision";

export default function P5Sketch() {
    const renderRef = useRef();
    const rendered = useRef(false);


    useEffect(() => {
        if(rendered.current) {
            return;
        }
        new p5(p => {
            // flag to avoid to many instances of p5
            rendered.current = true;
            const cx = 0;      // circle position (set by mouse)
            const cy = 0;
            const r =  30;     // circle radius

            const x1 = 240;    // coordinates of line
            const y1 = 300;
            const x2 = 438;
            const y2 = 120;

            

            p.setup = () => {
              // const width = document.body.offsetWidth - 15;
              // const height = document.body.offsetHeight - 15;
              p.createCanvas(1000, 1000).parent(renderRef.current);
              p.background(30);
              p.strokeWeight(5);
            }

            p.draw = () => {
                p.frameRate(30);
                p.background(30);

                const cx = p.mouseX;
                const cy = p.mouseY;

                // check for collision
                // if hit, change line's stroke color
                const hit = lineCircle(x1,y1, x2,y2, cx,cy,r, p);
                if (hit) p.stroke(255,150,0, 150);
                else p.stroke(0,150,255, 150);
                p.line(x1,y1, x2,y2);

                // draw the circle
                p.fill(0,150,255, 150);
                p.noStroke();
                p.circle(cx,cy, r*2);
            }
        })
    }, []);

    return(
        <div ref={renderRef}></div>
    )
}
